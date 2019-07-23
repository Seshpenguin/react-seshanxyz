import axios from "axios";
import cheerio from 'cheerio';
import {espiGetContactPage, espiGetHomePage} from "./EspiAPI";

export async function loadDataFromWP(endpoint) {
    try {
        return await axios.get('https://seshan.xyz/wp-json/wp/v2/' + endpoint);
    } catch (error) {
        console.error(error);
        throw false;
    }
}

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

// This function pulls in all the data the site needs. (And let's React take whatever it needs)
// This is kind of slow, but because it's running server-side on
// the same host, it's not that bad.
// The problem is we can't do anything async in React (because of how ReactDOMServer is implemented).
// So, we *have* to pull everything before in the Express context, and pass it to React.
// Also this should probably should be cached.
export async function loadAllDataFromWP() {
    console.log('Loading WP Data!');
    let dataObj = {
        homeContent: '',
        postsList: [],
        posts: [],
        espi: {
            home: {},
            contact: {}
        }
    };
    try {
        // Load the Homepage content.
        let homeContent = await loadDataFromWP('pages/2');
        let $ = cheerio.load(homeContent.data.content.rendered, {
            xmlMode: true
        });
        $('script').remove();
        dataObj.homeContent = $.html();
        console.log('Loaded Home Content...');
        // Load all posts from pages: (Post List)
        let initPage = await loadPostsList(1);
        console.log('Loaded first blog page...');
        let totalPages = initPage.totalPages;
        for(let i = 0; i < initPage.posts.length; i++) {
            dataObj.postsList.push(initPage.posts[i]);
        }
        // Load the rest of the posts.
        for(let i = 2; i <= totalPages; i++) {
            let page = await loadPostsList(i);
            console.log('Loaded Blog Page ' + i + '...');
            for(let i = 0; i < page.posts.length; i++) {
                dataObj.postsList.push(page.posts[i]);
            }
        }

        /*
        // Load all Posts
        for(let i = 0; i < dataObj.postsList.length; i++) {
            try{
                dataObj.posts.push(await loadPost(dataObj.postsList[i].id));
            } catch (e) {
                console.log(JSON.stringify(dataObj.postsList[i]));
                console.log(e);
            }

            console.log('Loaded Post '+ i + '...');
        }*/

        // Espi.Dev Data:
        console.log('Loading Espi.dev...');
        dataObj.espi.contact = await espiGetContactPage();
        dataObj.espi.home = await espiGetHomePage();
        console.log('Espi.dev loaded...')

    } catch (error) {
        console.error(error);
        return false;
    }

    return dataObj;
}

/* Cache! */
// Loads all the data from WordPress, but after a certain number of reqs,
// it refreshes the cached data. This way there is always data to serve, and
// users don't need to wait for data to load.
export class LoadAllDataFromWPCached {
    constructor() {
        this.freshenCache().then(() => {
            console.log('Fresh Data initially loaded.');
            this.isRefreshingData = false;
        });
        this.isRefreshingData = true;
    }

    cacheFreshness = 1;
    cachedData = false;

    isRefreshingData = false;

    async freshenCache() {
        if(!this.isRefreshingData) {
            this.isRefreshingData = true;
            this.cachedData = await loadAllDataFromWP();
            this.isRefreshingData = false;
            return true;
        } else {
            return false;
        }
    }

    async load() {
        if(this.cacheFreshness === 0) {
            console.log('Serving cached data, but fetching fresh data...');
            this.cacheFreshness++;
            this.freshenCache().then((status) => {
                if(status) {
                    console.log('Cache is fresh now!');
                } else {
                    console.log('Refreshing is in progress...');
                }
            });
            return this.cachedData;
        }
        if(this.cacheFreshness === 5) { // Number of requests before refreshing cache.
            console.log('Serving cached data... (resetting freshness) ');
            this.cacheFreshness = 0;
            return this.cachedData;
        }
        console.log('Serving cached data...');
        this.cacheFreshness++;
        return this.cachedData;

    }
}

