import { sequenceDiagram, service } from 'trellisuml';
import { basketService, basketCache } from '../systems/basket_system';

export const user = service('User');

export default sequenceDiagram('Test Sequence Diagram', [
  {
    source: user, target: basketService, action: 'calls', description: 'Create Basket',
  },
  {
    source: basketService, target: basketCache, action: 'calls', description: 'Create Basket',
  },
  {
    source: basketCache, target: basketService, action: 'responds', description: 'Basket [1]',
  },
  {
    source: basketService, target: user, action: 'responds', description: 'Basket Created Toast [1]',
  },
]);
