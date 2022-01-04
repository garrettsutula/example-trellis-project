import { executionEnvironment, ui, service, api, system, requires, connectsTo, uses } from "trellisuml";
import { clientMobileOS, clientBrowser, k8sCluster, apiGatewayContainer, sqlDatabase } from "../domains/domain";
import { idService, componentRelationships as idRelationships } from './identity_system';
import { catalogService, componentRelationships as catalogRelationships } from './catalog_system';
import { orderService, componentRelationships as orderingRelationships } from './ordering_system';
import { basketService, componentRelationships as basketRelationships, default as basketSystem } from './basket_system';

export const mobileApp = ui("eShop Mobile App", clientMobileOS);
export const spaWebApp = ui("eShop SPA Webapp", clientBrowser);
export const webApp = ui("eShop Traditional Webapp", clientBrowser);
export const webAppBffContainer = executionEnvironment("MVC Container", k8sCluster);
export const webAppBff = service("eShop Webapp MVC", webAppBffContainer);
export const mobileShoppingApi = api("Mobile Shopping API", apiGatewayContainer);
export const webShoppingApi = api("Web Shopping API", apiGatewayContainer);

export default system({
    name: 'Microsoft eShop System',
    components: [
        mobileApp,
        spaWebApp,
        webApp,
        webAppBffContainer,
        webAppBff,
        mobileShoppingApi,
        webShoppingApi,
        idService,
        catalogService,
        orderService,
        basketService,
    ],
    componentRelationships: [
        requires(mobileApp, mobileShoppingApi),
        requires(webApp, webAppBff),
        requires(webAppBff, webShoppingApi),
        requires(spaWebApp, webShoppingApi),
        requires(mobileShoppingApi, idService),
        requires(mobileShoppingApi, catalogService),
        requires(mobileShoppingApi, orderService),
        requires(mobileShoppingApi, basketService),
        requires(webShoppingApi, idService),
        requires(webShoppingApi, catalogService),
        requires(webShoppingApi, orderService),
        requires(webShoppingApi, basketService),
        connectsTo(clientBrowser, k8sCluster, "Ports: 443\\nProtcol:TCP"),
        connectsTo(clientMobileOS, k8sCluster, "Ports: 443\\nProtcol:TCP"),
        connectsTo(k8sCluster, sqlDatabase, "Ports: 1443\\nProtcol:TCP"),
        ...idRelationships,
        ...catalogRelationships,
        ...orderingRelationships,
        ...basketRelationships,
    ],
})