import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  HashRouter,
  //Link,
  Route,
  Switch,
} from "react-router-dom";

import TopMenu from './components/TopMenu/TopMenu';
import routes from './routes';

const Home = () => <h2>Home</h2>;

class App extends Component {

  render() {
    return (
      <HashRouter basename = '/'>
        <div className="App.js">
          <TopMenu />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            {this.showContentMenus(routes)}
          </Switch>
        </div>
      </HashRouter>
    );
  }

  showContentMenus = (routes) => {
    var result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return (
          <Route 
            key = {index}
            path = {route.path}
            exact = {route.exact}
            component = {route.main}
          />
        )
      })
    }
    return result;
  }
}


export default App;
