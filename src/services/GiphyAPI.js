import { ajax } from 'rxjs/observable/dom/ajax';
import query from 'query-string';

const BASE_URL = 'http://api.giphy.com/v1/gifs';
const API_KEY = 'JokfEsQ6phaio2LlwNgGHhpBr47QE89e';

const GET_RANDOM_URL = `${BASE_URL}/random`;

export const API = {

  getRandom: () => {
    const params = query.stringify({
      api_key: API_KEY
    });
    return ajax({
      url: `${GET_RANDOM_URL}?${params}`,
      crossDomain: true,
      createXHR: function () {
        return new XMLHttpRequest();
      }
    }).map(response => response.response.data);
  }

};

export default API;
