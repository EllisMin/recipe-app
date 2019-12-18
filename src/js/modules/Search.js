// Import
import axios from "axios";



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
      this.results = result.data.recipes;
      // console.log(this.recipes); ///
    } catch (e) {
      console.log(e);
    }
  }
}
