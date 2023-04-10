import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { Box } from "@mui/system";
import style from "./character.module.css";
import { Stack, Typography } from "@mui/material";
import {
  getCharacter,
  getCharacters,
} from "dh-marvel/services/marvel/marvel.service";
import { ICharacter, ICharacterResponse } from "types/Types";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = parseInt(params?.id as string);
  const data = await getCharacter(id);

  return {
    props: {
      character: data,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data: ICharacterResponse = await getCharacters();

  const paths = data.data.results.map((c) => {
    return { params: { id: c.id.toString() } };
  });

  return {
    paths,
    fallback: true,
  };
};

interface PropsCharacter {
  character: ICharacter;
}

const Character: NextPage<PropsCharacter> = ({ character }) => {
  return (
    <>
      <Head>
        <title>{character.name}</title>
        <meta
          name="description"
          content={`${character.name}.${character.description}`}
        />
      </Head>
      <Stack component="section" direction="column" alignItems="center">
        <Stack component="section">
          <Typography className={style.characterName} variant="h3">
            {character.name}
          </Typography>
          <Box
            className={style.characterImage}
            component="img"
            alt={character.name}
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          />
          {character.description ? (
            <Typography
              className={style.characterDescription}
              gutterBottom
              component="div"
            >
              {character.description}
            </Typography>
          ) : (
            <></>
          )}
        </Stack>
      </Stack>
    </>
  );
};

export default Character;
