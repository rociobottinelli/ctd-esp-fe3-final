import { ICheckout } from "types/Types";
import { createMocks } from "node-mocks-http";
import handleCheckout from "./index.route";
import {
  ERROR_CARD_DATA_INCORRECT,
  ERROR_CARD_WITHOUT_AUTHORIZATION,
  ERROR_CARD_WITHOUT_FUNDS,
  ERROR_INCORRECT_ADDRESS,
  ERROR_METHOD_NOT_ALLOWED,
  ERROR_SERVER,
} from "dh-marvel/services/checkout/checkout.errors";
import { postCheckout } from "dh-marvel/services/checkout/checkout.service";
import { mockCheckout } from "dh-marvel/test/mocks/checkout";
//Testing the error messages and requests
describe("Testing Checkout", () => {
  test("Testing method error", async () => {
    const { req, res } = createMocks({
      method: "GET",
    });
    await handleCheckout(req, res);
    expect(res._getStatusCode()).toBe(405);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining(ERROR_METHOD_NOT_ALLOWED)
    );
  });

  test("Happy path: correct POST method and data", async () => {
    const checkoutOrder = {
      customer: { address: {} },
      card: { number: "4242424242424242" },
    } as ICheckout;
    const { req, res } = createMocks({
      method: "POST",
      body: checkoutOrder,
    });
    await handleCheckout(req, res);
    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).not.toEqual(
      expect.objectContaining(ERROR_SERVER)
    );
  });
  test("testing error 400", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        customer: { address: {} },
        card: { number: "0000" },
      } as ICheckout,
    });
    await handleCheckout(req, res);
    expect(res._getStatusCode()).toBe(400);
  });
  describe("data being sent is not valid", () => {
    test("error 400", async () => {
      const { req, res } = createMocks({
        method: "POST",
        body: {
          customer: { address: {} },
          card: { number: "0000000000000000" },
        } as ICheckout,
      });
      await handleCheckout(req, res);
      expect(res._getStatusCode()).toBe(400);
      expect(JSON.parse(res._getData())).toEqual(
        expect.objectContaining(ERROR_CARD_DATA_INCORRECT)
      );
    });
  });
  test("testing 400 error for no funds card", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        customer: { address: {} },
        card: { number: "4111411141114111" },
      } as ICheckout,
    });
    await handleCheckout(req, res);
    expect(res._getStatusCode()).toBe(400);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining(ERROR_CARD_WITHOUT_FUNDS)
    );
  });
  describe("when sending an invalid address", () => {
    test("should return a 400 error", async () => {
      const { req, res } = createMocks({
        method: "POST",
        body: {
          customer: { address: { address2: "invalid" } },
        } as ICheckout,
      });
      await handleCheckout(req, res);
      expect(res._getStatusCode()).toBe(400);
      expect(JSON.parse(res._getData())).toEqual(
        expect.objectContaining(ERROR_INCORRECT_ADDRESS)
      );
    });
  });
  describe("non authorized card", () => {
    test("error 400", async () => {
      const { req, res } = createMocks({
        method: "POST",
        body: {
          customer: { address: {} },
          card: { number: "4000400040004000" },
        } as ICheckout,
      });
      await handleCheckout(req, res);
      expect(res._getStatusCode()).toBe(400);
      expect(JSON.parse(res._getData())).toEqual(
        expect.objectContaining(ERROR_CARD_WITHOUT_AUTHORIZATION)
      );
    });
  });
})
