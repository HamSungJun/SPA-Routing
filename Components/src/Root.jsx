import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link , Switch } from "react-router-dom";

import Login from './Login.jsx'
import About from './About.jsx'
import Users from './Users.jsx'
import Index from './Index.jsx'

class Root extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Navigator />
          <Switch>
            <Route exact path="/" component={Index} />
            <Route path="/about" component={About} />
            <Route path="/users" component={Users} />
            <Route path="/login" component={Login} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    )
  }
}

const NotFound = () => {
  return (<h2>NotFound</h2>)
}
const Navigator = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
          
        </li>
        <li>
          <Link to="/about">About</Link>
          
        </li>
        <li>
          <Link to="/users">Users</Link>
          
        </li>
        <li>
          <Link to="/login">Login</Link>

        </li>
      </ul>
    </nav>
  )
}

ReactDOM.render(<Root />, document.getElementById("root"))
