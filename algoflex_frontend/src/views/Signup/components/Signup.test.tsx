import '@testing-library/jest-dom'
import Signup from "./Signup";
import {render, fireEvent, screen} from "@testing-library/react";
import * as React from "react";
import {BrowserRouter} from "react-router-dom";

test.todo("Make Signup tests");

describe('Signup form test', () => {
    render(
        <BrowserRouter>
            <Signup />
        </BrowserRouter>
    );

    it("renders default state and succes submit", () => {
        const form = screen.getByTestId("signup-form");
        expect(form).toBeInTheDocument();

        const pseudo = screen.getByTestId("signup-pseudo") as HTMLInputElement;
        expect(pseudo).toBeInTheDocument();
        fireEvent.change(pseudo, {target: {value: "azerty"}});
        expect(pseudo.value).toBe("azerty");

        const email = screen.getByTestId("signup-email") as HTMLInputElement;
        expect(email).toBeInTheDocument();
        fireEvent.change(email, {target: {value: "azerty@123.fr"}});
        expect(email.value).toBe("azerty@123.fr");

        const password = screen.getByTestId("signup-password") as HTMLInputElement;
        expect(password).toBeInTheDocument();
        fireEvent.change(password, {target: {value: "azerty123"}});
        expect(password.value).toBe("azerty123");

        const confirmPassword = screen.getByTestId("signup-confirm-password") as HTMLInputElement;
        expect(confirmPassword).toBeInTheDocument();
        fireEvent.change(confirmPassword, {target: {value: "azerty123"}});
        expect(confirmPassword.value).toBe("azerty123");

        const submit = screen.getByTestId("signup-submit");
        expect(submit).toBeInTheDocument();
        expect(submit).toHaveAttribute("type", "submit");
    });
})