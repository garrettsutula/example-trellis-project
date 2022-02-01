import {
  system, ui, service, database, device, accesses, domain, executionEnvironment, requires,
} from 'trellisuml';

const name = 'Appointments';
export const apptApp = ui(`${name} App`);
export const apptService = service(`${name} Service`);
export const apptDb = database(`${name} Database`);

// These would typically be defined in a "domain" diagram & imported from that diagram instead of defined here.
// because they are likely re-used by other components in other systems/solutions
const internet = domain('The Internet');
const vpc = domain('Virtual Network');
const clientDevice = device('Client Device', internet);
const appServer = device('App Server', vpc);
const dbServer = device('Database Server', vpc);
const mobileOs = executionEnvironment('Mobile OS', clientDevice, [apptApp]);
const appOs = executionEnvironment('Server OS', appServer, [apptService]);
const rdbms = executionEnvironment('RDBMS', dbServer, [apptDb]);

export default system({
  name,
  components: {
    mobileOs,
    appOs,
    rdbms,
    apptApp,
    apptService,
    apptDb,
  },
  // Defined as needed for every connection between systems. De-duplicated when rendered as puml.
  componentRelationships: [
    requires(apptApp, apptService.interface),
    accesses(apptService, apptDb),
  ],
});
