import logo from './logo.svg';
import './App.css';
import '../node_modules/semantic-ui-css/semantic.min.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './Pages/Login'; 
import Register from './Pages/Register';
import Workspace from './Pages/Workspace';
function App() {
    return (
        <main>
            <Switch>
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/workspace" component={Workspace} />
            </Switch>
        </main>
    )
}

export default App;
