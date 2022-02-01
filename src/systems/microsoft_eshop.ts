import {
  executionEnvironment, ui, service, api, system, requires, accesses,
} from 'trellisuml';
import {
  clientMobileOS, clientBrowser, k8sCluster, apiGatewayContainer,
} from '../domains/domain';

const mobileApp = ui('eShop Mobile App');
const spaWebApp = ui('eShop SPA Webapp');
const webApp = ui('eShop Traditional Webapp');
const webAppBff = service('eShop Webapp MVC');
const mobileShoppingApi = api('Mobile Shopping API');
const webShoppingApi = api('Web Shopping API');
const webAppBffContainer = executionEnvironment('MVC Container', k8sCluster, [webAppBff]);

clientMobileOS.components.push(mobileApp);
clientBrowser.components.push(spaWebApp, webApp);
apiGatewayContainer.components.push(webShoppingApi, mobileShoppingApi);

export default system({
  name: 'Microsoft eShop System',
  components: {
    clientMobileOS,
    clientBrowser,
    apiGatewayContainer,
    webAppBffContainer,
    mobileApp,
    spaWebApp,
    webApp,
    webAppBff,
    mobileShoppingApi,
    webShoppingApi,
  },
  componentRelationships: [
    requires(mobileApp, mobileShoppingApi),
    accesses(webApp, webAppBff),
    requires(webAppBff, webShoppingApi),
    requires(spaWebApp, webShoppingApi),
  ],
});
