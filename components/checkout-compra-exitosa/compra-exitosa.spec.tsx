import { mockCheckout } from "dh-marvel/test/mocks/checkout";
import CardSuccess from "./compra-exitosa";
import { render, screen } from "@testing-library/react";
describe("Rendering success card", () => {
  test("rendering msg component", () => {
    render(<CardSuccess data={mockCheckout} />);
    const msgThanks = screen.getByText(
      "Gracias por tu compra, ¡esperamos que la disfrutes!"
    );
    expect(msgThanks).toBeInTheDocument();
  });
  test("rendering title component", () => {
    render(<CardSuccess data={mockCheckout} />);
    const titleComic = screen.getByText(
        "Marvel Comics"
    );
    expect(titleComic).toBeInTheDocument();
  });
  test("rendering datos component", () => {
    render(<CardSuccess data={mockCheckout} />);
    const datos = screen.getByText(
        "Datos de entrega:"
    );
    expect(datos).toBeInTheDocument();
  });
  test("rendering user data component", () => {
    render(<CardSuccess data={mockCheckout} />);
    const userName = screen.getByText(
        "Comprador: TestUser"
    );
    expect(userName).toBeInTheDocument();
  });
  test("rendering user data component", () => {
    render(<CardSuccess data={mockCheckout} />);
    const userAdress = screen.getByText(
        "Dirección de entrega: address 123"
    );
    expect(userAdress).toBeInTheDocument();
  });

});
