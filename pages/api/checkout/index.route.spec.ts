import { ICheckout } from "types/Types";
import { createMocks } from "node-mocks-http";
import handleCheckout from "./index.route"


describe("Testing Checkout", () => {
    test("Testing method error", async ()=>{
        const {req, res} =createMocks({
            method:"GET"
        })
        await handleCheckout(req, res)
        expect(res._getStatusCode()).toBe(405)
    })
    
    test("Happy path: correct POST method and data", async()=> {
        const checkoutOrder = {
            customer: { address: {} },
        card: { number: "4242424242424242" },
      } as ICheckout;
    const {req, res} = createMocks({
        method: "POST",
        body:checkoutOrder,
    })
    await handleCheckout(req, res)
    expect(res._getStatusCode()).toBe(200);
    })
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
      it("testing 400 error for no funds card", async () => {
        const { req, res } = createMocks({
          method: "POST",
          body: {
            customer: { address: {} },
            card: { number: "4111411141114111" },
          } as ICheckout,
        });
        await handleCheckout(req, res);
        expect(res._getStatusCode()).toBe(400);
      });
      
})