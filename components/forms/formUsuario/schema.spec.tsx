import { errorMsg, usuarioSchema } from "./schema";


describe("usuarioSchema", () => {
  test("valid input should return no errors", async () => {
    const input = {
      name: "John",
      lastname: "Doe",
      email: "johndoe@example.com",
    };

    await expect(usuarioSchema.validate(input)).resolves.toBe(input);
  });

  test("missing required field should return error", async () => {
    const input = {
      name: "John",
      lastname: "Doe",
      // email is missing
    };

    await expect(usuarioSchema.validate(input)).rejects.toThrow(errorMsg.email.required);
  });

  test("invalid email format should return error", async () => {
    const input = {
      name: "John",
      lastname: "Doe",
      email: "invalid-email", // invalid email format
    };

    await expect(usuarioSchema.validate(input)).rejects.toThrow(errorMsg.email.format);
  });

  test("name below minimum length should return error", async () => {
    const input = {
      name: "J", // below minimum length of 2
      lastname: "Doe",
      email: "johndoe@example.com",
    };

    await expect(usuarioSchema.validate(input)).rejects.toThrow(errorMsg.firstname.min);
  });

  test("name above maximum length should return error", async () => {
    const input = {
      name: "a".repeat(51), // above maximum length of 50
      lastname: "Doe",
      email: "johndoe@example.com",
    };

    await expect(usuarioSchema.validate(input)).rejects.toThrow(errorMsg.firstname.max);
  });

  describe('usuarioSchema', () => {
    it('should validate a valid user object', async () => {
      const user = {
        name: 'John',
        lastname: 'Doe',
        email: 'johndoe@example.com'
      };
      await expect(usuarioSchema.validate(user)).resolves.toEqual(user);
    });
  
    it('should fail validation when name is missing', async () => {
      const user = {
        lastname: 'Doe',
        email: 'johndoe@example.com'
      };
      await expect(usuarioSchema.validate(user)).rejects.toThrowErrorMatchingSnapshot();
    });
  
    it('should fail validation when name is too short', async () => {
      const user = {
        name: 'J',
        lastname: 'Doe',
        email: 'johndoe@example.com'
      };
      await expect(usuarioSchema.validate(user)).rejects.toThrowErrorMatchingSnapshot();
    });
  
    it('should fail validation when name is too long', async () => {
      const user = {
        name: 'John'.repeat(20),
        lastname: 'Doe',
        email: 'johndoe@example.com'
      };
      await expect(usuarioSchema.validate(user)).rejects.toThrowErrorMatchingSnapshot();
    });
  
    it('should fail validation when lastname is missing', async () => {
      const user = {
        name: 'John',
        email: 'johndoe@example.com'
      };
      await expect(usuarioSchema.validate(user)).rejects.toThrowErrorMatchingSnapshot();
    });
  
    it('should fail validation when lastname is too short', async () => {
      const user = {
        name: 'John',
        lastname: 'D',
        email: 'johndoe@example.com'
      };
      await expect(usuarioSchema.validate(user)).rejects.toThrowErrorMatchingSnapshot();
    });
  
    it('should fail validation when lastname is too long', async () => {
      const user = {
        name: 'John',
        lastname: 'Doe'.repeat(20),
        email: 'johndoe@example.com'
      };
      await expect(usuarioSchema.validate(user)).rejects.toThrowErrorMatchingSnapshot();
    });
  
    it('should fail validation when email is missing', async () => {
      const user = {
        name: 'John',
        lastname: 'Doe'
      };
      await expect(usuarioSchema.validate(user)).rejects.toThrowErrorMatchingSnapshot();
    });
  
    it('should fail validation when email is not a valid format', async () => {
      const user = {
        name: 'John',
        lastname: 'Doe',
        email: 'invalid-email-format'
      };
      await expect(usuarioSchema.validate(user)).rejects.toThrowErrorMatchingSnapshot();
    });
  });
  
});
