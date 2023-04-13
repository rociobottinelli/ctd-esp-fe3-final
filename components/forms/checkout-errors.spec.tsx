import catchError from "./checkout-errors";

describe('catchError function', () => {
  it('should return the correct error message for CARD_DATA_INCORRECT', () => {
    const response = { error: 'CARD_DATA_INCORRECT', message: '' };
    const errorMessage = catchError(response);
    expect(errorMessage).toEqual('Datos de tarjeta incorrecta');
  });

  it('should return the correct error message for CARD_WITHOUT_AUTHORIZATION', () => {
    const response = { error: 'CARD_WITHOUT_AUTHORIZATION', message: '' };
    const errorMessage = catchError(response);
    expect(errorMessage).toEqual('Tarjeta sin autorización. Comuníquese con su banco e intente nuevamente.');
  });

  it('should return the correct error message for CARD_WITHOUT_FUNDS', () => {
    const response = { error: 'CARD_WITHOUT_FUNDS', message: '' };
    const errorMessage = catchError(response);
    expect(errorMessage).toEqual('Tarjeta sin fondos disponibles');
  });

  it('should return the correct error message for INCORRECT_ADDRESS', () => {
    const response = { error: 'INCORRECT_ADDRESS', message: '' };
    const errorMessage = catchError(response);
    expect(errorMessage).toEqual('Dirección de entrega incorrecta');
  });

  it('should return the correct error message for any other error', () => {
    const response = { error: 'SOME_OTHER_ERROR', message: '' };
    const errorMessage = catchError(response);
    expect(errorMessage).toEqual('Error de servidor. Intente nuevamente');
  });
});
