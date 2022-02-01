import {
  actor, domain, device, executionEnvironment,
} from 'trellisuml';

// Client Infrastructure
export const internet = domain('The Internet');
export const clientComputer = device('Personal Computer', internet);
export const clientMobile = device('Mobile Device', internet);
export const clientMobileOS = executionEnvironment('Mobile OS\\n(iOS, Android, Windows)', clientMobile);
export const clientBrowser = executionEnvironment('Web Browser', clientComputer);
export const user = actor('User');

// Company Infrastructure
export const virtualNetwork = domain('Virtual Network');
export const k8sCluster = device('Kubernetes Cluster', virtualNetwork);
export const sqlDatabase = device('SQL Database Server', virtualNetwork);
export const sqlRdbms = executionEnvironment('SQL RDBMS', sqlDatabase);
export const redisContainer = executionEnvironment('Redis Container', k8sCluster);
export const apiGatewayContainer = executionEnvironment('API Gateway Container', k8sCluster);
