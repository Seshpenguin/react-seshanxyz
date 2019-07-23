import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import { LoadAllDataFromWPCached } from './API/API';
import cheerio from 'cheerio';

// Load cached data...
let WPData = new LoadAllDataFromWPCached();

import App from './App';

let app = express();

app.get('/*', async (req, res) => {
    let data = await WPData.load();
    console.log('Done loading data!');
    if(!data) {
        res.status(500).send('Error 500 - Internal Error Querying Data. Is the server still loading?');
        return;
    }

    let context = {WPData: data, isNotFound: false};
    let html = ReactDOMServer.renderToStaticMarkup(
        <StaticRouter location={req.url} context={context}>
            <App data={data} />
        </StaticRouter>
    );

    if(context.isNotFound) {
        res.status(404).send(html);
        return;
    }

    // Do some final modifications to cleanup the HTML
    html.replace("'",'"');
    html.replace(/[^/\"_+-?![]{}()=*.|a-zA-Z 0-9]+/g,'');
    let $ = cheerio.load(html);
    $('script').remove();
    $('style').remove();

    res.send($.root().html());
    res.end();
});

let PORT = 3000;
app.listen(PORT, () => {
    console.log('RSXYZFLP is running on http://localhost:' + PORT);
});
