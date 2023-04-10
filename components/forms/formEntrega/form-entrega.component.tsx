import { Stack } from "@mui/material";
import { FC, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import entregaSchema from "./schema";
import StepperNavigation from "../checkout-stepper-navigation.component";
import { IAddress } from "types/Types";
import FormInput from "dh-marvel/components/forms/form-input/FormInput.component";

export type DeliveryFormProps = {
  data: IAddress;
  activeStep: number;
  handleNext: (data: IAddress) => void;
  handleBack: () => void;
};

const DeliveryForm: FC<DeliveryFormProps> = ({
  data,
  activeStep,
  handleNext,
  handleBack,
}) => {
  const methods = useForm<IAddress>({
    resolver: yupResolver(entregaSchema),
    defaultValues: {
      ...data,
    },
  });
  const { setFocus, handleSubmit } = methods;

  const onSubmit = (data: IAddress) => {
    handleNext(data);
  };
  useEffect(() => {
    setFocus("address1");
  }, []);

  return (
    <Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormProvider {...methods}>
          <FormInput name="address1" label="Dirección" />
          <FormInput name="address2" label="Dirección alternativa" />
          <FormInput name="city" label="Ciudad" />
          <FormInput name="state" label="Provincia" />
          <FormInput name="zipCode" label="Código postal" />
        </FormProvider>
      </form>
      <StepperNavigation
        activeStep={activeStep}
        handleNext={handleSubmit(onSubmit)}
        handleBack={handleBack}
      />
    </Stack>
  );
};

export default DeliveryForm;
