import axios from "axios";

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    try {
      const result = await axios(
        `https://forkify-api.herokuapp.com/api/get?rId=${this.id}`
      );
      const data = result.data.recipe;

      this.title = data.title;
      this.author = data.publisher;
      this.authorUrl = data.publisher_url;
      this.imgUrl = data.image_url;
      this.srcUrl = data.source_url;
      this.ingredients = data.ingredients;
      // console.log(result); ///
    } catch (e) {
      console.log(e);
      alert("Something went wrong");
    }
  }

  // Get estimate time for cooking based on number of ingredients
  calcTime() {
    const numIng = this.ingredients.length;
    const periods = Math.ceil(numIng / 3);
    this.time = periods * 15;
  }

  calcServing() {
    this.servings = 4; ///
  }

  parseIngredients() {
    const unitsLong = [
      "tablespoons",
      "tablespoon",
      "ounces",
      "ounce",
      "teaspoons",
      "teaspoon",
      "cups",
      "pounds"
    ];
    const unitsShort = [
      "tbsp",
      "tbsp",
      "oz",
      "oz",
      "tsp",
      "tsp",
      "cup",
      "pound"
    ];
    const units = [...unitsShort, "kg", "g"];

    const newIngred = this.ingredients.map(e => {
      // uniform units
      let ingred = e.toLowerCase();
      unitsLong.forEach((unit, i) => {
        ingred = ingred.replace(unit, unitsShort[i]);
      });

      // remove parentheses
      ingred = ingred.replace(/ *\([^)]*\) */g, " ");

      // parse ingredients into count, unit, and ingredient
      const arrIng = ingred.split(" ");
      const unitIndex = arrIng.findIndex(e2 => units.includes(e2));
      let objIng;

      if (unitIndex > -1) {
        // unit exists; Ex: 4 1/2 cups: arrCount: [4, 1/2] --> eval("4+1/2") --> 4.5
        const arrCount = arrIng.slice(0, unitIndex);
        let count;
        if (arrCount.length === 1) {
          count = eval(arrIng[0].replace("-", "+"));
        } else {
          count = eval(arrIng.slice(0, unitIndex).join("+"));
        }
        objIng = {
          count: Math.round(count * 100) / 100,
          unit: arrIng[unitIndex],
          ingred: arrIng.slice(unitIndex + 1).join(" ")
        };
      } else if (parseInt(arrIng[0], 10)) {
        // no unit but 1st element is number
        objIng = {
          count: parseInt(arrIng[0], 10),
          unit: "",
          ingred: arrIng.slice(1).join(" ")
        };
      } else if (unitIndex === -1) {
        // no unit no num in 1st element
        objIng = {
          count: 1,
          unit: "",
          //   ingred: ingred
          ingred // ^
        };
      }
      return objIng;
    });
    this.ingredients = newIngred;
  }

  updateServings(type) {
    const newServings = type === "dec" ? this.servings - 1 : this.servings + 1;

    this.ingredients.forEach(e => {
      e.count = e.count * (newServings / this.servings);
    });
    this.servings = newServings;
  }
}
