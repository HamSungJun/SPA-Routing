import React from 'react'

class Users extends React.Component{

  componentDidMount(){
    const { location } = this.props
    console.log(location.search)
  }

  render(){
    return(
      <div>
        <h1>Users</h1>
      </div>
    )
  }

}

export default Users