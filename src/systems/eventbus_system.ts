import { System, Queue } from "trellisuml";
import { k8sCluster } from "../domains/domain";

export const queue = new Queue("Event Bus (Pub/Sub)", { parentComponent: k8sCluster });

export const system = new System({
    name: "Event Bus",
    components: {
        queue
    },
    relationships: {
    }
})