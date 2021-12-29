import { ExecutionEnvironment, Service, Database, System, Requires } from "trellisuml";
import { k8sCluster, sqlRdbms } from "../domains/domain";
import { queue as eventBus } from './eventbus_system';

export const container = new ExecutionEnvironment("Catalog Container", { parentComponent: k8sCluster });
export const service = new Service("Catalog Service", { parentComponent: container });
export const database = new Database("Catalog DB (SQL)", { parentComponent: sqlRdbms });

export const relationships = {
    catalogServiceToDb: new Requires(service, database),
    catalogServiceToBus: new Requires(service, eventBus),
};

export const system = new System({
    name: "Catalog",
    components: {
        container,
        service,
        database,
        eventBus,
    },
    relationships,
})