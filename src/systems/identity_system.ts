import { executionEnvironment, service, database, system, requires } from "trellisuml";
import { k8sCluster, sqlRdbms } from "../domains/domain";
import { eventBus } from './eventbus_system';

export const idContainer = executionEnvironment("Identity Container", k8sCluster );
export const idService = service("Identity Service", idContainer);
export const idDatabase = database("Identity DB (SQL)", sqlRdbms);

export const componentRelationships = [
    requires(idService, idDatabase),
    requires(idService, eventBus),
];

export default system({
    name: "Identity",
    components: [
        idContainer,
        idService,
        idDatabase,
        eventBus,
    ],
    componentRelationships,
});