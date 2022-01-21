import {
  executionEnvironment, service, database, processor, system, componentRelationships,
} from 'trellisuml';
import { k8sCluster, sqlRdbms } from '../domains/domain';
import { default as eventBusSystem } from './eventbus_system';

const { accesses } = componentRelationships;
const { components: { publishEvent } } = eventBusSystem;

export const orderContainer = executionEnvironment('Ordering Container', k8sCluster);
export const orderService = service('Ordering Service', orderContainer);
export const orderProcessor = processor('Ordering Background Tasks', orderContainer);
export const orderDatabase = database('Ordering DB (SQL)', sqlRdbms);

export default system({
  name: 'Ordering',
  components: {
    orderContainer,
    orderService,
    orderProcessor,
    orderDatabase,
  },
  componentRelationships: [
    accesses(orderService, orderDatabase),
    accesses(orderProcessor, orderDatabase),
    accesses(orderService, publishEvent),
  ],
});
