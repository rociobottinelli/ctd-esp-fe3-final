import React, { ChangeEvent, FC, useState } from "react";
import { Pagination, Stack } from "@mui/material";
import style from "./Pagination.module.css";

interface Props {
  pagesQty: number;
  setCurrentPage: (page: number) => void;
}

const PaginationComponent: FC<Props> = ({ pagesQty, setCurrentPage }) => {
  const [page, setPage] = useState<number>(1);
  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setCurrentPage(value);
  };

  return (
    <Stack>
      <Pagination className={style.pagination} count={pagesQty} onChange={handleChange} />
    </Stack>
  );
};

export default PaginationComponent;

