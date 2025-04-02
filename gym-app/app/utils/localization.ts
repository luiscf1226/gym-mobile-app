import enStrings from '@/app/localization/en.json';

// Currently only supporting English, but this structure allows for easy expansion
const strings = {
  en: enStrings
};

type Language = 'en'; // Add more languages as needed (e.g. 'es')

// Default language
let currentLanguage: Language = 'en';

/**
 * Get localized text by key path
 * @param path Dot notation path to the string in the localization file
 * @param defaultValue Fallback value if the key is not found
 * @returns The localized string
 */
export function t(path: string, defaultValue: string = ''): string {
  const pathParts = path.split('.');
  let result: any = strings[currentLanguage];
  
  for (const part of pathParts) {
    if (result && typeof result === 'object' && part in result) {
      result = result[part];
    } else {
      return defaultValue;
    }
  }
  
  return typeof result === 'string' ? result : defaultValue;
}

/**
 * Set the current language for the app
 * @param language The language code to set
 */
export function setLanguage(language: Language): void {
  if (language in strings) {
    currentLanguage = language;
  } else {
    console.warn(`Language ${language} is not supported. Defaulting to English.`);
    currentLanguage = 'en';
  }
}

/**
 * Get the current language
 * @returns The current language code
 */
export function getCurrentLanguage(): Language {
  return currentLanguage;
} 