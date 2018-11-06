var fs = require('fs');

function getStatic(str) {
  if (!str) return '';

  let entry = this.config.static[entry];

  if (!entry) return '';

  return entry.value || entry.default || '';
}

function getTorrentCategories() {
  let entry = this.config.torrentCategories;

  return (entry && entry.length) ? entry : [];
}

function setStatic(str, val) {
  if (!str) return false;

  let entry = this.config.static[entry];

  if (!entry) return false;

  entry.value = val;
  return true;
}