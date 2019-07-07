import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link , Switch } from "react-router-dom";

import Login from './Login.jsx'

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

const Index = () => {
  return (<h2>Home</h2>)
}
const About = () => {
  return (
    <div>
      <h2>About</h2>
      <Link to="/">홈으로 다시 갈래</Link>
    </div>
  )
}
const Users = () => {
  return (<h2>Users</h2>)
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
      </ul>
    </nav>
  )
}

ReactDOM.render(<Root />, document.getElementById("root"))
