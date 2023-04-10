import { render, screen } from "@testing-library/react"
import AccordionDetailsComponent from "./accordion-comic-details"
import { IComic } from "types/Types"

const mockedData = {
    creators: { items: [] },
    description: "Descripcion",
    characters: { items: [] },
}
describe("Accordion Comic", ()=> {
    test("rendering component", () => {
        render(<AccordionDetailsComponent comic={mockedData as IComic}/>)
        const accordionSection2 = screen.getByText("Descripción")
        expect(accordionSection2).toBeInTheDocument()
    })
})