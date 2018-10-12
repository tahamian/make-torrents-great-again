var fs = require('fs');

getStatic(str) = () => {
  if (!str) return '';

  let entry = this.config.static[entry];

  if (!entry) return '';

  return entry.value || entry.default || '';
}

setStatic(str, val) = () => {
  if (!str) return false;

  let entry = this.config.static[entry];

  if (!entry) return false;

  entry.value = val;
  return true;
}