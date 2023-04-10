import type { NextPage } from "next";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { IComic } from "types/Types";
import style from "./card-comic-details.module.css";

export const discount = (oldPrice?: number, newPrice?: number) => {
  if (oldPrice && newPrice) {
    return Math.round(100 - (newPrice * 100) / oldPrice);
  }
  return 0;
};

interface Props {
  comic: IComic;
}

const CardComicDetails: NextPage<Props> = ({ comic }) => {
  const newPrice = discount(comic?.oldPrice, comic?.price);
  return (
    <Box
      sx={{
        paddingBottom: "30px",
      }}
    >
      <Typography gutterBottom variant="subtitle1" component="div">
        Serie: {comic.series.name}
      </Typography>
      <Typography gutterBottom variant="h5" className={style.comicTitle}>
        {comic.title}
      </Typography>
      <Box>
        {comic.oldPrice && comic.stock > 0 && (
          <Typography className={style.oldPrice}         >
            Antes: ${comic.oldPrice}
          </Typography>
        )}

        {newPrice > 0 && (
          <Typography className={style.discountOff}>
            {newPrice}% OFF
          </Typography>
        )}
      </Box>
      <Typography className={style.finalPrice}>${comic.price}</Typography>
    </Box>
  );
};

export default CardComicDetails;
