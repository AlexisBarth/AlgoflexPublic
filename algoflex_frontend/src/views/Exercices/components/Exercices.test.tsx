import React from 'react';
import Exercices from './Exercices';
import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import pretty from "pretty";

test.todo("Make Exercices tests");
let container  = null;

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
    useParams: () => ({
      pageId: "1234"
    }),
    useRouteMatch: () => ({ url: 'http://localhost:3000/theme/1234' }),
  }));


it("Renders correctly", () => {

  act(() => {
      render(<Exercices />, container);
    });
  
    expect(container).toMatchInlineSnapshot();
});


describe('Exercices', () => {
    it('Should work !', () => {
        render(<Exercices />);
    });
});