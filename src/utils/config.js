
import Conf from 'conf';
import { join } from 'path';
import { homedir } from 'os';

export class ConfigManager {
  constructor() {
    this.config = new Conf({
      projectName: 'genie-cli',
      configName: 'config',
      defaults: {
        geminiApiKey: null,
        userPreferences: {
          colorOutput: true,
          verboseMode: false
        }
      }
    });
  }

  async load() {
    // Configuration is automatically loaded by conf
    return this.config.store;
  }

  async save() {
    // Configuration is automatically saved by conf
    return true;
  }

  get(key) {
    return this.config.get(key);
  }

  set(key, value) {
    this.config.set(key, value);
  }

  delete(key) {
    this.config.delete(key);
  }

  clear() {
    this.config.clear();
  }

  getConfigPath() {
    return this.config.path;
  }

  // Helper methods
  hasApiKey() {
    return !!this.get('geminiApiKey');
  }

  getUserPreferences() {
    return this.get('userPreferences') || {};
  }

  setUserPreference(key, value) {
    const prefs = this.getUserPreferences();
    prefs[key] = value;
    this.set('userPreferences', prefs);
  }
}
