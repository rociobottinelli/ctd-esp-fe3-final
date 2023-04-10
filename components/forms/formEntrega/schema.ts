import * as yup from "yup";

export const errorMsg = {
  form: {
    required: "Complete todos los campos.",
  },
  address: {
    required: "La dirección es requerida.",
  },
  state: {
    required: "La provincia es requerida.",
  },
  zipCode: {
    required: "El código postal es requerido.",
  },
};

const entregaSchema = yup
  .object({
    address1: yup.string().required(errorMsg.address.required),
    address2: yup.string().nullable(),
    city: yup.string().required(errorMsg.state.required),
    state: yup.string().required(errorMsg.state.required),
    zipCode: yup.string().required(errorMsg.zipCode.required),
  })
  .required(errorMsg.form.required);

export default entregaSchema;
