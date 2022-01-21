import {
  executionEnvironment, service, cache, system, componentRelationships,
} from 'trellisuml';
import { k8sCluster, redisContainer } from '../domains/domain';
import { default as eventBusSystem } from './eventbus_system';

const { accesses } = componentRelationships;
const { components: { publishEvent } } = eventBusSystem;

export const basketContainer = executionEnvironment('Basket Container', k8sCluster);
export const basketService = service('Basket Service', basketContainer);
export const basketCache = cache('Basket Redis Cache', redisContainer);

export default system({
  name: 'Baskets',
  components: {
    basketContainer,
    basketService,
    basketCache,
  },
  componentRelationships: [
    accesses(basketService, basketCache),
    accesses(basketService, publishEvent),
  ],
});
