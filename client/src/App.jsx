import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  BrowserRouter
} from 'react-router-dom';

import Search from './pages/search/search';

const App = () => {
  return (
    <BrowserRouter>
      <div className='App'>
        <main className="main__container">
          <Switch>
            <Route exact path='/' component={Search} />
          </Switch>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
