import React from "react";
import { MemoryRouter as Router } from "react-router-dom";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Error from "./Error";


describe('Error', () => {
    it('should display an error message', () => {
        const { getByText } = render(
            <Router>
                <Error />
            </Router>
        )

        expect(getByText('Error 404')).toBeInTheDocument()
    })
})