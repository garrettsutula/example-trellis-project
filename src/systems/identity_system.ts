import { ExecutionEnvironment, Service, Database, System, Requires } from "trellisuml";
import { k8sCluster, sqlRdbms } from "../domains/domain";
import { queue as eventBus } from './eventbus_system';

export const container = new ExecutionEnvironment("Identity Container", { parentComponent: k8sCluster });
export const service = new Service("Identity Service", { parentComponent: container });
export const database = new Database("Identity DB (SQL)", { parentComponent: sqlRdbms });

export const relationships = {
    idServiceToDb: new Requires(service, database),
    idServiceToBus: new Requires(service, eventBus),
}

export const system = new System({
    name: "Identity",
    components: {
        container,
        service,
        database,
        eventBus,
    },
    relationships,
})