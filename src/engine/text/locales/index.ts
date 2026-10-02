/**
 * Every supported language's text. Typed as a Record over Locale, so adding a
 * locale to LOCALES (src/config.ts) is a compile error here until its text exists.
 */

import type { Locale } from '../../../config.js';
import type { LocaleText } from '../locale-text.js';
import { en } from './en.js';
import { es } from './es.js';
import { fr } from './fr.js';
import { it } from './it.js';
import { ru } from './ru.js';
import { zh } from './zh.js';

export const LOCALE_TEXT: Readonly<Record<Locale, LocaleText>> = { en, es, fr, it, zh, ru };
