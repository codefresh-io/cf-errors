const { defineConfig } = require('vitest/config');

module.exports = defineConfig({
    test: {
        globals: true,
        coverage: {
            provider: 'v8',
            reporter: ['text', 'lcov'],
            reportsDirectory: 'coverage'
        }
    }
});
