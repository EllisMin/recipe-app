// Import
import axios from "axios";

// Global state of app
//  - Search object
//  - Current recipe object
//  - Shopping list object
//  - Liked recipes
const state = {
    
};


export default class Search {
  constructor(query) {
    this.query = query;
  }

  // Fetch data
  async getRes() {
    try {
      // HTTP Request to get JSON
      const result = await axios(
        `https://forkify-api.herokuapp.com/api/search?q=${this.query}`
      );
      this.recipes = result.data.recipes;
      // console.log(this.recipes); ///
    } catch (e) {
      console.log(e);
    }
  }
}
