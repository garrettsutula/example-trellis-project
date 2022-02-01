import {
  executionEnvironment, service, database, system, accesses, requires,
} from 'trellisuml';
import { k8sCluster, sqlRdbms } from '../domains/domain';
import { default as eventBusSystem } from './eventbus_system';

const { components: { publishEvent } } = eventBusSystem;

const idService = service('Identity Service');
const idContainer = executionEnvironment('Identity Container', k8sCluster, [idService]);
const idDatabase = database('Identity DB (SQL)');

sqlRdbms.components.push(idDatabase);

export default system({
  name: 'Identity',
  components: {
    idContainer,
    idService,
    idDatabase,
  },
  componentRelationships: [
    accesses(idService, idDatabase),
    requires(idService, publishEvent),
  ],
});
