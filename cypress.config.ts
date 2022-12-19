import { defineConfig } from 'cypress';
import { writeFileSync } from 'fs';
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

      on('after:run', (afterRun: any) => {
        const data = JSON.stringify(afterRun.totalDuration);
        const filename = 'duration.json';
        writeFileSync(filename, data);
        console.log('cypress-json-results: wrote results to %s', filename);
      });

      return config;
    },
    excludeSpecPattern: '*.js.map',
    specPattern: 'e2e/integration/**/*.{js,jsx,ts,tsx}',
  },
});
