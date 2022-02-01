import {
  executionEnvironment, service, database, processor, system, accesses, requires,
} from 'trellisuml';
import { k8sCluster, sqlRdbms } from '../domains/domain';
import { default as eventBusSystem } from './eventbus_system';

const { components: { publishEvent } } = eventBusSystem;

const orderService = service('Ordering Service');
const orderProcessor = processor('Ordering Background Tasks');
const orderDatabase = database('Ordering DB (SQL)');
const orderContainer = executionEnvironment('Ordering Container', k8sCluster, [orderService, orderProcessor]);

sqlRdbms.components.push(orderDatabase);

export default system({
  name: 'Ordering',
  components: {
    sqlRdbms,
    orderContainer,
    orderService,
    orderProcessor,
    orderDatabase,
  },
  componentRelationships: [
    accesses(orderService, orderDatabase),
    accesses(orderProcessor, orderDatabase),
    requires(orderService, publishEvent),
  ],
});
