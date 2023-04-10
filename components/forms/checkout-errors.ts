const ERROR_CHECKOUT = {
  CARD_DATA_INCORRECT: {
    message: "Datos de tarjeta incorrecta",
  },
  CARD_WITHOUT_AUTHORIZATION: {
    message:
      "Tarjeta sin autorización. Comuníquese con su banco e intente nuevamente.",
  },
  CARD_WITHOUT_FUNDS: {
    message: "Tarjeta sin fondos disponibles",
  },
  INCORRECT_ADDRESS: {
    message: "Dirección de entrega incorrecta",
  },
  SERVER_ERROR: {
    message: "Error de servidor. Intente nuevamente",
  },
};
type Data = {
  error: string;
  message: string;
};

const catchError = (response: Data) => {
  if (response.error === "CARD_DATA_INCORRECT") {
    return ERROR_CHECKOUT.CARD_DATA_INCORRECT.message;
  }
  if (response.error === "CARD_WITHOUT_FUNDS") {
    return ERROR_CHECKOUT.CARD_WITHOUT_FUNDS.message;
  }
  if (response.error === "CARD_WITHOUT_AUTHORIZATION") {
    return ERROR_CHECKOUT.CARD_WITHOUT_AUTHORIZATION.message;
  }
  if (response.error === "INCORRECT_ADDRESS") {
    return ERROR_CHECKOUT.INCORRECT_ADDRESS.message;
  }

  return ERROR_CHECKOUT.SERVER_ERROR.message;
};

export default catchError;
