import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MockedComic } from "dh-marvel/test/mocks/comic";
import StepperForm from "./checkout-stepper.component";

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("dh-marvel/services/checkout/checkout.service", () => ({
  postCheckout: jest.fn(),
}));

const mockComic = MockedComic;
const mockCustomerData = {
  name: "John",
  lastname: "Doe",
  email: "john.doe@test.com",
  address: {
    address1: "123 Main St",
    address2: "Apt 4",
    city: "Anytown",
    state: "CA",
    zipCode: "12345",
  },
};

const mockAddressData = {
  address1: "123 Main St",
  address2: "Apt 4",
  city: "Anytown",
  state: "CA",
  zipCode: "12345",
};

const mockCardData = {
  number: "123456789",
  cvc: "123",
  expDate: "12/24",
  nameOnCard: "John Doe",
};

it("displays step 1 by default", () => {
  render(<StepperForm />);
  const step1Heading = screen.getByText("Datos Personales");
  expect(step1Heading).toBeInTheDocument();
});

it("displays step 2 when 'Dirección de entrega' button is clicked", () => {
  render(<StepperForm />);
  const deliveryButton = screen.getByText("Dirección de entrega");
  fireEvent.click(deliveryButton);
  const step2Heading = screen.getByText("Dirección de entrega");
  expect(step2Heading).toBeInTheDocument();
});

it("displays step 3 when 'Datos del pago' button is clicked", () => {
  render(<StepperForm />);
  const deliveryButton = screen.getByText("Dirección de entrega");
  fireEvent.click(deliveryButton);
  const paymentButton = screen.getByText("Datos del pago");
  fireEvent.click(paymentButton);
  const step3Heading = screen.getByText("Datos del pago");
  expect(step3Heading).toBeInTheDocument();
});
