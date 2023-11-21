import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Table1 }  from "./Table1";
describe("Table1 component", () => {
    it("should render all the view components correctly", () => {
        render(<Table1 />);
        const headings = screen.getAllByRole("heading");
        expect(headings.length).toBeGreaterThanOrEqual(2);
        const textboxes = screen.getAllByRole("textbox");
        expect(textboxes.length).toBeGreaterThanOrEqual(4);
        const comboboxes = screen.getAllByRole("combobox");
        expect(comboboxes.length).toBeGreaterThanOrEqual(2);
        const options = screen.getAllByRole("option");
        expect(options.length).toBeGreaterThanOrEqual(8);
        const spinbuttons = screen.getAllByRole("spinbutton");
        expect(spinbuttons.length).toBeGreaterThanOrEqual(2);
        const buttons = screen.getAllByRole("button");
        expect(buttons.length).toBeGreaterThanOrEqual(3);
    });

    it("should show error message when all the fields are not entered", async () => {
        render(<Table1 />);
        const buttonElement = screen.getByRole("button", {name: "Consultar"});
        await userEvent.click(buttonElement);
    });

    it("should not show any error message when the component is loaded", () => {
        render(<Table1 />);
        const alertElement = screen.queryByRole("alert");
        expect(alertElement).not.toBeInTheDocument();
      });
    
});