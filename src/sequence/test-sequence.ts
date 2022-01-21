import { actor, sequenceDiagrams } from 'trellisuml';
import { basketService, basketCache } from '../systems/basket_system';

const { sequenceDiagram, breakSequence } = sequenceDiagrams;

export const user = actor('User');

export default sequenceDiagram([
  {
    source: user, target: basketService, action: 'calls', description: 'Create Basket',
  },
  {
    source: basketService, target: basketCache, action: 'calls', description: 'Create Basket',
  },
  breakSequence([
    {
      source: basketService, target: user, action: 'responds', description: 'Error: Service Unavailable',
    },
  ], 'No response from server'),
  {
    source: basketCache, target: basketService, action: 'responds', description: 'Basket [1]',
  },
  {
    source: basketService, target: user, action: 'responds', description: 'Basket Created Toast [1]',
  },
], 'Test Sequence Diagram');
