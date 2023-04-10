import type { NextPage } from "next";
import Head from "next/head";
import style from "./index.module.css";
import { Stack, Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { IComicResponse } from "types/Types";
import { useRouter } from "next/router";
import { getComics } from "dh-marvel/services/marvel/marvel.service";
import { getComicsByPage } from "dh-marvel/services/comics/comics.service";
import GridLayout from "dh-marvel/components/home-comics/home-comics.component";
import PaginationComponent from "dh-marvel/components/pagination/Pagination";
import Image from "next/image";

interface Props {
  comics: IComicResponse;
}

const QTY_OF_CARDS = 12;

const Index: NextPage<Props> = ({ comics }) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number | null>(null);
  const [comicsData, setComicsData] = useState<IComicResponse>();

  useEffect(() => {
    localStorage.clear();
  }, []);

  useEffect(() => {
    if (currentPage !== null) {
      router.push(`/?page=${currentPage}`, undefined, { shallow: true });

      getComicsByPage(QTY_OF_CARDS, currentPage).then(
        (data: IComicResponse) => {
          if (data.code === 200) {
            setComicsData(data);
          }
        }
      );
    }
  }, [currentPage]);

  const pagesQty: number =
    comics?.data?.total !== undefined ? Math.ceil(comics.data.total / 12) : 1;

  return (
    <>
      <Head>
        <title>Marvel Comics</title>
        <meta name="description" content="Digital House | Marvel" />
      </Head>
      <Box className={style.banner}></Box>

      <Stack
        className={style.home}
        component="section"
        direction="column"
        alignItems="center"
        paddingX={{ xs: 3, sm: 4, md: 4 }}
      >
      
        <Typography className={style.titleHome}>MARVEL</Typography>
        <PaginationComponent
          pagesQty={pagesQty}
          setCurrentPage={setCurrentPage}
        />
        <Box className={style.cardsGrid}>
          <GridLayout
            comics={
              comicsData === undefined
                ? comics.data?.results
                : comicsData.data?.results
            }
          />
        </Box>
        <PaginationComponent
          pagesQty={pagesQty}
          setCurrentPage={setCurrentPage}
        />
      </Stack>
    </>
  );
};

export async function getServerSideProps() {
  const comics = await getComics(0, QTY_OF_CARDS);
  return { props: { comics } };
}

export default Index;
