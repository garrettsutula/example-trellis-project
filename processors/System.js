const nameToId = require("./lib/nameToId");


function preRecurseComponents(component, parent) {
  component.id = `${parent.id}.${nameToId(component.name)}`;
  if(component.components)
    Object.keys(component.components)
      .forEach((childComponentKey) => preRecurseComponents(component.components[childComponentKey], component));
}


function postRecurseComponents(component, system, systemContext) {
  if (!component.system) component.system = system;
  systemContext.systems.add(component.system);
  systemContext.components.add(component);
  if(component.components)
    Object.keys(component.components).forEach((childComponentKey) => {
      const childComponent = component.components[childComponentKey];
      postRecurseComponents(childComponent, component.system, systemContext);
    })
}

function preprocessFn(system) {
  const {components = {}, relationships = []} = system;

  system.id = nameToId(system.name);

  Object.keys(components).forEach((componentKey) => {
    const component = components[componentKey];

    // Adds a back-reference to each component so system name is easily accessible from {component}.parent.name
    component.system = { $ref: '#' };
    component.id = `${system.id}.${nameToId(component.name)}`; // TODO: sanitizer util
    if (component.components) preRecurseComponents(component, system);6
  });
  // Adds system id
  return system;
}

function postprocessFn(system) {
  const {components = {}, relationships = []} = system;
  const systemContext = {
    components: new Set(),
    systems: new Set(),
    relationships: {
      system: new Map(),
      component: new Map(),
      deployment: new Map(),
    }
  }

  Object.keys(components).forEach((componentKey) => {
    const component = components[componentKey];
    postRecurseComponents(component, component.system, systemContext);
  });
  relationships.forEach((relationship) => {
    const { source, target, type, interface} = relationship;
    const isDifferentSystem = (source.system && source.system.id) !== target.system.id;
    systemContext.components.add(source);
    systemContext.components.add(target);
    if (source.system) systemContext.systems.add(source.system);
    if (target.system) systemContext.systems.add(target.system);
    const systemRelId = `${source.system.id || source.id}-${target.id}${type || ''}${interface || ''}`
    const relId = `${source.id}-${target.id}${type || ''}${interface || ''}`
    if(!systemContext.relationships.system.has(systemRelId) && isDifferentSystem)
      systemContext.relationships.system.set(systemRelId, relationship);
    if(!systemContext.relationships.component.has(relId))
      systemContext.relationships.component.set(relId, relationship);

  });
  system.componentIds = Array.from(systemContext.components.values());
  system.systems = Array.from(systemContext.systems.values());
  system.relationships = {
    system: Array.from(systemContext.relationships.system.values()),
    component: Array.from(systemContext.relationships.component.values()),
  }
  return system;
}

module.exports = {
  preprocessFn,
  postprocessFn,
};
