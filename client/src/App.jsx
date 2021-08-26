import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  BrowserRouter
} from 'react-router-dom';

import Header from './components/header/header';

import Search from './pages/search/search';
import Results from './pages/results/results';

import MapTest from './components/maps/map-test';

const App = () => {
  return (
    <BrowserRouter>
      <div className='App'>
        <Header />
        <main className="main__container">
          <Switch>
            <Route exact path='/map' component={MapTest} />
            <Route exact path='/results/:location/:term' component={Results} />
            <Route exact path='/results/:location/:term/:categories' component={Results} />
            <Route exact path='/results/:location/:term/:categories/:prices' component={Results} />
            <Route exact path='/' component={Search} />
          </Switch>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
