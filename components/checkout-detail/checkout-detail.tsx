import { Box, Skeleton, Typography } from "@mui/material";
import { FC } from "react";
import { IComic } from "types/Types";
import style from "./checkout-detail.module.css"
type CardCheckoutDetailProps = {
  comic: IComic | undefined;
};

const CardCheckoutDetail: FC<CardCheckoutDetailProps> = ({ comic }) => {
  return (
    <Box className={style.divDetail}>
      <Box>
        {!comic ? (
          <Skeleton
            data-testid="skeleton-image"
          />
        ) : (
          <Box
          className={style.detailImage}
            component="img"
            src={`${comic?.thumbnail.path}.${comic?.thumbnail.extension}`}
            alt={comic?.title}
          />
        )}
      </Box>
          <Box>
      <Box
      >
        {!comic ? (
          <Skeleton
            sx={{ height: 25, minWidth: "100%" }}
            animation="wave"
            variant="rectangular"
            data-testid="skeleton-title"
          />
        ) : (
          <Typography className={style.comicTitle} variant="h5">{comic?.title}</Typography>
        )}
      </Box>
      <Box className={style.priceDetails}
      >
        {!comic ? (
          <Skeleton
            animation="wave"
            variant="rectangular"
            data-testid="skeleton-price"
          />
        ) : (
          <>
            <Typography variant="h6">Precio final: ${comic?.price}</Typography>
          </>
        )}
      </Box>
    </Box></Box>
  );
};

export default CardCheckoutDetail;
