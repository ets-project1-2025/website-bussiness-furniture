#!/usr/bin/env node
// scripts/seed-products.js

import 'dotenv/config';
import { insertDummyProducts } from '../src/lib/seed-products.js';

const runSeed = async () => {
  console.log('Starting to seed dummy products...');
  await insertDummyProducts();
  console.log('Seeding completed!');
};

runSeed().catch(error => {
  console.error('Error during seeding:', error);
});