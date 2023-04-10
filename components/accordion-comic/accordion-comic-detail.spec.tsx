import { render, screen } from "@testing-library/react"
import AccordionDetailsComponent from "./accordion-comic-details"
import { IComic } from "types/Types"
import { MockedComic } from "dh-marvel/test/mocks/comic"

const mockedData = {
    creators: { items: [] },
    description: "Esta es la descripcion",
    characters: { items: [] },
}
describe("Accordion Comic", ()=> {
    test("rendering component", () => {
        render(<AccordionDetailsComponent comic={mockedData as IComic}/>)
        const accordionSection2 = screen.getByText("Descripción")
        const description = screen.getByText("Esta es la descripcion")
        expect(accordionSection2).toBeInTheDocument()
        expect(description).toBeInTheDocument();
    })
    test("rendering creators", ()=> {
        render(<AccordionDetailsComponent comic={MockedComic as IComic />})
        const creatorAccordion = screen.getByText("Creadores")
        const characterAccordion = screen.getByText("Personajes")
        const creatorInfo =  screen.getByText("Jim Nausedas")
        const characterInfo =  screen.getByText("Spider-Man (Peter Parker)")

        expect(characterAccordion).toBeInTheDocument();
        expect(creatorAccordion).toBeInTheDocument();
        expect(characterInfo).toBeInTheDocument();
        expect(creatorInfo).toBeInTheDocument();

    })
})