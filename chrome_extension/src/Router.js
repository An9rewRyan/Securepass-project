import {
        BrowserRouter as Router,
        Routes,
        Route, 
        Link,
        // useLocation,
        // RouteMatch
    } from 'react-router-dom';
import SignupForm from "./components/SignupForm";
import AboutPage from "./components/About";
import HomePage from "./components/Home";
import React from "react";

class Routing extends React.Component{
    constructor(props) {
        super(props);
    }
    render(){
        
        return(
            <Router>
                <ul>
                    <li>
                        <Link to="/signup">Signup</Link>
                    </li>
                </ul>
                <div className="App">
                    <Routes>
                        <Route exact path='/about' element={< AboutPage />}></Route>
                        <Route exact path='/signup' element={< SignupForm />}></Route>
                        <Route exact path='/home' element={< HomePage />}></Route>
                    </Routes>
                </div>
            </Router>           
        )
    }
}

export default Routing