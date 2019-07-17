import React, {Component} from "react";
import { BrowserRouter as Router, Route, Link, Switch, NavLink } from "react-router-dom";
import dayjs from 'dayjs';

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
                        <NavLink to="/" exact style={NavButtonStyleLink} activeStyle={NavButtonStyleActive}>Home</NavLink>
                        <NavLink to="/posts" style={NavButtonStyleLink} activeStyle={NavButtonStyleActive}>Blog</NavLink>
                        <NavLink to="/about" style={NavButtonStyleLink} activeStyle={NavButtonStyleActive}>About</NavLink>
                    </nav>
                    <p></p>
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
                        <div style={NavButtonStyle}>&copy; {dayjs().format('YYYY')} Seshan Ravikumar.</div>
                        <div style={NavButtonStyle}>This website is Free Software under the GNU AGPL 3.0.</div>
                        <a href="https://seshan.xyz/" style={NavButtonStyleLink}>View the Regular Site.</a>
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
const NavButtonStyleLink = {
    ...NavButtonStyle,
    backgroundColor: 'rgba(255, 255, 255, 0.3)'
};
const NavButtonStyleActive = {
    ...NavButtonStyle,
    backgroundColor: 'rgba(255, 255, 255, 0.6)'
};

export default App;
