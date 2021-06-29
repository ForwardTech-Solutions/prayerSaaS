//default
import React  from 'react';
import './App.css';

//cognito authentication 
import { withAuthenticator } from 'aws-amplify-react'
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';

//css styling
import "bootstrap/dist/css/bootstrap.min.css";
import "./dashboard/Dashboard.css"


//Body
import Dashboard from './dashboard/Dashboard';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import EmailSignupScreen from './emailFlow/emailSignup'


//after imports
Amplify.configure(aws_exports);


function toRender() {
  
  //console.log("Your endpoint is at: ", process.env.REACT_APP_PRAYER_REST_ENDPOINT);

  return  <BrowserRouter>
            <Switch>
              <Route exact path="/email-signup" component={EmailSignupScreen}/>
              <Route exact path="/email-unsubscribe" component={EmailSignupScreen}/>
              <Route path="/">
                  <Dashboard/>
              </Route>
            </Switch>
          </BrowserRouter>    
}





export default toRender
