import { fireEvent, render } from "@testing-library/react";
import PaginationComponent from "./Pagination";

describe("Pagination", () => {
    it("should render the correct number of pages", () => {
      const pageCount = 5;
      const { getAllByRole } = render(<PaginationComponent pagesQty={pageCount} setCurrentPage={()=>0} />);
      const pageButtons = getAllByRole("button");
  
      expect(pageButtons).toHaveLength(7);
    });
    it("should activate the correct page when a page button is clicked", () => {
        const { getByText } = render(<PaginationComponent pagesQty={5} setCurrentPage={()=>0}/>);
        const secondPageButton = getByText("2");
    
        fireEvent.click(secondPageButton);
    
        expect(secondPageButton).toHaveAttribute("aria-current", "true");
      });
})
   