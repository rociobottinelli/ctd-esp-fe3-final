import { Box, Stack } from "@mui/material";
import CardCheckoutProduct from "dh-marvel/components/checkout-detail/checkout-detail";
import StepperForm from "dh-marvel/components/forms/checkout-stepper.component";
import LayoutCheckout from "dh-marvel/components/layouts/layout-checkout";
import { getComicsById } from "dh-marvel/services/comics/comics.service";
import style from "./checkout.module.css"
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IComic } from "types/Types";
import Head from "next/head";

const Checkout: NextPage = () => {
  const router = useRouter();
  const { comic } = router.query;
  const [comicData, setComicData] = useState<IComic>();

  useEffect(() => {
    const id = parseInt(comic as string);

    if (comic) {
      getComicsById(id).then((data) => {
        setComicData(data);
      });
    }
  }, [comic]);


  return (
    <>
    <Head>
        <title>Proceso de pago</title>
      
      </Head>
    <Box  className={style.checkout}  >
      <Stack>
        <Box>
          <CardCheckoutProduct comic={comicData} />
        </Box>
        <Box>
          <StepperForm comic={comicData} />
        </Box>
      </Stack>
    </Box>
 </> );
};
(Checkout as any).Layout = LayoutCheckout;

export default Checkout;
