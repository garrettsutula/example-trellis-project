import {
  solution, componentRelationships, systemRelationships,
} from 'trellisuml';
import {
  Basket, Order, ProductCategory, Product, UserAccount,
} from '../information';
import {
  idSystem, basketSystem, catalogSystem, orderSystem, eshopSystem,
} from '../systems';

const { uses: cmpUses, provides } = componentRelationships;
const { uses } = systemRelationships;

const { components: { idService } } = idSystem;
const { components: { catalogService } } = catalogSystem;
const { components: { orderService } } = orderSystem;
const { components: { basketService } } = basketSystem;
const { components: { mobileShoppingApi, webShoppingApi } } = eshopSystem;

export default solution({
  name: 'Microsoft eShop',
  description: 'test description',
  componentRelationships: [
    provides(idService, webShoppingApi),
    provides(catalogService, webShoppingApi),
    provides(orderService, webShoppingApi),
    provides(basketService, webShoppingApi),
    provides(idService, mobileShoppingApi),
    provides(catalogService, mobileShoppingApi),
    provides(orderService, mobileShoppingApi),
    provides(basketService, mobileShoppingApi),
  ],
  systems: {
    idSystem,
    basketSystem,
    catalogSystem,
    orderSystem,
    eshopSystem,
  },
  systemRelationships: [
    uses({ source: eshopSystem, target: basketSystem, entities: [{ entity: Basket, crudOperations: 'crud' }] }),
    uses({
      source: eshopSystem,
      target: catalogSystem,
      entities: [
        { entity: Product, crudOperations: 'r' },
        { entity: ProductCategory, crudOperations: 'r' },
      ],
    }),
    uses({ source: eshopSystem, target: orderSystem, entities: [{ entity: Order, crudOperations: 'cr' }] }),
    uses({ source: eshopSystem, target: idSystem, entities: [{ entity: UserAccount, crudOperations: 'r' }] }),
  ],
});
