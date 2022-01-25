import {
  solution, componentRelationships, systemRelationships, useCase, useCaseModel, useCaseRelationships,
} from 'trellisuml';
import { user } from '../domains';
import {
  Basket, Order, ProductCategory, Product, UserAccount, Payment,
} from '../information';
import {
  idSystem, basketSystem, catalogSystem, orderSystem, eshopSystem,
} from '../systems';

const { provides } = componentRelationships;
const { uses } = systemRelationships;
const { include, perform } = useCaseRelationships;

const { components: { idService } } = idSystem;
const { components: { catalogService } } = catalogSystem;
const { components: { orderService } } = orderSystem;
const { components: { basketService } } = basketSystem;
const { components: { mobileShoppingApi, webShoppingApi } } = eshopSystem;

const [placeOrder, createBasket, addPayment] = useCase([
  {
    title: 'Place Order',
    description: 'Use the ecommerce site to build\na basket, add a form of payment\nand convert it into an order\nto be shipped.',
    entities: [{ entity: Order, crudOperations: 'cr' }],
  },
  {
    title: 'Create Basket',
    description: 'Use the ecommerce site to add items,\n customer, shipping and payment info.',
    entities: [
      { entity: Basket, crudOperations: 'cru' },
      { entity: UserAccount, crudOperations: 'r' },
      { entity: Product, crudOperations: 'r' }],
  },
  {
    title: 'Add Payment',
    description: 'Use the ecommerce site to\nadd a form of payment to a basket.',
    entities: [{ entity: Payment, crudOperations: 'cr' }, { entity: Basket, crudOperations: 'u' }],
  },
]);

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
  useCaseModel: useCaseModel({
    actors: [user],
    useCases: {
      createBasket,
      addPayment,
      placeOrder,
    },
    useCaseRelationships: [
      perform(user, placeOrder),
      include(placeOrder, addPayment),
      include(placeOrder, createBasket),
    ],
  }),
});
