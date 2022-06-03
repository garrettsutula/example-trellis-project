import {
  executionEnvironment, service, cache, system, accesses, requires,
} from 'trellisuml';
import { k8sCluster, redisContainer } from '../domains/domain';
import { default as eventBusSystem } from './eventbus_system';

const { components: { publishEvent } } = eventBusSystem;

const basketService = service('Basket Service');
const basketContainer = executionEnvironment('Basket Container', k8sCluster, [basketService]);
const basketCache = cache('Basket Redis Cache');

redisContainer.components.push(basketCache);

export default system({
  name: 'Baskets',
  components: {
    redisContainer,
    basketContainer,
    basketService,
    basketCache,
  },
  relationships: [
    accesses(basketService, basketCache),
    requires(basketService, publishEvent),
  ],
});
