import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';

// Screens
import HTMLRoot from './Pages/HTMLRoot';
import HomeScreen from './Pages/HomeScreen';
import EspiContact from './Pages/EspiDev/EspiContact';
import EspiHome from './Pages/EspiDev/EspiHome'
import NotFound from "./Pages/NotFound";
import {BlogList, ViewPost} from "./Pages/Blog";

class Test extends Component {
    render() {
        return (
          <p>This is a test route.</p>
        );
    }
}

export default class App extends Component {
    render() {
        return(
            <HTMLRoot title={'Home'}>
                <h1>RSXYZ-FLP</h1>
                <h2>Seshan.XYZ</h2>
                <ul>
                    <li><a href={'/'}>Home</a></li>
                    <li><a href={'/blog'}>Blog</a></li>
                </ul>
                <h2>Espi.Dev</h2>
                <ul>
                    <li><a href={'/espi/'}>Home</a></li>
                    <li><a href={'/espi/contact'}>Contact</a></li>
                </ul>

                <hr />

                <Switch>
                    <Route exact path="/" component={HomeScreen} />
                    <Route exact path="/blog" component={BlogList} />
                    <Route path="/blog/:id" component={ViewPost} />
                    <Route exact path="/espi" component={EspiHome} />
                    <Route path="/espi/contact" component={EspiContact} />
                    <Route component={NotFound} />
                </Switch>
                <hr />
                <p>This is React Seshan.XYZ - Fundamentals for Legacy PCs.</p>
                <p>Running React {React.version}</p>
            </HTMLRoot>
        );
    }
}
