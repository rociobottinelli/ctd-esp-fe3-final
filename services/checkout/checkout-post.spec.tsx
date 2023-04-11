import { ICheckout } from "types/Types";
import { mockCheckout } from "dh-marvel/test/mocks/checkout";
import { postCheckout } from "./checkout.service";

describe("postCheckout", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should make a POST request to /api/checkout with the given data", async () => {
    const data: ICheckout = mockCheckout;
    const jsonMock = jest.fn().mockResolvedValue(200);
    const fetchMock = jest.fn().mockResolvedValue({
      json: jsonMock,
    });

    global.fetch.mockImplementationOnce(fetchMock);

    const response = await postCheckout(data);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith("/api/checkout", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });
    expect(jsonMock).toHaveBeenCalledTimes(1);
    expect(response).toEqual(200);
  });

  it("should throw an error if the server returns an error", async () => {
    const data: ICheckout = mockCheckout
    const fetchMock = jest.fn().mockRejectedValue(new Error("Server error"));

    global.fetch.mockImplementationOnce(fetchMock);

    await expect(postCheckout(data)).rejects.toThrow("Server error");
  });
});