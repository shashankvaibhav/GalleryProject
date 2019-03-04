/**
 * All the public apis calls would be written here.
 * Each api call have different way of handling so we will maintain each call in different method
 * 
 */

// Api constants
import {
    PIXABAY_FETCH_IMAGE
} from '../constants/api.constant'

// Other imports
import GLOBAL from '../GLOBAL'
import Http from '../utils/http.utils'

export function getPhotosFromPixabay(query, page) {
    if(!GLOBAL.INTERNET_AVAILABLE){
        return { error_code : -1}
    }

    return Http.communicate({
        url: GLOBAL.BASE_URL + PIXABAY_FETCH_IMAGE
            + '?key=' + GLOBAL.PIXABAY_KEY
            + '&q=' + query
            + '&image_type=photo'
            + '&page=' + page
            + '&per_page=50'
    });
}