import { ExecutionEnvironment, Service, Database, Processor, System, Requires } from "trellisuml";
import { k8sCluster, sqlRdbms } from "../domains/domain";
import { queue as eventBus } from './eventbus_system';

export const container = new ExecutionEnvironment("Ordering Container", { parentComponent: k8sCluster });
export const service = new Service("Ordering Service", { parentComponent: container });
export const processor = new Processor("Ordering Background Tasks", { parentComponent: container });
export const database = new Database("Ordering DB (SQL)", { parentComponent: sqlRdbms });

export const relationships = {
    orderingServiceToDb: new Requires(service, database),
    orderingProcessorToDb: new Requires(processor, database),
    orderingServiceToBus: new Requires(service, eventBus),
};

export const system = new System({
    name: "Ordering",
    components: {
        container,
        service,
        processor,
        database,
        eventBus,
    },
    relationships,
})