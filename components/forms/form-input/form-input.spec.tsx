import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FC, PropsWithChildren, ReactElement } from "react";
import FormInput from "./FormInput.component";
import { useForm, FormProvider } from "react-hook-form";

describe("FormInput", () => {
  describe("render", () => {
    it("textbox", () => {
      renderReactForm(<FormInput name="name" label="Name" />);

      const textbox = screen.getByRole("textbox", { name: "Name" });
      expect(textbox).toBeInTheDocument();
      expect(textbox).toHaveValue("");
    });
    it("password toggle", () => {
      renderReactForm(<FormInput name="name" label="Name" type="password" />);
      const buttonPassword = screen.getByLabelText(
        "toggle password visibility"
      );
      expect(buttonPassword).toBeInTheDocument();
    });
    it("render input", () => {
      renderReactForm(<FormInput name="name" label="Name" />, {
        defaultValues: { name: "Prueba" },
      });
      const textbox = screen.getByRole("textbox", { name: "Name" });
      expect(textbox).toHaveValue("Prueba");
    });
  });

  describe("password input", () => {
    it("toggle fro hiding or showing", async () => {
      renderReactForm(
        <FormInput name="password" label="Password" type="password" />
      );
      const buttonPassword = screen.getByLabelText(
        "toggle password visibility"
      );
      const input = screen.getByLabelText("Password");
      expect(input).toHaveAttribute("type", "password");
      await userEvent.click(buttonPassword);

      expect(await screen.findByLabelText("Password")).toHaveAttribute(
        "type",
        "text"
      );
    });
  });

  describe("input writing", () => {
    it("render", async () => {
      renderReactForm(<FormInput name="name" label="Name" />, {
        defaultValues: { name: "" },
      });
      const textbox = screen.getByRole<HTMLInputElement>("textbox", {
        name: "Name",
      });
      await userEvent.type(textbox, "Prueba");
      expect(textbox.value).toBe("Prueba");
    });
    it("only typing numbers", async () => {
        const regexOnlyNumbers = /^[0-9]*$/gm;
        renderReactForm(
          <FormInput name="number" label="Number" regex={regexOnlyNumbers} />,
          { defaultValues: { number: "" } }
        );
        const textbox = screen.getByRole<HTMLInputElement>("textbox", {
          name: "Number",
        });
        await userEvent.type(textbox, "NotANumber");
        expect(textbox.value).toBe("");
      });
    it("rendering numbers", async () => {
      const regexOnlyNumbers = /^[0-9]*$/gm;
      renderReactForm(
        <FormInput name="number" label="Number" regex={regexOnlyNumbers} />,
        {
          defaultValues: { number: "" },
        }
      );
      const textbox = screen.getByRole<HTMLInputElement>("textbox", {
        name: "Number",
      });
      await userEvent.type(textbox, "11111");
      expect(textbox.value).toBe("11111");
    });
  });
});
function renderReactForm(ui: ReactElement, { defaultValues = {} } = {}) {
  const Wrapper: FC<PropsWithChildren> = ({ children }) => {
    const methods = useForm({ defaultValues });
    return <FormProvider {...methods}>{children}</FormProvider>;
  };

  return {
    ...render(ui, { wrapper: Wrapper }),
  };
}
