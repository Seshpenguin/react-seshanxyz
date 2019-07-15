import React, {Component} from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

// Pages
import Home from "./Pages/Home";
import Posts from "./Pages/Posts";

// Assets
import Background from './Assets/bg.jpg';
import 'bootstrap/dist/css/bootstrap.min.css'; // Load the Bootstrap CSS

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <Router>
                    <div style={RootStyle}>
                        <nav style={NavStyle}>
                            <div style={NavButtonStyle}>Seshan Ravikumar</div>
                            <Link to="/" style={NavButtonStyle}>Home</Link>
                            <Link to="/posts/" style={NavButtonStyle}>Posts</Link>
                        </nav>
                        <br />
                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route path="/posts/" component={Posts} />
                        </Switch>
                        <br />
                        <nav style={NavStyle}>
                            <div style={NavButtonStyle}>(c) 2019 Seshan Ravikumar.</div>
                            <div style={NavButtonStyle}>This website is Free Software under the GNU AGPL 3.0.</div>
                        </nav>
                    </div>
                </Router>
            </React.Fragment>
        );
    }
}
const RootStyle= {
    height: '100%',
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
