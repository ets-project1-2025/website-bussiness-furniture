import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schema } from './schemas/schema';

export default defineConfig({
  name: 'default',
  title: 'FurnitureKami E-commerce',
  projectId: 'g7h0ho9q',
  dataset: 'production',
  plugins: [deskTool(), visionTool()],
  schema: schema,
});