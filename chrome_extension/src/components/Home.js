/*global chrome*/
import React from 'react';

class HomePage extends React.Component{
    render(){
        return(
            <div>
                <h1>What is Securepass project?</h1>
                <h2>This is a Software, You can trust!</h2>
                <h3>What we do: </h3>
                <ul>
                    <li>Storing your sensitive data hashed with the latest secure algorithms </li>
                    <li>Protecting your account with 3-factor authentication</li>
                    <li>Reminding you to change password every week</li>
                </ul>
                <strong>AND THIS ALL FOR FREE!</strong>
            </div>
        )
    }
}

export default HomePage;