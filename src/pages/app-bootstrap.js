const i18n = new VueI18n({
  locale: 'en',
  messages,
});

new Vue({ i18n }).$mount('#app');