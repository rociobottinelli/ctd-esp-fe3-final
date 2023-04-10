import React, { FC } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
} from "@mui/material";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import { IComic } from "types/Types";
import NextLink from "next/link";
export const getId = (uri: string): number => {
  const array = uri.split("/");
  const id = array[array.length - 1];

  return parseInt(id);
};

interface AccordionProps {
  comic: IComic;
}
const AccordionDetailsComponent: FC<AccordionProps> = ({ comic }) => {
  return comic.description !== null && comic.description !== "" ? (
    <Accordion>
      <AccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Descripción</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{comic.description}</Typography>
      </AccordionDetails>
    </Accordion>
  ) : (
    <></> &&
      (comic.characters.items.length > 0 ? (
        <Accordion>
          <AccordionSummary
            expandIcon={<ArrowForwardIosSharpIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Personajes</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {comic.characters.items.map((c) => {
              return (
                <NextLink
                  href={`/personajes/${getId(c.resourceURI)}`}
                  key={c.name}
                >
                  <Button fullWidth size="small">
                    {c.name}
                  </Button>
                </NextLink>
              );
            })}
            <Typography>{comic.description}</Typography>
          </AccordionDetails>
        </Accordion>
      ) : (
        <></> &&
        (comic.creators.items.length > 0 ? (
          <Accordion>
            <AccordionSummary
              expandIcon={<ArrowForwardIosSharpIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Creadores</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {comic.creators.items.map((cr) => {
                return (
                  <Typography key={cr.name}>
                    {cr.name} | {cr.role}
                  </Typography>
                );
              })}
            </AccordionDetails>
          </Accordion>
        ) : (
          <></>
        ))
      ))
  );
};
export default AccordionDetailsComponent;
