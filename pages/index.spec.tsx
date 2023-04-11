import { render, screen } from "@testing-library/react";
import Index from "dh-marvel/pages/index.page";
import { mockedArrayComics } from "dh-marvel/test/mocks/comic";
import { IComicResponse } from "types/Types";

describe("Index", () => {
  describe("rendering", () => {
    test("comic title", () => {
      render(<Index comics={mockedArrayComics as IComicResponse} />);
      const title = screen.getByText("MARVEL");
      expect(title).toBeInTheDocument();
    });
  })})
