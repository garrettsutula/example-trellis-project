import { executionEnvironment, service, database, system, requires } from "trellisuml";
import { k8sCluster, sqlRdbms } from "../domains/domain";
import { eventBus } from './eventbus_system';

export const catalogContainer = executionEnvironment("Catalog Container", k8sCluster);
export const catalogService = service("Catalog Service", catalogContainer);
export const catalogDatabase = database("Catalog DB (SQL)", sqlRdbms);

export const relationships = [
    requires(catalogService, catalogDatabase),
    requires(catalogService, eventBus),
];

export default system({
    name: "Catalog",
    components: [
        catalogContainer,
        catalogService,
        catalogDatabase,
        eventBus,
    ],
    relationships,
})