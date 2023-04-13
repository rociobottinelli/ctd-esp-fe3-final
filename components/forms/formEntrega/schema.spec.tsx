import entregaSchema, { errorMsg } from "./schema";
import * as yup from "yup";

describe("entregaSchema", () => {
  it("should validate a valid entrega object", async () => {
    const entrega = {
      address1: "123 Main St",
      city: "Buenos Aires",
      state: "Buenos Aires",
      zipCode: "1234",
    };
    await expect(entregaSchema.validate(entrega)).resolves.toBe(entrega);
  });

  it("should throw an error if address1 is missing", async () => {
    const entrega = {
      city: "Buenos Aires",
      state: "Buenos Aires",
      zipCode: "1234",
    };
    await expect(entregaSchema.validate(entrega)).rejects.toThrow(
      errorMsg.address.required
    );
  });

  it("should throw an error if city is missing", async () => {
    const entrega = {
      address1: "123 Main St",
      state: "Buenos Aires",
      zipCode: "1234",
    };
    await expect(entregaSchema.validate(entrega)).rejects.toThrow(
      errorMsg.state.required
    );
  });

  it("should throw an error if state is missing", async () => {
    const entrega = {
      address1: "123 Main St",
      city: "Buenos Aires",
      zipCode: "1234",
    };
    await expect(entregaSchema.validate(entrega)).rejects.toThrow(
      errorMsg.state.required
    );
  });

  it("should throw an error if zipCode is missing", async () => {
    const entrega = {
      address1: "123 Main St",
      city: "Buenos Aires",
      state: "Buenos Aires",
    };
    await expect(entregaSchema.validate(entrega)).rejects.toThrow(
      errorMsg.zipCode.required
    );
  });

  it("should validate an object with an empty address2 field", async () => {
    const data = {
      address1: "123 Main St",
      address2: "",
      city: "New York",
      state: "NY",
      zipCode: "10001",
    };
    await expect(entregaSchema.validate(data)).resolves.toBe(data);
  });

  it("should fail to validate an object missing the address1 field", async () => {
    const data = {
      address2: null,
      city: "New York",
      state: "NY",
      zipCode: "10001",
    };
    await expect(entregaSchema.validate(data)).rejects.toThrow(
      yup.ValidationError
    );
    await expect(entregaSchema.validate(data)).rejects.toHaveProperty(
      "errors",
      [errorMsg.address.required]
    );
  });

  it("should fail to validate an object missing the city field", async () => {
    const data = {
      address1: "123 Main St",
      address2: null,
      state: "NY",
      zipCode: "10001",
    };
    await expect(entregaSchema.validate(data)).rejects.toThrow(
      yup.ValidationError
    );
    await expect(entregaSchema.validate(data)).rejects.toHaveProperty(
      "errors",
      [errorMsg.state.required]
    );
  });

  it("should fail to validate an object missing the zipCode field", async () => {
    const data = {
      address1: "123 Main St",
      address2: null,
      city: "New York",
      state: "NY",
    };
    await expect(entregaSchema.validate(data)).rejects.toThrow(
      yup.ValidationError
    );
    await expect(entregaSchema.validate(data)).rejects.toHaveProperty(
      "errors",
      [errorMsg.zipCode.required]
    );
  });

 
});
