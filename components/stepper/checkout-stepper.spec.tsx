import React from "react";
import {
  render,
  fireEvent,
  act,
  waitFor,
  screen,
} from "@testing-library/react";
import StepperForm from "./checkout-stepper.component";

jest.mock("dh-marvel/services/checkout/checkout.service");

describe("StepperForm", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the first step of the form", () => {
    const { getByText } = render(<StepperForm />);
    expect(getByText("Datos Personales")).toBeInTheDocument();
  });

  it('renders the second step of the form after clicking the "Next" button in the first step', async () => {
    const { getByText, getByLabelText } = render(<StepperForm />);
    fireEvent.change(getByLabelText("Nombre"), { target: { value: "John" } });
    fireEvent.change(getByLabelText("Apellido"), { target: { value: "Doe" } });
    fireEvent.change(getByLabelText("Email"), {
      target: { value: "johndoe@example.com" },
    });
    fireEvent.click(getByText("SIGUIENTE"));

    expect(getByText("Dirección de entrega")).toBeInTheDocument();
  });

  it('renders the third step of the form after clicking the "Next" button in the second step', async () => {
    const { getByText, getByLabelText } = render(<StepperForm />);
    fireEvent.change(getByLabelText("Nombre"), { target: { value: "John" } });
    fireEvent.change(getByLabelText("Apellido"), { target: { value: "Doe" } });
    fireEvent.change(getByLabelText("Email"), {
      target: { value: "johndoe@example.com" },
    });
    fireEvent.click(getByText("SIGUIENTE"));
    waitFor(() => getByLabelText("Paso 2"));
    waitFor (() => fireEvent.change(getByLabelText("Dirección"), {
      target: { value: "123 Main St" },
    }));
    waitFor(() => fireEvent.change(getByLabelText("Ciudad"), {
      target: { value: "Anytown" },
    }));
    waitFor(()=> fireEvent.change(getByLabelText("Provincia"), {
      target: { value: "Any state" },
    }));
    waitFor(()=>fireEvent.change(getByLabelText("Código postal"), {
      target: { value: "12345" },
    }));
    fireEvent.click(getByText("SIGUIENTE"));
    waitFor(() => getByLabelText("Paso 3"));
   waitFor(() => fireEvent.change(getByLabelText("Número de tarjeta"), {
      target: { value: "1234 5678 9012 3456" },
    }));
    waitFor(()=> fireEvent.change(getByLabelText("Nombre en la tarjeta"), {
      target: { value: "John Doe" },
    }));
    waitFor(()=> fireEvent.change(getByLabelText("Fecha de vencimiento"), {
      target: { value: "12/23" },
    }));
    waitFor(()=>fireEvent.change(getByLabelText("Código de seguridad"), {
      target: { value: "123" },
    }));
    fireEvent.click(getByText("SIGUIENTE"));
    expect(getByText("Datos del pago")).toBeInTheDocument();
  });
  test("Renders all three forms in order", () => {
    const { getByText } = render(<StepperForm />);
    expect(getByText("Datos Personales")).toBeInTheDocument();
    expect(getByText("Dirección de entrega")).toBeInTheDocument();
    expect(getByText("Datos del pago")).toBeInTheDocument();
  });
  test("Changes activeStep when button is clicked", () => {
    const { getByText } = render(<StepperForm />);
    const button = getByText("Dirección de entrega");
    fireEvent.click(button);
    waitFor(() => expect(getByText("Paso 2")).toBeInTheDocument());
  });
});
