import { render, screen } from "@testing-library/react";
import CardCheckoutDetail from "./checkout-detail";
import { MockedComic } from "dh-marvel/test/mocks/comic";
describe("Rendering checkout detail card", () => {
  test("rendering title component", () => {
    render(<CardCheckoutDetail comic={MockedComic} />);
    const titleComic = screen.getByText("Marvel Comic");
    expect(titleComic).toBeInTheDocument();
  });
  test("rendering price component", () => {
    render(<CardCheckoutDetail comic={MockedComic} />);
    const priceComic = screen.getByText("Precio final: $50");
    expect(priceComic).toBeInTheDocument();
  });
});
