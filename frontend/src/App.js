import logo from './logo.svg';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import About from "./Components/About"
function App() {
    return (
        <main>
            <Switch>
                <Route path="/about" component={About} />
            </Switch>
        </main>
    )
}

export default App;
