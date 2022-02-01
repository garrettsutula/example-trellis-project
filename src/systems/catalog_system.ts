import {
  executionEnvironment, service, database, system, accesses, requires,
} from 'trellisuml';
import { k8sCluster, sqlRdbms } from '../domains/domain';
import { default as eventBusSystem } from './eventbus_system';

const { components: { publishEvent } } = eventBusSystem;

const catalogService = service('Catalog Service');
const catalogDatabase = database('Catalog DB (SQL)');
const catalogContainer = executionEnvironment('Catalog Container', k8sCluster, [catalogService]);

sqlRdbms.components.push(catalogDatabase);

export default system({
  name: 'Catalog',
  components: {
    sqlRdbms,
    catalogContainer,
    catalogService,
    catalogDatabase,
  },
  componentRelationships: [
    accesses(catalogService, catalogDatabase),
    requires(catalogService, publishEvent),
  ],
});
