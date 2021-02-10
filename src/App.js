import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { withAuthenticator } from 'aws-amplify-react'
import Amplify, { Auth } from 'aws-amplify';
import aws_exports from './aws-exports';
Amplify.configure(aws_exports);



class App extends Component {

  state = {}

  async componentDidMount() {
    this.renderUser();
  }

  renderUser = async() => {
    try{
      let user = await Auth.currentAuthenticatedUser();
      console.log(user.username)
      this.setState( {User: user.username})
    } catch (err) {
      console.log ("error", err)
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h3>get gud {this.state.User}</h3>
        </header> 
      </div>
    );
  }
}

export default withAuthenticator(App, true);
