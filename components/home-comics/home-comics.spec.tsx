import { render, screen } from "@testing-library/react"
import GridLayout from "./home-comics.component"
import { MockedComic, mockedArrayComics } from "dh-marvel/test/mocks/comic"

describe("testing home comics grid", ()=> {
    test("rendering", ()=> {
        render(<GridLayout comics={mockedArrayComics}/> )
        const comicTitle = screen.getByText("SpiderMan")
        expect(comicTitle).toBeInTheDocument();
    })
})