import React, { FC, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Stepper,
  Step,
  StepButton,
  Snackbar,
  Alert,
} from "@mui/material";
import DeliveryForm from "../forms/formEntrega/form-entrega.component";
import PaymentForm from "../forms/formPago/form-pago.component";
import CustomerDataForm from "../forms/formUsuario/form-usuario.component";
import { postCheckout } from "dh-marvel/services/checkout/checkout.service";
import catchError from "../forms/checkout-errors";
import { useRouter } from "next/router";
import { IAddress, ICard, ICheckout, IComic, ICustomer } from "types/Types";

const steps = ["Datos Personales", "Dirección de entrega", "Datos del pago"];

type StepperForm = {
  comic?: IComic;
};

const StepperForm: FC<StepperForm> = ({ comic }) => {
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

  const defaultValue = {
    customer: {
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
    },
    card: {
      number: "",
      cvc: "",
      expDate: "",
      nameOnCard: "",
    },
    order: {
      name: "",
      image: "",
      price: 0,
    },
  };
  const router = useRouter();
  const [activeStep, setActiveStep] = useState<number>(0);
  const [checkoutData, setCheckoutData] = useState<ICheckout>(defaultValue);
  const [error, setError] = useState<string>("");

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  useEffect(() => {
    {
      comic &&
        setCheckoutData({
          ...checkoutData,
          order: {
            name: comic.title,
            image: `${comic?.thumbnail.path}.${comic.thumbnail.extension}`,
            price: comic.price,
          },
        });
    }
  }, [comic]);

  const handleSubmitCustomerForm = (data: ICustomer) => {
    setCheckoutData({
      ...checkoutData,
      customer: { ...data },
    });
    setActiveStep(activeStep + 1);
  };

  const handleSubmitAddressForm = (data: IAddress) => {
    setCheckoutData({
      ...checkoutData,
      customer: {
        ...checkoutData.customer,
        address: { ...data },
      },
    });
    setActiveStep(activeStep + 1);
  };

  const handleSubmitPaymentForm = (data: ICard) => {
    setCheckoutData({
      ...checkoutData,
      card: {
        ...data,
      },
    });
    const dataForm = {
      ...checkoutData,
      card: {
        ...data,
      },
    };
    const response = postCheckout(dataForm);

    response.then((response) => {
      if (!response.data) {
        const error = catchError(response);
        setError(error);
        setOpenSnackbar(true);
        return;
      } else {
        const customer = response.data.customer;
        const order = response.data.order;

        localStorage.setItem(
          "checkoutData",
          JSON.stringify({
            customer: customer,
            order: order,
          })
        );
        router.push({
          pathname: "/confirmacion-compra",
        });
      }
    });
  };

  const handleBack = () => {
    activeStep > 0 && setActiveStep(activeStep - 1);
  };
  const handleCloseErrorSnackbar = () => {
    setError("");
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        sx={{ paddingBottom: "50px" }}
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <Box>
        <Typography
          sx={{
            paddingBottom: "30px",
          }}
          variant="h5"
        >
          Paso {activeStep + 1}
        </Typography>
        {activeStep === 0 && (
          <CustomerDataForm
            data={checkoutData.customer}
            activeStep={activeStep}
            handleNext={handleSubmitCustomerForm}
          />
        )}
        {activeStep === 1 && (
          <DeliveryForm
            data={checkoutData.customer.address}
            activeStep={activeStep}
            handleBack={handleBack}
            handleNext={handleSubmitAddressForm}
          />
        )}
        {activeStep === 2 && (
          <PaymentForm
            activeStep={activeStep}
            handleBack={handleBack}
            handleNext={handleSubmitPaymentForm}
          />
        )}
      </Box>
      {error !== "" && (
        <Snackbar
    open={openSnackbar}
    autoHideDuration={6000}
    onClose={() => setOpenSnackbar(false)}
    message={error}
    sx={{ marginTop: "30px" }}
  >
     <Alert severity="error">
    {error}
  </Alert>
  </Snackbar>
      )}
    </Box>
  );
};

export default StepperForm;
