import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Faq from "./index.page";
import { faqsData } from "dh-marvel/components/faqs/faqsData";

describe("Testing FAQ Page", () => {
  test("rendering of the heading", () => {
    render(<Faq faqsData={faqsData}/>);
    const faq_h1 = screen.getByText("Preguntas Frecuentes");
    expect(faq_h1).toBeInTheDocument();
  });
  test("rendering of all the questions", () => {
    render(<Faq faqsData={faqsData}/>);
    faqsData.forEach((question) => {
      var q = screen.getByText(question.question);
      expect(q).toBeInTheDocument();
    });
  });
  test("accordion opening answer when clicking", async () => {
    render(<Faq faqsData={faqsData}/>);
    faqsData.forEach(async (question) => {
      var q = screen.getByText(question.question);
      expect(q).toBeEnabled();
      fireEvent.click(q);
      waitFor(() =>expect(screen.findByText(question.answer)).toBeVisible());
    });
  });
});
