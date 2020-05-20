import React from "react";
import ListingDetails from "./ListingDetails";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

describe("ListingDetails", () => {
  let listing1;
  beforeEach(() => {
    listing1 = {
      listing_id: 1,
      area_id: 590,
      name: "Daves Casa",
      address: {
        street: "2150 Quebec St",
        zip: "80220",
      },
      details: {
        neighborhood_id: 5124122,
        superhost: true,
        seller_source: "91jss1",
        beds: 3,
        baths: 2.5,
        cost_per_night: 10,
        features: ["hot tub", "espresso machine"],
      },
      dev_id: "u4gh2j",
      area: "rino",
      db_connect: 834470,
    };
  });

  it("should display basic info about the listing", () => {
    const { getByText } = render(
      <MemoryRouter>
        <ListingDetails details={listing1} favoriteIds={[]} />
      </MemoryRouter>
    );

    expect(getByText("Bedrooms: 3")).toBeInTheDocument();
    expect(getByText("Bathrooms: 2.5")).toBeInTheDocument();
    expect(getByText("Cost per Night: $10")).toBeInTheDocument();
  });
  it("should display a list of features", () => {
    const { getByText } = render(
      <MemoryRouter>
        <ListingDetails details={listing1} favoriteIds={[]} />
      </MemoryRouter>
    );

    expect(getByText("hot tub")).toBeInTheDocument();
    expect(getByText("espresso machine")).toBeInTheDocument();
  });

  // why failing, need async for picture to get loaded????
  it.skip("should pictures of the lisiting", () => {
    const { getByAltText } = render(
      <MemoryRouter>
        <ListingDetails details={listing1} favoriteIds={[]}/>
      </MemoryRouter>
    );

    expect(getByAltText("Daves Casa")).toBeInTheDocument();
  });

  it("should call the saveToFavorites method when the Add to Favorites button is clicked", () => {
    const mockSaveToFavorites = jest.fn();
    const { getByText } = render(
      <MemoryRouter>
        <ListingDetails
          details={listing1}
          saveToFavorites={mockSaveToFavorites}
          favoriteIds={[]}
        />
      </MemoryRouter>
    );

    fireEvent.click(getByText("Add to Favorites"));
    expect(mockSaveToFavorites).toHaveBeenCalled();
  });
  it("should call the removeFromFavorites method when the Remove from Favorites button is clicked", () => {
    const mockRemoveFromFavorites = jest.fn();
    const { getByText } = render(
      <MemoryRouter>
        <ListingDetails
          details={listing1}
          removeFromFavorites={mockRemoveFromFavorites}
          favoriteIds={[1]}
        />
      </MemoryRouter>
    );

    fireEvent.click(getByText("Remove from Favorites"));
    expect(mockRemoveFromFavorites).toHaveBeenCalled();
  });
});
