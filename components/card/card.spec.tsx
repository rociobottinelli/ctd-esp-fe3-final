import { render, screen } from "@testing-library/react"
import CardComponent from "./Card"
import { MockedComic } from "dh-marvel/test/mocks/comic"

describe("Card component", () => {
    it("Card title rendering", ()=> {
        render(<CardComponent comic={MockedComic} />) 
        const comicTitle = screen.getByText("Marvel Comic")
        expect(comicTitle).toBeInTheDocument();
    })
    it("Card buttons rendering", ()=> {
        render(<CardComponent comic={MockedComic} />) 
        const buttonDetalle = screen.getByText("VER DETALLE")
        expect(buttonDetalle).toBeInTheDocument();
        const buttonComprar = screen.getByText("COMPRAR");
        expect(buttonComprar).toBeInTheDocument();
    })
    it("Card image rendering", () => {
        render(<CardComponent comic={MockedComic} />) 
        const image = screen.getByAltText("Marvel Comic")
        image.hasAttribute('src');
        expect(image).toBeInTheDocument()
    })
})