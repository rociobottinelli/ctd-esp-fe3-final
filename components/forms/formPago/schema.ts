import * as yup from "yup";
export const errorMsg = {
  form: {
    required: "Complete todos los campos.",
  },
  number: {
    required: "El número es requerido.",
    min: "Por favor ingrese 16 números.",
  },

  nameOnCard: {
    required: "El nombre es requerido.",
  },
  expDate: {
    required: "La fecha de vencimiento es requerida.",
    min: "Por favor ingrese 4 números.",
  },
  cvc: {
    required: "El código CVC es requerido.",
    min: "Por favor ingrese 3 números.",
  },
};

const pagoSchema = yup
  .object({
    number: yup
      .string()
      .min(16, errorMsg.number.min)
      .required(errorMsg.number.required),
    nameOnCard: yup.string().required(errorMsg.nameOnCard.required),
    expDate: yup
      .string()
      .min(4, errorMsg.expDate.min)
      .required(errorMsg.expDate.required),
    cvc: yup
      .string()
      .min(3, errorMsg.cvc.min)
      .required(errorMsg.cvc.required),
  })
  .required(errorMsg.form.required);

export default pagoSchema;
