import { executionEnvironment, service, database, processor, system, requires } from "trellisuml";
import { k8sCluster, sqlRdbms } from "../domains/domain";
import { eventBus } from './eventbus_system';

export const orderContainer = executionEnvironment("Ordering Container", k8sCluster);
export const orderService = service("Ordering Service", orderContainer);
export const orderProcessor = processor("Ordering Background Tasks", orderContainer);
export const orderDatabase = database("Ordering DB (SQL)", sqlRdbms);

export const relationships = [
    requires(orderService, orderDatabase),
    requires(orderProcessor, orderDatabase),
    requires(orderService, eventBus),
];

export default system({
    name: "Ordering",
    components: [
        orderContainer,
        orderService,
        orderProcessor,
        orderDatabase,
        eventBus,
    ],
    relationships,
})