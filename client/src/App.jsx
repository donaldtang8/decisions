import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  BrowserRouter
} from 'react-router-dom';

import Header from './components/header/header';

import Search from './pages/search/search';
import SearchFilters from './pages/search/search-filter';
import SearchResult from './pages/search/search-result';
import Results from './pages/results/results';

const App = () => {
  return (
    <BrowserRouter>
      <div className='App'>
        <Header />
        <main className="main__container">
          <Switch>
            <Route exact path='/results' component={Results} />
            <Route exact path='/result' component={SearchResult} />
            <Route exact path='/search' component={SearchFilters} />
            <Route exact path='/' component={Search} />
          </Switch>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
