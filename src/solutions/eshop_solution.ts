import {
  solution, useCase, useCaseModel, provides, include, perform,
} from 'trellisuml';
import { user } from '../domains';
import {
  Basket, Order, Product, UserAccount, Payment,
} from '../information';
import {
  idSystem, basketSystem, catalogSystem, orderSystem, eshopSystem,
} from '../systems';

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
  relationships: [
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
