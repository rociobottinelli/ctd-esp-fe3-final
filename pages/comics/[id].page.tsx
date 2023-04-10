import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { Box } from "@mui/system";
import style from "./comicDetail.module.css";
import { Button, Grid, Stack } from "@mui/material";
import { getComic, getComics } from "dh-marvel/services/marvel/marvel.service";
import { useRouter } from "next/router";
import NextLink from "next/link";
import CardComicDetails from "dh-marvel/components/card-comic-details/card-comic-details";
import { IComic, IComicResponse } from "types/Types";
import AccordionDetailsComponent from "dh-marvel/components/accordion-comic/accordion-comic-details";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = parseInt(params?.id as string);
  const data = await getComic(id);

  return {
    props: {
      comic: data,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data: IComicResponse = await getComics();

  const paths = data.data.results.map((comic) => {
    return { params: { id: comic.id.toString() } };
  });

  return {
    paths,
    fallback: true,
  };
};

interface Props {
  comic: IComic;
}

const Comic: NextPage<Props> = ({ comic }) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{comic?.title}</title>
        <meta name="description" content={`Comic: ${comic?.title}`} />
      </Head>
      <Stack
        component="section"
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        maxWidth="xl"
        sx={{
          padding: "50px 20px",
        }}
      >
        <Grid container spacing={4} maxWidth="xl">
          <Grid item xs={12} sm={12} md={6}>
            <Box>
              <Box
                component="img"
                alt={comic?.title}
                className={style.detailImage}
                src={`${comic?.thumbnail.path}.${comic?.thumbnail.extension}`}
                sx={{
                  margin: "auto",
                  maxWidth: "100%",
                  maxHeight: "100%",
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <CardComicDetails comic={comic} />
            <Box
              sx={{
                paddingBottom: "90px",
              }}
            >
              {comic?.stock > 0 ? (
                <NextLink
                  href={{ pathname: "/checkout/", query: `comic=${comic?.id}` }}
                >
                  <Button className={style.comprarButton}>
                    COMPRAR
                  </Button>
                </NextLink>
              ) : (
                <Button disabled className={style.comprarButtonDisabled}>
                  SIN STOCK
                </Button>
              )}
            </Box>
            <AccordionDetailsComponent comic={comic} />
          </Grid>
        </Grid>
      </Stack>
    </>
  );
};


export default Comic;
