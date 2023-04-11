import { render, screen } from "@testing-library/react"
import AccordionDetailsComponent from "./accordion-comic-details"
import { IComic } from "types/Types"
import { MockedComic } from "dh-marvel/test/mocks/comic"

describe("Accordion Comic", ()=> {
    test("rendering component", () => {
        render(<AccordionDetailsComponent comic={MockedComic as IComic}/>)
        const accordionSection2 = screen.getByText("Descripción")
        const description = screen.getByText("Esta es la descripcion")
        expect(accordionSection2).toBeInTheDocument()
        expect(description).toBeInTheDocument();
    })

})