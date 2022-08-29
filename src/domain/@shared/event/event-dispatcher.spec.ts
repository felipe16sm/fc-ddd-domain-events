import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";
import EventDispatcher from "./event-dispatcher";
import SendMessageWhenFirstCustomerIsCreatedHandler from "../../customer/event/handler/send-message-when-first-customer-is-created.handler";
import SendMessageWhenSecondCustomerIsCreatedHandler from "../../customer/event/handler/send-message-when-second-customer-is-created.handler";
import CustomerCreatedEvent from "../../customer/event/customer-created.event";
import Address from "../../customer/value-object/address";
import Customer from "../../customer/entity/customer";
import { v4 as uuid } from "uuid";
import SendMessageWhenCustomerChangeAddressHandler from "../../customer/event/handler/send-message-when-customer-change-address.handler";
import CustomerChangeAddressEvent from "../../customer/event/customer-change-address.event";

describe("Domain events tests", () => {
  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      1
    );
    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);
  });

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      0
    );
  });

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeUndefined();
  });

  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    const productCreatedEvent = new ProductCreatedEvent({
      name: "Product 1",
      description: "Product 1 description",
      price: 10.0,
    });

    // Quando o notify for executado o SendEmailWhenProductIsCreatedHandler.handle() deve ser chamado
    eventDispatcher.notify(productCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });

  it("should register a customer create event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendMessageWhenFirstCustomerIsCreatedHandler();
    const eventHandler2 = new SendMessageWhenSecondCustomerIsCreatedHandler();

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);

    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length
    ).toBe(2);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
    ).toMatchObject(eventHandler2);
  });

  it("should unregister a customer create event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendMessageWhenFirstCustomerIsCreatedHandler();
    const eventHandler2 = new SendMessageWhenSecondCustomerIsCreatedHandler();

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);

    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length
    ).toBe(2);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
    ).toMatchObject(eventHandler2);

    eventDispatcher.unregister("CustomerCreatedEvent", eventHandler);

    eventDispatcher.unregister("CustomerCreatedEvent", eventHandler2);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length
    ).toBe(0);
  });

  it("should notify all Customer Create event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendMessageWhenFirstCustomerIsCreatedHandler();
    const eventHandler2 = new SendMessageWhenSecondCustomerIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");
    const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);

    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length
    ).toBe(2);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
    ).toMatchObject(eventHandler2);

    const customer = new Customer(uuid(), "Felipe");

    const customerCreatedEvent = new CustomerCreatedEvent(customer);

    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();
  });

  it("should register a customer change address event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendMessageWhenCustomerChangeAddressHandler();

    eventDispatcher.register("CustomerChangeAddressEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"].length
    ).toBe(1);
    expect(
      eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"][0]
    ).toMatchObject(eventHandler);
  });

  it("should unregister a customer change address event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendMessageWhenCustomerChangeAddressHandler();

    eventDispatcher.register("CustomerChangeAddressEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"].length
    ).toBe(1);
    expect(
      eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregister("CustomerChangeAddressEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"].length
    ).toBe(0);
  });

  it("should notify all Customer Change Address event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendMessageWhenCustomerChangeAddressHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("CustomerChangeAddressEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"].length
    ).toBe(1);
    expect(
      eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"][0]
    ).toMatchObject(eventHandler);

    const customer = new Customer(uuid(), "Felipe");
    const customerAddress = new Address("Street 1", 1, "Zip 1", "Goiânia");

    customer.changeAddress(customerAddress);

    const customerChangeAddressEvent = new CustomerChangeAddressEvent(customer);

    eventDispatcher.notify(customerChangeAddressEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });
});
