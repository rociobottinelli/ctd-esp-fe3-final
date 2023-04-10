import { Button, Stack } from "@mui/material";
import LayoutCheckout from "dh-marvel/components/layouts/layout-checkout";
import { useEffect, useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { ICheckout } from "types/Types";
import CardSuccess from "dh-marvel/components/checkout-compra-exitosa/compra-exitosa";
import Head from "next/head";

const SuccesCheckout: NextPage = () => {
  const router = useRouter();
  const [dataCheckout, setDataCheckout] = useState<ICheckout>();

  useEffect(() => {
    const data = localStorage.getItem("checkoutData");
    if (data !== null) {
      const obj = JSON.parse(data);
      setDataCheckout(obj);
    } else {
      router.push("/");
    }
  }, []);


  return (
    <>
    <Head>
      <title>¡Gracias por tu compra!</title>
      </Head>
    <Stack paddingTop={20} direction="column" alignItems="center">
      <CardSuccess data={dataCheckout} />
      <NextLink href="/">
        <Button sx={{ margin: 15 }}>
          VOLVER AL INICIO
        </Button>
      </NextLink>
    </Stack>
 </> );
};
(SuccesCheckout as any).Layout = LayoutCheckout;

export default SuccesCheckout;
