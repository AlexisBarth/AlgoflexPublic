import React from 'react';
import Exercices from './Exercices';
import { render, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";

test.todo("Make Exercices tests");

it("Renders correctly", () => {
    const queryByTest = render(<Exercices />);
    expect(queryByTest).toMatchSnapshot();
});

describe('Exercices', () => {
    it('Should work !', () => {
        render(<Exercices />);
    });
});