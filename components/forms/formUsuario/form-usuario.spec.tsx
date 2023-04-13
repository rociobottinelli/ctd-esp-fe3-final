import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { ICustomer } from "types/Types";
import CustomerDataForm from "./form-usuario.component";


const mockCustomer: ICustomer = {
  name: "John",
  lastname: "Doe",
  email: "john.doe@example.com",
};

describe("CustomerDataForm", () => {
  it("renders without crashing", () => {
    render(
      <CustomerDataForm
        data={mockCustomer}
        activeStep={1}
        handleNext={(data) => {}}
      />
    );
    expect(screen.getByLabelText("Nombre")).toBeInTheDocument();
    expect(screen.getByLabelText("Apellido")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("submits form when submit button is clicked", async () => {
    const handleSubmit = jest.fn();
    render(
      <CustomerDataForm
        data={mockCustomer}
        activeStep={1}
        handleNext={handleSubmit}
      />
    );
    await act(async () => {
      fireEvent.click(screen.getByText("SIGUIENTE"));
    });
    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith(mockCustomer);
  });

  it("displays error messages when fields are left empty", async () => {
    const handleSubmit = jest.fn();
    render(
      <CustomerDataForm
        data={mockCustomer}
        activeStep={1}
        handleNext={handleSubmit}
      />
    );
    await act(async () => {
      fireEvent.change(screen.getByLabelText("Nombre"), { target: { value: "" } });
      fireEvent.change(screen.getByLabelText("Apellido"), { target: { value: "" } });
      fireEvent.change(screen.getByLabelText("Email"), { target: { value: "" } });
      fireEvent.click(screen.getByText("SIGUIENTE"));
    });
    expect(handleSubmit).toHaveBeenCalledTimes(0);
    expect(screen.getByText("El nombre es un campo requerido.")).toBeInTheDocument();
    expect(screen.getByText("El apellido es un campo requerido.")).toBeInTheDocument();
    expect(screen.getByText("El email es un campo requerido.")).toBeInTheDocument();
  });
});
