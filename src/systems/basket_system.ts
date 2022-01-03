import { executionEnvironment, service, cache, system, requires } from "trellisuml";
import { k8sCluster, redisContainer } from "../domains/domain";
import { eventBus } from './eventbus_system';

export const basketContainer = executionEnvironment("Basket Container", k8sCluster);
export const basketService = service("Basket Service", basketContainer);
export const basketCache = cache("Basket Redis Cache", redisContainer);

export const relationships = [
    requires(basketService, basketCache),
    requires(basketService, eventBus),
];

export default system({
    name: "Baskets",
    components: [
        basketContainer,
        basketService,
        basketCache,
        eventBus,
    ],
    relationships,
});