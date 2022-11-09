import { defineConfig } from 'cypress';
const cypressTypeScriptPreprocessor = require('./e2e/plugins/cy-ts-preprocessor');
const cypressReplay = require('@replayio/cypress');

export default defineConfig({
  fixturesFolder: false,
  fileServerFolder: '.',
  video: false,
  projectId: 'z6eb6h',
  viewportWidth: 1440,
  viewportHeight: 720,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      on('file:preprocessor', cypressTypeScriptPreprocessor);
      cypressReplay.default(on, config);

      return config;
    },
    excludeSpecPattern: '*.js.map',
    specPattern: 'e2e/integration/**/*.{js,jsx,ts,tsx}',
  },
});
