import '@testing-library/jest-dom'
import Login from "./Login";
import {render, fireEvent, screen} from "@testing-library/react";
import * as React from "react";
import {BrowserRouter} from "react-router-dom";

test.todo("Make Login tests");

describe('Login form test', () => {
    render(
        <BrowserRouter>
            <Login />
        </BrowserRouter>
    );

    it("renders default state and succes submit", () => {
        const form = screen.getByTestId("login-form");
        expect(form).toBeInTheDocument();

        const password = screen.getByTestId("login-password") as HTMLInputElement;
        expect(password).toBeInTheDocument();
        fireEvent.change(password, {target: {value: "azerty123"}});
        expect(password.value).toBe("azerty123");

        const email = screen.getByTestId("login-email") as HTMLInputElement;
        expect(email).toBeInTheDocument();
        fireEvent.change(email, {target: {value: "azerty@123.fr"}});
        expect(email.value).toBe("azerty@123.fr");

        const submit = screen.getByTestId("login-submit");
        expect(submit).toBeInTheDocument();
        expect(submit).toHaveAttribute("type", "submit");
    });
})