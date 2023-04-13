import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CustomerDataForm from "./forms/formUsuario/form-usuario.component";
import { FC, PropsWithChildren, ReactElement } from "react";
import { FormProvider, useForm } from "react-hook-form";
import DeliveryForm from "./forms/formEntrega/form-entrega.component";
import PaymentForm from "./forms/formPago/form-pago.component";
import { MockedComic } from "dh-marvel/test/mocks/comic";
import StepperForm from "./stepper/checkout-stepper.component";

export function helperFormHook(ui: ReactElement, { defaultValues = {} } = {}) {
  const Wrapper: FC<PropsWithChildren> = ({ children }) => {
    const methods = useForm({ defaultValues });
    return <FormProvider {...methods}>{children}</FormProvider>;
  };

  return {
    ...render(ui, { wrapper: Wrapper }),
  };
}
const emptyData = {
  name: "",
  lastname: "",
  email: "",
  address: {
    address1: "",
    address2: null,
    city: "",
    state: "",
    zipCode: "",
  },
};
const emptyAddress = {
  address1: "",
  address2: null,
  city: "",
  state: "",
  zipCode: "",
};

describe("Checkout - User Data", () => {
  describe("rendering", () => {
    it("focus the name input when first rendering", () => {
      helperFormHook(
        <CustomerDataForm
          data={emptyData}
          activeStep={0}
          handleNext={() => {}}
        />
      );
      const inputName = screen.getByRole("textbox", { name: "Nombre" });
      expect(inputName).toHaveFocus();
    });
    test("all user data inputs are rendering", () => {
      helperFormHook(
        <CustomerDataForm
          data={emptyData}
          activeStep={0}
          handleNext={() => {}}
        />
      );

      const inputName = screen.getByRole("textbox", { name: "Nombre" });
      const inputSurname = screen.getByRole("textbox", { name: "Apellido" });
      const inputEmail = screen.getByRole("textbox", { name: "Email" });

      expect(inputName).toBeInTheDocument();
      expect(inputSurname).toBeInTheDocument();
      expect(inputEmail).toBeInTheDocument();
    });
  });

  describe("User completing form", () => {
    test("rendering", async () => {
      helperFormHook(
        <CustomerDataForm
          data={emptyData}
          activeStep={0}
          handleNext={() => {}}
        />
      );

      const inputName = screen.getByRole<HTMLInputElement>("textbox", {
        name: "Nombre",
      });
      const inputSurname = screen.getByRole<HTMLInputElement>("textbox", {
        name: "Apellido",
      });
      const inputEmail = screen.getByRole<HTMLInputElement>("textbox", {
        name: "Email",
      });

      await userEvent.type(inputName, "Name");
      await userEvent.type(inputSurname, "Surname");
      await userEvent.type(inputEmail, "namesurname@test.com");

      expect(inputName.value).toBe("Name");
      expect(inputSurname.value).toBe("Surname");
      expect(inputEmail.value).toBe("namesurname@test.com");
    });
  });
});

describe("Checkout - User Address", () => {
  describe("rendering", () => {
    test("focus the address input when first rendering", () => {
      helperFormHook(
        <DeliveryForm
          data={emptyAddress}
          activeStep={1}
          handleNext={() => {}}
          handleBack={() => {}}
        />
      );

      const inputAddress = screen.getByRole("textbox", { name: "Dirección" });
      expect(inputAddress).toHaveFocus();
    });

    test("all inputs in screen", () => {
      helperFormHook(
        <DeliveryForm
          data={emptyAddress}
          activeStep={1}
          handleNext={() => {}}
          handleBack={() => {}}
        />
      );

      const inputAddress = screen.getByRole("textbox", {
        name: "Dirección",
      });
      const inputAddressAlt = screen.getByRole("textbox", {
        name: "Dirección alternativa",
      });
      const inputCity = screen.getByRole("textbox", { name: "Ciudad" });
      const inputState = screen.getByRole("textbox", { name: "Provincia" });
      const inputZip = screen.getByRole("textbox", {
        name: "Código postal",
      });

      expect(inputAddress).toBeInTheDocument();
      expect(inputAddressAlt).toBeInTheDocument();
      expect(inputCity).toBeInTheDocument();
      expect(inputState).toBeInTheDocument();
      expect(inputZip).toBeInTheDocument();
    });
  });

  describe("user completing form", () => {
    test("rendering", async () => {
      helperFormHook(
        <DeliveryForm
          data={emptyAddress}
          activeStep={1}
          handleNext={() => {}}
          handleBack={() => {}}
        />
      );

      const inputAddress = screen.getByRole<HTMLInputElement>("textbox", {
        name: "Dirección",
      });
      const inputAddressAlt = screen.getByRole<HTMLInputElement>("textbox", {
        name: "Dirección alternativa",
      });
      const inputCity = screen.getByRole<HTMLInputElement>("textbox", {
        name: "Ciudad",
      });
      const inputState = screen.getByRole<HTMLInputElement>("textbox", {
        name: "Provincia",
      });
      const inputZip = screen.getByRole<HTMLInputElement>("textbox", {
        name: "Código postal",
      });

      await userEvent.type(inputAddress, "Direccion 123");
      await userEvent.type(inputAddressAlt, "Direccion Alternativa 123");
      await userEvent.type(inputCity, "Ciudad");
      await userEvent.type(inputState, "Estado");
      await userEvent.type(inputZip, "1111");

      expect(inputAddress.value).toBe("Direccion 123");
      expect(inputAddressAlt.value).toBe("Direccion Alternativa 123");
      expect(inputCity.value).toBe("Ciudad");
      expect(inputState.value).toBe("Estado");
      expect(inputZip.value).toBe("1111");
    });
  });
});
describe("Checkout = User Pay", () => {
  describe("rendering", () => {
    test("show all the inputs", () => {
      helperFormHook(
        <PaymentForm
          activeStep={1}
          handleNext={() => {}}
          handleBack={() => {}}
        />
      );

      const inputCard = screen.getByRole("textbox", {
        name: "Número de la tarjeta",
      });
      const inputCardName = screen.getByRole("textbox", {
        name: "Nombre como figura en la tarjeta",
      });
      const inputExpDate = screen.getByRole("textbox", {
        name: "Fecha expiración",
      });
      const inputCVC = screen.getByLabelText("CVC");

      expect(inputCard).toBeInTheDocument();
      expect(inputCardName).toBeInTheDocument();
      expect(inputExpDate).toBeInTheDocument();
      expect(inputCVC).toBeInTheDocument();
    });
  });

  test("focus on card number in first rendering", () => {
    helperFormHook(
      <PaymentForm activeStep={1} handleNext={() => {}} handleBack={() => {}} />
    );

    const inputCard = screen.getByRole("textbox", {
      name: "Número de la tarjeta",
    });
    expect(inputCard).toHaveFocus();
  });

  describe("filling inputs", () => {
    test("rendering", async () => {
      helperFormHook(
        <PaymentForm
          activeStep={1}
          handleNext={() => {}}
          handleBack={() => {}}
        />
      );

      const inputCard = screen.getByRole<HTMLInputElement>("textbox", {
        name: "Número de la tarjeta",
      });
      const inputNameCard = screen.getByRole<HTMLInputElement>("textbox", {
        name: "Nombre como figura en la tarjeta",
      });
      const inputExpDate = screen.getByRole<HTMLInputElement>("textbox", {
        name: "Fecha expiración",
      });
      const inputCVC = screen.getByLabelText<HTMLInputElement>("CVC");

      await userEvent.type(inputCard, "1212121212121212");
      await userEvent.type(inputNameCard, "Testing");
      await userEvent.type(inputExpDate, "1010");
      await userEvent.type(inputCVC, "111");

      expect(inputCard.value).toBe("1212121212121212");
      expect(inputNameCard.value).toBe("Testing");
      expect(inputExpDate.value).toBe("1010");
      expect(inputCVC.value).toBe("111");
    });
  });
});

describe("Testing Stepper", () => {
  describe("render", () => {
    test("should render all the data", () => {
      helperFormHook(<StepperForm comic={MockedComic} />);
      const stepperSteps = [
        "Datos Personales",
        "Dirección de entrega",
        "Datos del pago",
      ];

      const step1 = screen.getByText("Datos Personales");
      expect(step1).toBeInTheDocument();
      const step2 = screen.getByText("Dirección de entrega");
      expect(step2).toBeInTheDocument();
      const step3 = screen.getByText("Datos del pago");
      expect(step3).toBeInTheDocument();
    });
  });
});
