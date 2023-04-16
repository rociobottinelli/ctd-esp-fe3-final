import { Box, Card, Stack, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { FC } from "react";
import { ICheckout } from "types/Types";
import style from "./compra-exitosa.module.css";
type CardSuccessProps = {
  data: ICheckout;
};

const CardSuccess: FC<CardSuccessProps> = ({ data }) => {
  return (
    <Card className={style.card}>
      <Box>
        <Box
          className={style.orderImg}
          component="img"
          alt={data?.order.name}
          src={`${data?.order.image}`}
        />
      </Box>
      <Box className={style.divText}>
        <CheckCircleOutlineIcon
          className={style.icon}
          color="success"
          sx={{ fontSize: 50 }}
        />
<Box>
        <Typography
          variant="h4"
          className={style.textThanks}
        >
          Que disfrutes tu compra
        </Typography>
        <Box>
          <Typography className={style.orderName}>
            {data?.order.name}
          </Typography>
          <Typography >
            Precio = ${data?.order.price}
          </Typography>
        </Box>
        <Box className={style.divDatos}>
          <Typography className={style.titleDatos}>
            Datos de entrega:
          </Typography>
          <Typography >
            Comprador: {data?.customer.name}
            {data?.customer.lastname}
          </Typography>
          <Typography >
            Dirección de entrega: {data?.customer.address.address1}
          </Typography>
          {data?.customer.address.address2 && (
            <Typography paddingBottom={1}>
              Dirección alternativa: {data?.customer.address.address2}
            </Typography>
          )}
        </Box></Box>
      </Box>
    </Card>
  );
};

export default CardSuccess;
