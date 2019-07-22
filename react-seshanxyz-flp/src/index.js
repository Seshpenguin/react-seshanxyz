import express from 'express';
import React from 'react';
import ReactDOMServer  from 'react-dom/server';

import HomeScreen from './HomeScreen';

let app = express();

async function getData() {

}

app.get('/', async (request, response) => {
    let html = ReactDOMServer.renderToStaticMarkup(<HomeScreen data={Math.floor(Math.random() * 10)} />);
    response.send(html);
});

let PORT = 3000;
app.listen(PORT, () => {
    console.log('http://localhost:' + PORT);
});
