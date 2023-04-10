import { ICheckout } from "types/Types";
import { createMocks } from "node-mocks-http";
import handleCheckout from "./index.route"
export const invalidAddress = "invalid";
export const validCard = "4242424242424242";
export const withoutFundsCard = "4111411141114111";
export const withoutAuthorizationCard = "4000400040004000";


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
        card: { number: validCard },
      } as ICheckout;
    const {req, res} = createMocks({
        method: "POST",
        body:checkoutOrder,
    })
    await handleCheckout(req, res)
    expect(res._getStatusCode()).toBe(200);
    })
})