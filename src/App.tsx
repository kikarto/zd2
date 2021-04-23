import React, { useEffect } from 'react';
// import logo from './assets/logo.svg';
import './scss/main.scss';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { getRoutes, getNav } from './router';
import { PNavbar } from './styled/Navbar';
import { useDispatch } from 'react-redux';
import { IAuthor } from './interfaces/author';
import { Connect } from './libs/Connect';
import { clearAuthors, clearPublishers } from './store/actions';
import { parseAuthors } from './libs/author';
import { Model } from './const/model';
import { parsePublishers } from './libs/publisher';
import { IPublisher } from './interfaces/publisher';

const connect = new Connect();

const App: React.FC = () => {
  const routeComponents = getRoutes().map(({path, component}, key) => <Route exact path={path} component={component} key={key} />);
  const dispatch = useDispatch();

  useEffect(() => {
    async function init() {
      const responseAuthor = await connect.find<IAuthor>(Model.Author);
      if (responseAuthor) {
        dispatch(clearAuthors(parseAuthors(responseAuthor)));
      }
      const responsePublisher = await connect.find<IPublisher>(Model.Publisher);
      if (responsePublisher) {
        dispatch(clearPublishers(parsePublishers(responsePublisher)));
      }
    }
    init();
  }, []);

  return (
    <Router>
      <div className="App">
        <PNavbar>
          {getNav().map(({ path, label }, lp) => (
            <Link to={path} key={lp}>{label}</Link>
          ))}
        </PNavbar>
        <Switch>
          {routeComponents}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
