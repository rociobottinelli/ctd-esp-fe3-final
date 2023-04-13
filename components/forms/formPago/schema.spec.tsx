import * as yup from "yup";
import pagoSchema, { errorMsg } from "./schema";


describe("Pago schema validation", () => {
  test("Valid input returns no errors", async () => {
    const data = {
      number: "1234567890123456",
      nameOnCard: "John Doe",
      expDate: "0125",
      cvc: "123",
    };
    await expect(pagoSchema.validate(data)).resolves.toBe(data);
  });

  test("Missing number field returns validation error", async () => {
    const data = {
      nameOnCard: "John Doe",
      expDate: "0125",
      cvc: "123",
    };
    await expect(pagoSchema.validate(data)).rejects.toThrow(
      yup.ValidationError
    );
    await expect(pagoSchema.validate(data)).rejects.toHaveProperty(
      "errors[0]",
      errorMsg.number.required
    );
  });

  test("Number field with less than 16 characters returns validation error", async () => {
    const data = {
      number: "123456789012345",
      nameOnCard: "John Doe",
      expDate: "0125",
      cvc: "123",
    };
    await expect(pagoSchema.validate(data)).rejects.toThrow(
      yup.ValidationError
    );
    await expect(pagoSchema.validate(data)).rejects.toHaveProperty(
      "errors[0]",
      errorMsg.number.min
    );
  });

  test("Missing nameOnCard field returns validation error", async () => {
    const data = {
      number: "1234567890123456",
      expDate: "0125",
      cvc: "123",
    };
    await expect(pagoSchema.validate(data)).rejects.toThrow(
      yup.ValidationError
    );
    await expect(pagoSchema.validate(data)).rejects.toHaveProperty(
      "errors[0]",
      errorMsg.nameOnCard.required
    );
  });

  test("Missing expDate field returns validation error", async () => {
    const data = {
      number: "1234567890123456",
      nameOnCard: "John Doe",
      cvc: "123",
    };
    await expect(pagoSchema.validate(data)).rejects.toThrow(
      yup.ValidationError
    );
    await expect(pagoSchema.validate(data)).rejects.toHaveProperty(
      "errors[0]",
      errorMsg.expDate.required
    );
  });

  test("expDate field with less than 4 characters returns validation error", async () => {
    const data = {
      number: "1234567890123456",
      nameOnCard: "John Doe",
      expDate: "012",
      cvc: "123",
    };
    await expect(pagoSchema.validate(data)).rejects.toThrow(
      yup.ValidationError
    );
    await expect(pagoSchema.validate(data)).rejects.toHaveProperty(
      "errors[0]",
      errorMsg.expDate.min
    );
  });

  test("Missing cvc field returns validation error", async () => {
    const data = {
      number: "1234567890123456",
      nameOnCard: "John Doe",
      expDate: "0125",
    };
    await expect(pagoSchema.validate(data)).rejects.toThrow(
      yup.ValidationError
    );
    await expect(pagoSchema.validate(data)).rejects.toHaveProperty(
      "errors[0]",
      errorMsg.cvc.required
    );
  });

})