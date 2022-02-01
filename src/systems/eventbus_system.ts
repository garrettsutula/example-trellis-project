import {
  system, queue, provides, executionEnvironment,
} from 'trellisuml';
import { k8sCluster } from '../domains/domain';

const eventBus = queue('Event Bus (Pub/Sub)');
const eventBusContainer = executionEnvironment('Event Bus Container', k8sCluster, [eventBus]);

k8sCluster.components.push(eventBus);

export default system({
  name: 'Event Bus',
  components: {
    eventBusContainer,
    eventBus,
    publishEvent: eventBus.interfaces.publish,
    subscribeEvent: eventBus.interfaces.subscribe,
  },
  componentRelationships: [
    provides(eventBus, eventBus.interfaces.publish),
    provides(eventBus, eventBus.interfaces.subscribe),
  ],
});
