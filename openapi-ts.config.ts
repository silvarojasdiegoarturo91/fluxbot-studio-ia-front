import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: './contracts/fluxbot-widget-api.v1.yaml',
  output: './src/api/generated',
  plugins: [],
  types: {
    enums: 'javascript',
  },
});
