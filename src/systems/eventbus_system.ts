import { system, queue, componentRelationships } from 'trellisuml';
import { k8sCluster } from '../domains/domain';

const { provides } = componentRelationships;

const eventBus = queue('Event Bus (Pub/Sub)', k8sCluster);

export default system({
  name: 'Event Bus',
  components: {
    eventBus,
    publishEvent: eventBus.interfaces.publish,
    subscribeEvent: eventBus.interfaces.subscribe,
  },
  componentRelationships: [
    provides(eventBus, eventBus.interfaces.publish),
    provides(eventBus, eventBus.interfaces.subscribe),
  ],
});
