import type { NextPage } from "next";
import { Grid } from "@mui/material";
import { IComic } from "types/Types";
import CardComponent from "../card/Card";



interface Props {
  comics: IComic[];
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

const GridLayout: NextPage<Props> = ({
  comics
}) => {
  const renderResults = () =>
    comics?.map((comic) => {
      return (
        <Grid item xs={12} sm={12} md={6} lg={4} xl={3} key={comic.id}>
          <CardComponent comic={comic} />
        </Grid>
      );
    });

  return (
    <Grid
      container
      alignItems="stretch"
      rowSpacing={{ xs: 3, sm: 2, md: 4 }}
      columnSpacing={{ sm: 2, md: 4 }}
    >
      {renderResults()}
    </Grid>
  );
};

export default GridLayout;
