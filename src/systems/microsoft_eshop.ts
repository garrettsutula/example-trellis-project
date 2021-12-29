import { ExecutionEnvironment, UI, Service, API, System, Requires } from "trellisuml";
import { clientMobileOS, clientBrowser, k8sCluster, apiGatewayContainer } from "../domains/domain";
import { service as idService, relationships as idRelationships } from './identity_system';
import { service as catalogService, relationships as catalogRelationships } from './catalog_system';
import { service as orderingService, relationships as orderingRelationships } from './ordering_system';
import { service as basketService, relationships as basketRelationships } from './basket_system';
import { identitySystem } from ".";

const mobileApp = new UI("eShop Mobile App", { parentComponent: clientMobileOS });
const spaWebApp = new UI("eShop SPA Webapp", { parentComponent: clientBrowser });
const webApp = new UI("eShop Traditional Webapp", { parentComponent: clientBrowser });
const webAppBffContainer = new ExecutionEnvironment("MVC Container", { parentComponent: k8sCluster });
const webAppBff = new Service("eShop Webapp MVC", { parentComponent: webAppBffContainer });
const mobileShoppingApi = new API("Mobile Shopping API", { parentComponent: apiGatewayContainer });
const webShoppingApi = new API("Web Shopping API", { parentComponent: apiGatewayContainer });

export const system = new System({
    name: 'Microsoft eShop System',
    components: {
        mobileApp,
        spaWebApp,
        webApp,
        webAppBffContainer,
        webAppBff,
        mobileShoppingApi,
        webShoppingApi,
        idService,
        catalogService,
        orderingService,
        basketService,
    },
    relationships: {
        mobileToGateway: new Requires(mobileApp, mobileShoppingApi),
        webAppToBff: new Requires(webApp, webAppBff),
        bffToGateway: new Requires(webAppBff, webShoppingApi),
        spaToGateway: new Requires(spaWebApp, webShoppingApi),
        mShoppingToId: new Requires(mobileShoppingApi, idService),
        mShoppingToCatalog: new Requires(mobileShoppingApi, catalogService),
        mShoppingToOrdering: new Requires(mobileShoppingApi, orderingService),
        mShoppingToBaskets: new Requires(mobileShoppingApi, basketService),
        wShoppingToId: new Requires(webShoppingApi, idService),
        wShoppingToCatalog: new Requires(webShoppingApi, catalogService),
        wShoppingToOrdering: new Requires(webShoppingApi, orderingService),
        wShoppingToBaskets: new Requires(webShoppingApi, basketService),
        ...idRelationships,
        ...catalogRelationships,
        ...orderingRelationships,
        ...basketRelationships,
    }
})