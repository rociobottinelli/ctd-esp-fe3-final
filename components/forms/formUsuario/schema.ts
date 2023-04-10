import * as yup from "yup";
export const errorMsg = {
  firstname: {
    required: "El nombre es un campo requerido.",
    min: "Por favor ingrese mínimo 2 caracteres.",
    max: "Por favor ingrese mínimo 50 caracteres.",
  },
  lastname: {
    required: "El apellido es un campo requerido.",
    min: "Por favor ingrese mínimo 2 caracteres.",
    max: "Por favor ingrese mínimo 50 caracteres.",
  },
  email: {
    required: "El email es un campo requerido.",
    format: "Por favor ingrese un mail válido.",
  },
};

export const usuarioSchema = yup
  .object({
    name: yup
      .string()
      .required(errorMsg.firstname.required)
      .min(2, errorMsg.firstname.min)
      .max(50, errorMsg.firstname.max),

    lastname: yup
      .string()
      .required(errorMsg.lastname.required)
      .min(2, errorMsg.lastname.min)
      .max(50, errorMsg.lastname.max),

    email: yup
      .string()
      .required(errorMsg.email.required)
      .email(errorMsg.email.format),
  })
  .required();
