import React, { FC, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import pagoSchema from "./schema";
import { Box, Stack } from "@mui/material";
import StepperNavigation from "../../stepper/checkout-stepper-navigation.component";
import { ICard } from "types/Types";
import FormInput from "dh-marvel/components/forms/form-input/FormInput.component";


export type PagoFormProps = {
  activeStep: number;
  handleNext: (data: ICard) => void;
  handleBack: () => void;
};

const PaymentForm: FC<PagoFormProps> = ({
  activeStep,
  handleNext,
  handleBack,
}) => {
  const regexNumber = /^[0-9]*$/gm;

  const defaultValues = {
    cvc: "",
    expDate: "",
    nameOnCard: "",
    number: "",
  };

  const [payment, setPayment] = useState(defaultValues);

  const methods = useForm<ICard>({
    resolver: yupResolver(pagoSchema),
    defaultValues: {
      ...defaultValues,
    },
  });
  const { setFocus, handleSubmit, watch } = methods;

  const { number, nameOnCard, expDate, cvc } = watch();
  useEffect(() => {
    setPayment({
      number: number,
      nameOnCard: nameOnCard,
      expDate: expDate,
      cvc: cvc,
    });
  }, [number, nameOnCard, expDate, cvc]);

  useEffect(() => {
    setFocus("number");
  }, []);

  const onSubmit = (data: ICard) => {
    handleNext(data);
  };

  return (
    <Box id="PaymentForm">
      <Box paddingBottom={5}>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormProvider {...methods}>
          <FormInput
            name="number"
            regex={regexNumber}
            label="Número de la tarjeta"
            maxLength={16}
          />
          <FormInput
            name="nameOnCard"
            label="Nombre como figura en la tarjeta"
          />
          <Stack direction="row" spacing={5}>
            <FormInput
              name="expDate"
               maxLength={4}
               label="Fecha expiración"
              regex={regexNumber}
             
            />
            <FormInput
              type="password"
              maxLength={3}
              regex={regexNumber}
              name="cvc"
              label="CVC"
              
            />
          </Stack>
        </FormProvider>
      </form>

      <StepperNavigation
        activeStep={activeStep}
        handleNext={handleSubmit(onSubmit)}
        handleBack={handleBack}
      />
    </Box>
  );
};

export default PaymentForm;
