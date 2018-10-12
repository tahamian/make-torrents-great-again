let translations = require('./../res/translations.json');

getTranslator = (lang) => {
  this.translate = (str) => {
    if (!str) return '';

    this.translations.filter((current) => {
      if (
        current.base == str && current.translations &&
        current.translations.length && current.translations[lang]) {
        
        return current.translations[lang];
      }
    });
  }
} 