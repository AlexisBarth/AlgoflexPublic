import ForgetPassword from './ForgetPassword'
import '@testing-library/jest-dom'
import {render, fireEvent, screen} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import * as React from "react";


test.todo("Make ForgetPassword tests");

describe('ForgetPassword form test', () => {
    render(
        <BrowserRouter>
            <ForgetPassword />
        </BrowserRouter>
    );

    it("renders default state and succes submit", () => {
        const form = screen.getByTestId("forget-form");
        expect(form).toBeInTheDocument();

        const email = screen.getByTestId("forget-email") as HTMLInputElement;
        expect(email).toBeInTheDocument();
        fireEvent.change(email, {target: {value: "azerty@123.fr"}});
        expect(email.value).toBe("azerty@123.fr");

        const submit = screen.getByTestId("forget-submit");
        expect(submit).toBeInTheDocument();
        expect(submit).toHaveAttribute("type", "submit");
    });
})