// Global App controller
// Imports
import '../scss/main.scss';
import Search from './modules/Search';

const search = new Search('pizza');

console.log(search);
search.getRes();
