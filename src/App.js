import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/CustomNavbar'
import ShowComponent from './components/ShowComponent';
import UnitTest from './components/UnitTest';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={ShowComponent} />
        <Route path="/unittest" component={UnitTest} />
      </Switch>
    </Router>
  );
}

export default App;
