import {
        BrowserRouter as Router,
        Routes,
        Route, 
        Link 
    } from 'react-router-dom';
import SignupForm from "./components/SignupForm";
import HomePage from "./components/Home";
import React from "react";

class Routing extends React.Component{
    render(){
        return(
            <Router>
                <div className="App">
                <ul className="App-header">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/signup">Signup</Link>
                </li>
                </ul>
                <Routes>
                    <Route exact path='/' element={< HomePage />}></Route>
                    <Route exact path='/signup' element={< SignupForm />}></Route>
                </Routes>
                </div>
            </Router>           
        )
    }
}

export default Routing