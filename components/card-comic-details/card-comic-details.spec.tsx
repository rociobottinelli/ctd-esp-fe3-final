import { MockedComic } from "dh-marvel/test/mocks/comic";
import CardComicDetails from "./card-comic-details";
import { render, screen } from "@testing-library/react";

describe("Comic Details", () => {
  test("rendering series component", () => {
    render(<CardComicDetails comic={MockedComic} />);
    const series = screen.getByText("Serie: Marvel Previews (2017 - Present)");
    expect(series).toBeInTheDocument();
  }),
    test("rendering title component", () => {
      render(<CardComicDetails comic={MockedComic} />);

      const title = screen.getByText("Marvel Comic");
      expect(title).toBeInTheDocument();
    }),
    test("rendering old price component", () => {
      render(<CardComicDetails comic={MockedComic} />);

      const oldPrice = screen.getByText("Antes: $100");
      expect(oldPrice).toBeInTheDocument();
    });
  test("rendering discount component", () => {
    render(<CardComicDetails comic={MockedComic} />);

    const discount = screen.getByText("50% OFF");
    expect(discount).toBeInTheDocument();
  });
  test("rendering price component", () => {
    render(<CardComicDetails comic={MockedComic} />);
    const price = screen.getByText("$50");
    expect(price).toBeInTheDocument();
  });
});
