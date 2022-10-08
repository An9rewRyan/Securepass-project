import './App.css';
import {signup} from './signup'

function App() {
  return (
    <div className="App">
      <h1>Welcome to securepass project</h1>
        <form id = "superform" onSubmit = {signup}>
            <label for="check2">Username: </label><input id="username" type="text"/>
            <label for="check2">Email: </label><input id="email" type="email"/>
            <label for="check2">Password: </label><input id="password" type="password"/>
            <input id="submitter" type="submit" value="Send" />
        </form>
    </div>
  );
}

export default App;


