// API Calls to the WP-JSON API

import axios from "axios";

export async function loadDataFromWP(endpoint) {
    try {
        const response = await axios.get('https://seshan.xyz/wp-json/wp/v2/' + endpoint);
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
        return false;
    }
}

// Get page contents
export async function loadPage(page) {
    let response = await loadDataFromWP('pages/' + page);
    if(!response) {
        return false;
    }

    return response.data;
}

/* ~~ Blog API Calls ~~ */
// Takes a page number (starts from zero),
// returns posts for that page, and number of pages.
export async function loadPostsList(page) {
    let response = await loadDataFromWP('posts?page=' + parseInt(page));
    if(!response) {
        return false;
    }

    let totalPages = response.headers['x-wp-totalpages'];

    return { posts: response.data, totalPages: totalPages };
}
export async function loadPost(id) {
    let response = await loadDataFromWP('posts/' + parseInt(id));
    if(!response) {
        return false;
    }
    return response.data;
}