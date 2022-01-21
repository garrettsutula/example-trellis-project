import {
  executionEnvironment, ui, service, api, system, componentRelationships,
} from 'trellisuml';
import {
  clientMobileOS, clientBrowser, k8sCluster, apiGatewayContainer,
} from '../domains/domain';

const { requires, provides, uses } = componentRelationships;

export const mobileApp = ui('eShop Mobile App', clientMobileOS);
export const spaWebApp = ui('eShop SPA Webapp', clientBrowser);
export const webApp = ui('eShop Traditional Webapp', clientBrowser);
export const webAppBffContainer = executionEnvironment('MVC Container', k8sCluster);
export const webAppBff = service('eShop Webapp MVC', webAppBffContainer);
export const mobileShoppingApi = api('Mobile Shopping API', apiGatewayContainer);
export const webShoppingApi = api('Web Shopping API', apiGatewayContainer);

export default system({
  name: 'Microsoft eShop System',
  components: {
    mobileApp,
    spaWebApp,
    webApp,
    webAppBffContainer,
    webAppBff,
    mobileShoppingApi,
    webShoppingApi,
  },
  componentRelationships: [
    requires(mobileApp, mobileShoppingApi),
    uses(webApp, webAppBff),
    requires(webAppBff, webShoppingApi),
    requires(spaWebApp, webShoppingApi),
  ],
});
