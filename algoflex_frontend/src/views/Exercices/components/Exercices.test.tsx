import React from 'react';
import Exercices from './Exercices';
import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";

test.todo("Make Exercices tests");

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
    useParams: () => ({
      pageId: "1234"
    }),
    useRouteMatch: () => ({ url: 'http://localhost:3000/theme/1234' }),
  }));


it("Renders correctly", () => {

  let container = null;
  act(() => {
      container = render(<Exercices />);
    });
    expect(container).toMatchInlineSnapshot(`
Object {
  "asFragment": [Function],
  "baseElement": <body>
    <div>
      <div
        class="MuiGrid-root MuiGrid-container css-1hbmzt3-MuiGrid-root"
      >
        <div
          class="MuiGrid-root css-vj1n65-MuiGrid-root"
        />
        <div
          class="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-8 css-vl5ofk-MuiGrid-root"
        >
          <div
            class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiTableContainer-root css-11xur9t-MuiPaper-root-MuiTableContainer-root"
          >
            <table
              aria-label="collapsible table"
              class="MuiTable-root css-rqglhn-MuiTable-root"
            >
              <thead
                class="MuiTableHead-root css-15wwp11-MuiTableHead-root"
              >
                <tr
                  class="MuiTableRow-root MuiTableRow-head css-1q1u3t4-MuiTableRow-root"
                >
                  <th
                    class="MuiTableCell-root MuiTableCell-head MuiTableCell-sizeMedium css-1ygcj2i-MuiTableCell-root"
                    scope="col"
                  />
                  <th
                    class="MuiTableCell-root MuiTableCell-head MuiTableCell-alignCenter MuiTableCell-sizeMedium css-1ndpvdd-MuiTableCell-root"
                    scope="col"
                  >
                    <div
                      class="MuiTypography-root MuiTypography-h6 MuiTypography-gutterBottom css-18k87ye-MuiTypography-root"
                    >
                      Liste d'exercices
                    </div>
                  </th>
                </tr>
              </thead>
              <th
                class="MuiTableBody-root css-apqrd9-MuiTableBody-root"
                role="rowgroup"
              />
            </table>
          </div>
        </div>
      </div>
    </div>
  </body>,
  "container": <div>
    <div
      class="MuiGrid-root MuiGrid-container css-1hbmzt3-MuiGrid-root"
    >
      <div
        class="MuiGrid-root css-vj1n65-MuiGrid-root"
      />
      <div
        class="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-8 css-vl5ofk-MuiGrid-root"
      >
        <div
          class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiTableContainer-root css-11xur9t-MuiPaper-root-MuiTableContainer-root"
        >
          <table
            aria-label="collapsible table"
            class="MuiTable-root css-rqglhn-MuiTable-root"
          >
            <thead
              class="MuiTableHead-root css-15wwp11-MuiTableHead-root"
            >
              <tr
                class="MuiTableRow-root MuiTableRow-head css-1q1u3t4-MuiTableRow-root"
              >
                <th
                  class="MuiTableCell-root MuiTableCell-head MuiTableCell-sizeMedium css-1ygcj2i-MuiTableCell-root"
                  scope="col"
                />
                <th
                  class="MuiTableCell-root MuiTableCell-head MuiTableCell-alignCenter MuiTableCell-sizeMedium css-1ndpvdd-MuiTableCell-root"
                  scope="col"
                >
                  <div
                    class="MuiTypography-root MuiTypography-h6 MuiTypography-gutterBottom css-18k87ye-MuiTypography-root"
                  >
                    Liste d'exercices
                  </div>
                </th>
              </tr>
            </thead>
            <th
              class="MuiTableBody-root css-apqrd9-MuiTableBody-root"
              role="rowgroup"
            />
          </table>
        </div>
      </div>
    </div>
  </div>,
  "debug": [Function],
  "findAllByAltText": [Function],
  "findAllByDisplayValue": [Function],
  "findAllByLabelText": [Function],
  "findAllByPlaceholderText": [Function],
  "findAllByRole": [Function],
  "findAllByTestId": [Function],
  "findAllByText": [Function],
  "findAllByTitle": [Function],
  "findByAltText": [Function],
  "findByDisplayValue": [Function],
  "findByLabelText": [Function],
  "findByPlaceholderText": [Function],
  "findByRole": [Function],
  "findByTestId": [Function],
  "findByText": [Function],
  "findByTitle": [Function],
  "getAllByAltText": [Function],
  "getAllByDisplayValue": [Function],
  "getAllByLabelText": [Function],
  "getAllByPlaceholderText": [Function],
  "getAllByRole": [Function],
  "getAllByTestId": [Function],
  "getAllByText": [Function],
  "getAllByTitle": [Function],
  "getByAltText": [Function],
  "getByDisplayValue": [Function],
  "getByLabelText": [Function],
  "getByPlaceholderText": [Function],
  "getByRole": [Function],
  "getByTestId": [Function],
  "getByText": [Function],
  "getByTitle": [Function],
  "queryAllByAltText": [Function],
  "queryAllByDisplayValue": [Function],
  "queryAllByLabelText": [Function],
  "queryAllByPlaceholderText": [Function],
  "queryAllByRole": [Function],
  "queryAllByTestId": [Function],
  "queryAllByText": [Function],
  "queryAllByTitle": [Function],
  "queryByAltText": [Function],
  "queryByDisplayValue": [Function],
  "queryByLabelText": [Function],
  "queryByPlaceholderText": [Function],
  "queryByRole": [Function],
  "queryByTestId": [Function],
  "queryByText": [Function],
  "queryByTitle": [Function],
  "rerender": [Function],
  "unmount": [Function],
}
`);
});


describe('Exercices', () => {
    it('Should work !', () => {
        render(<Exercices />);
    });
});