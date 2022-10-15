/*global chrome*/
import {
        BrowserRouter as Router,
        Routes,
        Route, 
    } from 'react-router-dom';
import React from "react";
import SignupForm from "./components/authentication/SignupForm";
import SigninForm from "./components/authentication/SigninForm";
import AboutPage from "./components/About";
import HomePage from "./components/Home";
import Menu from "./Menu"

class Routing extends React.Component{

    render(){
        return(
            <Router>
                <div className="App">
                <Menu />
                    <Routes>
                        <Route exact path='/about' element={< AboutPage />} ></Route>
                        <Route exact path='/signup' element={< SignupForm />} ></Route>
                        <Route exact path='/signin' element={< SigninForm />}  ></Route>
                        <Route exact path='/home' element={< HomePage />}  ></Route>
                    </Routes>
                </div>
            </Router>           
        )
    }
}

export default Routing