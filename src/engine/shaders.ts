/**
 * GLSL shader sources, as strings.
 *
 * The original loaded these from .glsl files through Vite's ?raw import;
 * plain tsc has no loader for that, so they live here instead. The GLSL is unchanged.
 */

/** background.vert.glsl */
export const BACKGROUND_VERT = /* glsl */ `
varying vec2 vUv;

void main() {
    vUv = uv;
    // Clip-space quad — depth 0.9999 so it renders behind everything
    gl_Position = vec4(position.xy, 0.9999, 1.0);
}
`;

/** background.frag.glsl */
export const BACKGROUND_FRAG = /* glsl */ `
// Background: radial gradient from uCenterColor (center) to black (corners).

uniform vec3  uCenterColor;
// tan(fov/2) * aspect and tan(fov/2); their ratio is the screen aspect
uniform float uHalfFovTanX;
uniform float uHalfFovTanY;

varying vec2 vUv;

void main() {
    // Aspect-corrected circle in pixel space
    float aspect = uHalfFovTanX / uHalfFovTanY;
    float d = length(vec2((vUv.x - 0.5) * aspect, vUv.y - 0.5)) * 2.0;
    float t = clamp(d * d, 0.0, 1.0);

    gl_FragColor = vec4(mix(uCenterColor, vec3(0.0), t), 1.0);
}
`;

/** face.vert.glsl */
export const FACE_VERT = /* glsl */ `
attribute float vAlpha;
attribute vec3 aColor;
attribute float aBaseOpacity;
attribute float aNoiseScale;
attribute float aNoiseStrength;
attribute float aCrackExtend;

varying float fAlpha;
varying vec3 vWorldPos;
varying vec3 vWorldNormal;
varying vec2 vUv;
varying vec3 vColor;
varying float vBaseOpacity;
varying float vNoiseScale;
varying float vNoiseStrength;
varying float vCrackExtend;

void main() {
    fAlpha = vAlpha;
    vUv = uv;
    vColor = aColor;
    vBaseOpacity = aBaseOpacity;
    vNoiseScale = aNoiseScale;
    vNoiseStrength = aNoiseStrength;
    vCrackExtend = aCrackExtend;

    vec3 worldPos = (modelMatrix * vec4(position, 1.0)).xyz;

    vWorldPos = worldPos;
    vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
    gl_Position = projectionMatrix * viewMatrix * vec4(worldPos, 1.0);
}
`;

/** face.frag.glsl */
export const FACE_FRAG = /* glsl */ `
#define MAX_LIGHTS 10

uniform vec3 uLightPositions[MAX_LIGHTS];
uniform float uLightIntensities[MAX_LIGHTS];
uniform int uLightCount;
uniform vec3 uCameraPos;
uniform float uFrontLightFactor;
uniform float uBackLightFactor;
uniform float uIlluminationCap;
uniform float uAmbientLight;
uniform float uEdgeFadeThreshold;
uniform float uAttenuationCoeff;

varying float fAlpha;
varying vec3 vWorldPos;
varying vec3 vWorldNormal;
varying vec2 vUv;
varying vec3 vColor;
varying float vBaseOpacity;
varying float vNoiseScale;
varying float vNoiseStrength;
varying float vCrackExtend;

float hash(vec3 p) {
    p = fract(p * vec3(443.8975, 397.2973, 491.1871));
    p += dot(p, p.yxz + 19.19);
    return fract((p.x + p.y) * p.z);
}

float noise3D(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float n000 = hash(i);
    float n100 = hash(i + vec3(1,0,0));
    float n010 = hash(i + vec3(0,1,0));
    float n110 = hash(i + vec3(1,1,0));
    float n001 = hash(i + vec3(0,0,1));
    float n101 = hash(i + vec3(1,0,1));
    float n011 = hash(i + vec3(0,1,1));
    float n111 = hash(i + vec3(1,1,1));
    return mix(
        mix(mix(n000, n100, f.x), mix(n010, n110, f.x), f.y),
        mix(mix(n001, n101, f.x), mix(n011, n111, f.x), f.y),
        f.z
    );
}

float voronoiEdge(vec2 p) {
    vec2 n = floor(p);
    vec2 f = fract(p);
    float md1 = 8.0;
    float md2 = 8.0;
    for (int j = -1; j <= 1; j++) {
        for (int i = -1; i <= 1; i++) {
            vec2 g = vec2(float(i), float(j));
            vec2 o = vec2(
                hash(vec3(n + g, 0.0)),
                hash(vec3(n + g, 1.0))
            );
            vec2 r = g + o - f;
            float d = length(r);
            if (d < md1) {
                md2 = md1;
                md1 = d;
            } else if (d < md2) {
                md2 = d;
            }
        }
    }
    return md2 - md1;
}

float nebulaCracks(vec2 uv) {
    float e1 = voronoiEdge(uv * 2.5 + 3.7);
    float line1 = 1.0 - smoothstep(0.0, 0.04, e1);
    float e2 = voronoiEdge(uv * 5.5 + 11.3);
    float line2 = 1.0 - smoothstep(0.0, 0.03, e2);
    float e3 = voronoiEdge(uv * 11.0 + 27.1);
    float line3 = 1.0 - smoothstep(0.0, 0.025, e3);
    return line1 * 0.4 + line2 * 0.25 + line3 * 0.1;
}

float nebulaDust(vec2 uv) {
    float d = 0.0;
    d += noise3D(vec3(uv * 3.0, 0.0)) * 0.5;
    d += noise3D(vec3(uv * 6.5, 3.0)) * 0.3;
    d += noise3D(vec3(uv * 14.0, 7.0)) * 0.2;
    return d;
}

float starSparkle(vec2 p, float scale) {
    p *= scale;
    vec2 cell = floor(p);
    vec2 f = fract(p);
    float sparkle = 0.0;
    for (int j = -1; j <= 1; j++) {
        for (int i = -1; i <= 1; i++) {
            vec2 g = vec2(float(i), float(j));
            vec2 cellId = cell + g;
            float brightness = hash(vec3(cellId, 30.0));
            if (brightness > 0.75) {
                vec2 starPos = vec2(
                    hash(vec3(cellId, 10.0)),
                    hash(vec3(cellId, 20.0))
                );
                float d = length(f - g - starPos);
                // Per-sparkle brightness: unique phase from cell hash
                float phase = hash(vec3(cellId, 40.0)) * 6.283;
                float flicker = 0.5 + 0.5 * sin(phase);
                sparkle += smoothstep(0.07, 0.0, d) * (brightness - 0.75) * 4.0 * flicker;
            }
        }
    }
    return sparkle;
}

void main() {
    float n  = noise3D(vWorldPos * vNoiseScale);
    float n2 = noise3D(vWorldPos * vNoiseScale * 2.7 + 31.7);
    float noiseMix = n * 0.7 + n2 * 0.3;

    vec3 modColor = vColor * (1.0 + (noiseMix - 0.5) * vNoiseStrength);

    float illumination = 0.0;
    for (int i = 0; i < MAX_LIGHTS; i++) {
        if (i >= uLightCount) break;
        vec3 toLight = uLightPositions[i] - vWorldPos;
        float d2 = dot(toLight, toLight);
        vec3 lightDir = normalize(toLight);
        float attenuation = uLightIntensities[i] / (1.0 + d2 * uAttenuationCoeff);
        float NdotL = dot(vWorldNormal, lightDir);
        float frontLight = max(NdotL, 0.0) * uFrontLightFactor;
        float backLight = max(-NdotL, 0.0) * uBackLightFactor;
        illumination += (frontLight + backLight) * attenuation;
    }
    illumination = min(illumination, uIlluminationCap);

    float ambient = uAmbientLight;

    // Crack extension fade: 1.0 inside plane, fades to 0.0 in skirt
    float baseFade = vCrackExtend;           // base visuals follow boundary
    float crackFade = pow(vCrackExtend, 0.3); // cracks fade more slowly

    vec3 finalColor = modColor * (ambient + illumination) * baseFade;
    float finalAlpha = vBaseOpacity * fAlpha * (ambient + illumination)
                       * (1.0 + (noiseMix - 0.5) * vNoiseStrength * 0.5) * baseFade;

    vec2 patternCoord = vUv * 2.0 - 1.0;

    float cracks = nebulaCracks(patternCoord) * 0.6;
    float crackGlow = cracks * (ambient + illumination) * 0.7 * crackFade;
    finalColor += (modColor * crackGlow * 0.8 + vec3(crackGlow) * 0.2);

    float dust = nebulaDust(patternCoord) * 0.6 * baseFade;
    float dustGlow = dust * (ambient + illumination) * 0.1;
    finalColor += modColor * dustGlow;

    float sparkles = (starSparkle(patternCoord, 7.0)
                   + starSparkle(patternCoord, 13.0) * 0.5) * 0.6 * baseFade;
    float sparkleGlow = sparkles * (ambient + illumination) * 0.25;
    finalColor += vec3(sparkleGlow) * 0.5 + modColor * sparkleGlow * 0.5;

    finalAlpha += (cracks * 0.06 * crackFade + dust * 0.015 + sparkles * 0.045);

    // Fade planes that are edge-on to the viewer
    vec3 viewDir = normalize(uCameraPos - vWorldPos);
    float facing = abs(dot(normalize(vWorldNormal), viewDir));
    float edgeFade = smoothstep(0.0, uEdgeFadeThreshold, facing);
    finalAlpha *= edgeFade;
    finalColor *= edgeFade;

    gl_FragColor = vec4(finalColor, max(finalAlpha, 0.0));
}
`;

/** glow.vert.glsl */
export const GLOW_VERT = /* glsl */ `
// Per-vertex (base quad corners)
attribute vec2 aQuadOffset;   // (-0.5,-0.5), (0.5,-0.5), (0.5,0.5), (-0.5,0.5)

// Per-instance
attribute vec3 aCenter;
attribute float aSize;

varying vec2 vUv;

// Reference resolution constants (SD = 540px height)
#define REF_HALF_HEIGHT 270.0
#define MAX_POINT_SIZE 1024.0
#define REF_HEIGHT 540.0

void main() {
    vUv = aQuadOffset + 0.5;  // [0,1] for texture sampling (replaces gl_PointCoord)

    // Per-dot offset and size jitter: each dot has a unique phase from a position hash
    float phase = fract(sin(dot(aCenter.xy, vec2(12.9898, 78.233))) * 43758.5453);
    vec3 pos = aCenter + vec3(
        sin(phase * 6.283) * 0.008,
        cos(phase * 6.283 + 1.57) * 0.006,
        sin(phase * 6.283 + 3.14) * 0.005);
    float sz = aSize * (1.0 + 0.03 * sin(phase * 6.283));

    // Transform dot center to view space
    vec4 mvCenter = modelViewMatrix * vec4(pos, 1.0);

    // Reference-resolution pixel size with explicit clamp
    float refPointSize = sz * REF_HALF_HEIGHT / -mvCenter.z;
    float clampedSize = min(refPointSize, MAX_POINT_SIZE);

    // View-space billboard extent (resolution-independent)
    float billboardSize = clampedSize * 2.0 * (-mvCenter.z)
                        / (REF_HEIGHT * projectionMatrix[1][1]);

    // Offset quad corners in view space (camera-facing billboard)
    mvCenter.xy += aQuadOffset * billboardSize;

    gl_Position = projectionMatrix * mvCenter;
}
`;

/** glow.frag.glsl */
export const GLOW_FRAG = /* glsl */ `
uniform sampler2D uGlowMap;

varying vec2 vUv;

void main() {
    gl_FragColor = texture2D(uGlowMap, vUv);
}
`;
