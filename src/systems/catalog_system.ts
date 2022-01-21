import {
  executionEnvironment, service, database, system, componentRelationships,
} from 'trellisuml';
import { k8sCluster, sqlRdbms } from '../domains/domain';
import { default as eventBusSystem } from './eventbus_system';

const { accesses } = componentRelationships;
const { components: { publishEvent } } = eventBusSystem;

export const catalogContainer = executionEnvironment('Catalog Container', k8sCluster);
export const catalogService = service('Catalog Service', catalogContainer);
export const catalogDatabase = database('Catalog DB (SQL)', sqlRdbms);

export default system({
  name: 'Catalog',
  components: {
    catalogContainer,
    catalogService,
    catalogDatabase,
  },
  componentRelationships: [
    accesses(catalogService, catalogDatabase),
    accesses(catalogService, publishEvent),
  ],
});
