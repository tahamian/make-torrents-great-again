var fs = require('fs');

class Config {
  private config: any = {};

  public constructor() {
    if (!this.readConfig()) {
      console.error('Error loading configuration file'); return;
    }
  }

  /*
    * Gets a static configuration value
    * 
    * RETURNS - the value as a string, and '' if no value was found
    * 
    * TODO - somehow return a known type?
    *      - also, probably a hash lookup instead of a loop
  */
  public getStatic(str: string) : string {
    if (!str) return '';

    return this.config.static[str] || '';
  }

  /*
    * Sets the static configuration value
    * with a key of {key} to the value of {value}
    * 
    * RETURNS - whether or not the operation was successful
  */
  public setStatic(key: string, value: string) : boolean {
    if (!key || !value) return false;
    
    let current = this.config.static[key];

    if (!current) return false;

    current = value;

    return this.writeConfig();
  }

  private readConfig() : boolean {
    const config = require('./../res/config.json');

    if (
      !config ||
      !config.static || !config.static.length||
      !config.static.dataTypes || !config.static.dataTypes.length
    ) return false;

    this.config = config;
    return true;
  }

  // TODO: more efficient error return?
  private writeConfig() : boolean {
    fs.writeFileSync('./../res/config.json', this.config, 'utf8');

    return this.readConfig();
  }
}