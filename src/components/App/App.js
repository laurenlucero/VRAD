import React from "react";
import "./App.css";
import SignIn from "../SignIn/SignIn";
import AreasContainer from "../AreasContainer/AreasContainer";
import ListingsContainer from "../ListingsContainer/ListingsContainer";
import Header from "../Header/Header";
import ListingDetails from "../ListingDetails/ListingDetails";
import Favorites from "../Favorites/Favorites";
import Error from '../Error/Error'
import { fetchAreasData, fetchListingsData } from "../../apiCalls/apiCalls";
import { Route, Switch, Redirect } from "react-router-dom";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: "",
      areas: [],
      listings: [],
      currentArea: "",
      currentListing: "",
      favorites: [],
    };
  }

  setUser = (newUser) => {
    this.setState({ user: newUser });
    this.fetchListings();
  };

  resetUser = () => {
    this.setState({ user: "", favorites: [] });
  };

  setCurrentArea = (area) => {
    this.setState({ currentArea: area });
  };

  setCurrentListing = (listingId) => {
    this.setState({ currentListing: listingId });
  };

  saveToFavorites = (listingId) => {
    if (!this.state.favorites.includes(listingId)) {
      this.setState({ favorites: [...this.state.favorites, listingId] });
    }
  };

  findFavoriteListings = () => {
    const allListings = [
      ...this.state.listings["590"],
      ...this.state.listings["751"],
      ...this.state.listings["408"],
      ...this.state.listings["240"],
    ];
    const favorites = [];
    this.state.favorites.forEach((favorite) => {
      const listing = allListings.find(
        (listing) => listing.listing_id === favorite
      );
      favorites.push(listing);
    });
    return favorites;
  };

  removeFromFavorites = (listingId) => {
    const newFavorites = this.state.favorites.filter(
      (favorite) => favorite !== listingId
    );
    this.setState({ favorites: newFavorites });
  };

  componentDidMount() {
    fetchAreasData()
      .then((resolvedData) => this.setState({ areas: resolvedData }))
      .catch((err) => console.error(err));
  }

  fetchListings = () => {
    fetchListingsData()
      .then((data) => {
        const listingsInArea = data.listings.reduce(
          (listingObj, listing) => {
            listingObj[listing.area_id].push(listing);
            return listingObj;
          },
          { "590": [], "751": [], "408": [], "240": [] }
        );
        this.setState({ listings: listingsInArea });
      })
      .catch((err) => console.error(err));
  };

  render() {
    return (
      <div className="App">
       <Header
          user={this.state.user}
          resetUser={this.resetUser}
          numberOfFavorites={this.state.favorites.length}
        />

      <Switch>
        <Route
            path={`/listings/${this.state.currentListing}`}
            render={() => {
              const currentListing = this.state.listings[
                this.state.currentArea
              ].find(
                (listing) => listing.listing_id === this.state.currentListing
              );
              return (
                <ListingDetails
                  details={currentListing}
                  saveToFavorites={this.saveToFavorites}
                  removeFromFavorites={this.removeFromFavorites}
                  favoriteIds={this.state.favorites}
                />
              );
            }}
          />
           <Route
            exact
            path="/areas"
            render={() => {
              return (
                <AreasContainer
                  areas={this.state.areas}
                  setCurrentArea={this.setCurrentArea}
                />
              );
            }}
        />
          <Route
          exact
          path={`/areas/${this.state.currentArea}`}
          render={() => {
            return (
              <ListingsContainer
                listings={
                  this.state.currentArea !== ""
                    ? this.state.listings[this.state.currentArea]
                    : []
                }
                setCurrentListing={this.setCurrentListing}
              />
            );
          }}
        />
        <Route
          path={"/favorites"}
          render={() => {
            return (
              <Favorites
                favorites={this.findFavoriteListings()}
                setCurrentListing={this.setCurrentListing}
              />
            );
          }}
        />
        <Route
          exact
          path="/"
          render={() => {
            return <SignIn setUser={this.setUser} />;
          }}
        />
        <Route
          path="/error"
          render={() => <Error />}
        />
        <Redirect to="/error"/>

      </Switch>
       
        
        
        


      </div>
    );
  }
}

export default App;
