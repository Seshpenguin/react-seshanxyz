import React, {Component} from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

// Pages
import Home from "./Pages/Home";
import Posts from "./Pages/Posts";
import ViewPost from "./Pages/ViewPost";
import NotFound from "./Pages/NotFound";
import About from "./Pages/About";

// Assets
import Background from './Assets/bg.jpg';
import 'bootstrap/dist/css/bootstrap.min.css'; // Load the Bootstrap CSS

class App extends Component {
    render() {
        return (
            <Router basename={'/react'}>
                <div style={RootStyle} className={'react-root-flex'}>
                    <nav style={NavStyle}>
                        <div style={NavButtonStyle}>Seshan Ravikumar</div>
                        <Link to="/" style={NavButtonStyle}>Home</Link>
                        <Link to="/posts" style={NavButtonStyle}>Blog</Link>
                        <Link to="/about" style={NavButtonStyle}>About</Link>
                    </nav>
                    <br />
                    <div>
                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route path="/posts/:page" component={Posts} />
                            <Route path="/posts" component={Posts} />
                            <Route path="/post/:post" component={ViewPost} />
                            <Route path="/about" component={About} />
                            <Route component={NotFound} />
                        </Switch>
                    </div>
                    <br />
                    <nav style={NavStyle} className={'footer'}>
                        <div style={NavButtonStyle}>(c) 2019 Seshan Ravikumar.</div>
                        <div style={NavButtonStyle}>This website is Free Software under the GNU AGPL 3.0.</div>
                    </nav>
                </div>
            </Router>
        );
    }
}
const RootStyle= {
    height: '100%'
};
const NavStyle = {
    display: 'flex',
    backgroundImage: `url(${Background})`
};
const NavButtonStyle = {
    padding: '1em',
    color: 'white',
    borderRightStyle: 'solid'
};

export default App;
