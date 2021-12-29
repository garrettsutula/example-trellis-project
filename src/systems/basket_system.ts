import { ExecutionEnvironment, Service, Cache, System, Requires } from "trellisuml";
import { k8sCluster, redisContainer } from "../domains/domain";
import { queue as eventBus } from './eventbus_system';

export const container = new ExecutionEnvironment("Basket Container", { parentComponent: k8sCluster });
export const service = new Service("Basket Service", { parentComponent: container });
export const cache = new Cache("Basket Redis Cache", { parentComponent: redisContainer });

export const relationships = {
    basketServiceToCache: new Requires(service, cache),
    basketServiceToBus: new Requires(service, eventBus),
}

export const system = new System({
    name: "Baskets",
    components: {
        container,
        service,
        cache,
        eventBus,
    },
    relationships,
});