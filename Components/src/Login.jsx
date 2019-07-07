import React from 'react'
import { Redirect } from 'react-router-dom'

class Login extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      isLoggedIn : false
    }
    this.handleAuthControl = this.handleAuthControl.bind(this)
  }
  handleAuthControl(){
    if(!this.state.isLoggedIn){
      alert('로그인을 먼저 해줘')
      return (
        <Redirect to="/" />
      )
    }
  }
  render(){
    return(
      <div>
        {this.handleAuthControl()}
      </div>
    )
  }

}

export default Login