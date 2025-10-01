import { type SchemaTypeDefinition } from 'sanity';

// Then import our document/field types
import product from './product';
import category from './category';

// Then we give our schema to the builder and provide the result to Sanity
export const schema: { types: SchemaTypeDefinition[] } = {
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: [
    /* Your types here! */
    // For example:
    product,
    category,
  ]
};