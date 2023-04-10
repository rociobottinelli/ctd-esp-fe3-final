import { Stack } from "@mui/material";
import { FC, useEffect } from "react";
import { usuarioSchema } from "./schema";
import StepperNavigation from "../checkout-stepper-navigation.component";
import { ICustomer } from "types/Types";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormInput from "dh-marvel/components/forms/form-input/FormInput.component";

export type CustomerDataProps = {
  data: ICustomer;
  activeStep: number;
  handleNext: (data: ICustomer) => void;
};

const CustomerDataForm: FC<CustomerDataProps> = ({
  data,
  activeStep,
  handleNext,
}: CustomerDataProps) => {
  const methods = useForm<ICustomer>({
    resolver: yupResolver(usuarioSchema),
    defaultValues: { ...data },
  });
  useEffect(() => {
    setFocus("name");
  }, []);
  const { setFocus, handleSubmit } = methods;

  const onSubmit = (data: ICustomer) => {
    handleNext(data);
  };

  return (
    <Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormProvider {...methods}>
          <FormInput name="name" label="Nombre" />
          <FormInput name="lastname" label="Apellido" />
          <FormInput name="email" label="Email" />
        </FormProvider>
      </form>
      <StepperNavigation
        activeStep={activeStep}
        handleNext={handleSubmit(onSubmit)}
        handleBack={() => {}}
      />
    </Stack>
  );
};

export default CustomerDataForm;
