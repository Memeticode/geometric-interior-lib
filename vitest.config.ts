import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';

export default defineConfig({
    test: {
        projects: [
            {
                // Pure logic: validation, defaults, text generation. Fast, runs in Node.
                test: {
                    name: 'unit',
                    include: ['test/unit/**/*.test.ts'],
                    environment: 'node',
                },
            },
            {
                // Real WebGL rendering in headless Chromium.
                test: {
                    name: 'browser',
                    include: ['test/browser/**/*.test.ts'],
                    testTimeout: 60_000,
                    browser: {
                        enabled: true,
                        headless: true,
                        provider: playwright({
                            launchOptions: {
                                // Software WebGL (SwiftShader), so tests run without a GPU (e.g. in CI).
                                args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
                            },
                        }),
                        instances: [{ browser: 'chromium' }],
                    },
                },
            },
        ],
    },
});
