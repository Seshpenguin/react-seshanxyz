// Parses EspiDev's espi.dev website.
import axios from "axios";
import cheerio from 'cheerio';

export async function espiGetContactPage() {
    const page = await axios.get('https://espi.dev/contact');
    const $ = cheerio.load(page.data);
    return $('div.container').html();
}

export async function espiGetHomePage() {
    let page = await axios.get('https://espi.dev/');
    let $ = cheerio.load(page.data);
    let homeSlogan = $('h3').text();

    page = await axios.get('https://espi.dev/about');
    $ = cheerio.load(page.data);
    let aboutContent = $('div.container').html();

    return {homeSlogan, aboutContent};
}
