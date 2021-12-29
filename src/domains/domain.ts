import { Domain, ExecutionEnvironment, Device } from "trellisuml";

// Client Infrastructure
export const internet = new Domain("The Internet");
export const clientMobile = new Device("Mobile Device", { parentComponent: internet });
export const clientMobileOS = new ExecutionEnvironment("Mobile OS\\n(iOS, Android, Windows)", {parentComponent: clientMobile});
export const clientComputer = new Device("Personal Computer", {parentComponent: internet });
export const clientBrowser = new ExecutionEnvironment("Web Browser", { parentComponent: clientComputer });

// Company Infrastructure
export const virtualNetwork = new Domain("Virtual Network", { stereotype: "VPC" });
export const k8sCluster = new ExecutionEnvironment("Kubernetes Cluster", {parentComponent: virtualNetwork });
export const sqlDatabase = new Device("SQL Database Server", {parentComponent: virtualNetwork});
export const sqlRdbms = new ExecutionEnvironment("SQL RDBMS", { parentComponent: sqlDatabase });
export const redisContainer = new ExecutionEnvironment("Redis Container", { parentComponent: k8sCluster });
export const apiGatewayContainer = new ExecutionEnvironment("API Gateway Container", { parentComponent: k8sCluster});
