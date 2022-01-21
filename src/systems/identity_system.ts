import {
  executionEnvironment, service, database, system, componentRelationships,
} from 'trellisuml';
import { k8sCluster, sqlRdbms } from '../domains/domain';
import { default as eventBusSystem } from './eventbus_system';

const { accesses } = componentRelationships;
const { components: { publishEvent } } = eventBusSystem;

export const idContainer = executionEnvironment('Identity Container', k8sCluster);
export const idService = service('Identity Service', idContainer);
export const idDatabase = database('Identity DB (SQL)', sqlRdbms);

export default system({
  name: 'Identity',
  components: {
    idContainer,
    idService,
    idDatabase,
  },
  componentRelationships: [
    accesses(idService, idDatabase),
    accesses(idService, publishEvent),
  ],
});
