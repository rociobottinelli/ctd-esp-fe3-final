import React, { FC } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { IComic } from "types/Types";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { getComicsById } from "dh-marvel/services/comics/comics.service";
import style from "./Card.module.css";

interface Props {
  comic: IComic;
}

const CardComponent: FC<Props> = ({ comic }) => {
  const router = useRouter();

  const handleBuy = async (id: number) => {
    const response: IComic = await getComicsById(id);

    if (response.stock > 0) {
      router.push({
        pathname: "/checkout",
        query: { comic: comic.id },
      });
    } else {
      router.push(`/comics/${id}`);
    }
  };

  return (
    <Card variant="outlined" className={style.card}>
      <Box>
        <CardMedia
          image={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
          alt={comic.title}
          height={270}
          component="img"
        />
        <CardContent>
          <Typography gutterBottom component="div" className={style.comicTitle}>
            {comic.title}
          </Typography>
        </CardContent>
      </Box>
      <CardActions className={style.divButtons}>
        <NextLink href={`/comics/${comic.id}`}>
          <Button className={style.detalleButton}>VER DETALLE</Button>
        </NextLink>
        <Button className={style.comprarButton} onClick={() => handleBuy(comic.id)}>
          COMPRAR
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardComponent;
