import React from "react";
import "./App.css";

import SignIn from "../SignIn/SignIn";
import AreasContainer from "../AreasContainer/AreasContainer";
// import ListingsContainer from "../ListingsContainer/ListingsContainer";
// import Favorites from "../Favorites/Favorites";
import Header from "../Header/Header";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: "",
      areas: [],
    };
  }

  setUser = (newUser) => {
    this.setState({ user: newUser });
  };

  // dave thinking....maybe add the listings fetch nested under the areas in componentDidMount ? Would this be better than using componentDidUpdate to call once the area is selected like we talked about??
  // then in the render have a listings container that gets routed to. <listingsContainer path=''> ?
  // then would we store the current area here? but then you would have to also store the current listing and the favorites...is that too much? It does reduce the need for more class base components and keeps the data centralized. It also follows our wireframe. Maybe let's try it...
  // this.state will probably need: user, areas, currentArea/currentListings(in order to pass down to the listingsContainer to display the correct listings for each area), selectedListing(for all the details), favorites. maybe an allListings array...i'm thinking this would be the easiest way to fetch and then store the data...otherwise we could add a key to the areas objects that holds all the listings but that might get tricky. allListings could then be iterated over to match area_ids in order to display the correct ones for each area? 
  // BE CAREFUL NOT TO REPLICATE DATA IN this.state...we can do things like store ideas for favorites instead of storing the whole object. Then iterate over and match ids to display favorites.

  componentDidMount() {
    fetch("https://vrad-api.herokuapp.com/api/v1/areas")
      .then((response) => response.json())
      .then((areaData) => {
        const promises = areaData.areas.map((area) => {
          let url = `https://vrad-api.herokuapp.com${area.details}`;
          return fetch(url)
            .then((response) => response.json())
            .then((areaDetails) => areaDetails);
        });
        return Promise.all(promises);
      })
      .then((resolvedData) => this.setState({ areas: resolvedData }))
      .catch((err) => console.error(err));
  }

  render() {
    return (
      <div className="App">
        <Header user={this.state.user}  />
        <SignIn setUser={this.setUser} />
        <AreasContainer areas={this.state.areas} />
      </div>
    );
  }
}

export default App;
