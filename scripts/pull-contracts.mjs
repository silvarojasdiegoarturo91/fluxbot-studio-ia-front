#!/usr/bin/env node

import { copyFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');
const contractsSource = join(projectRoot, '..', 'fluxbot-studio-contracts', 'openapi');
const contractsDest = join(projectRoot, 'contracts');

mkdirSync(contractsDest, { recursive: true });

const contracts = ['fluxbot-widget-api.v1.yaml'];

contracts.forEach(contract => {
  const src = join(contractsSource, contract);
  const dest = join(contractsDest, contract);
  try {
    copyFileSync(src, dest);
    console.log(`✅ ${contract} pulled`);
  } catch (err) {
    console.error(`❌ Failed to pull ${contract}: ${err.message}`);
    process.exit(1);
  }
});

console.log('✅ Contracts synced');
