import { render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import { getComicsById } from "dh-marvel/services/comics/comics.service";
import Checkout from "./index.page";
import { MockedComic } from "dh-marvel/test/mocks/comic";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("dh-marvel/services/comics/comics.service", () => ({
  getComicsById: jest.fn(),
}));

describe("Checkout", () => {
  it("should render the checkout page with the comic and stepper form", async () => {

    (useRouter as jest.Mock).mockReturnValue({
      query: { comic: "1" },
    });

    (getComicsById as jest.Mock).mockResolvedValue(MockedComic);

    const { findByText } = render(<Checkout />);

    expect(await findByText("Marvel Comic")).toBeInTheDocument();
  });
});
