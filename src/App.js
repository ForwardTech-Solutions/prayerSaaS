//default
import React, { useEffect, useState } from 'react';
import './App.css';

//cognito authentication 
import { withAuthenticator  } from 'aws-amplify-react'
import Amplify, {Auth} from 'aws-amplify';
import aws_exports from './aws-exports';

//css styling
import "bootstrap/dist/css/bootstrap.min.css";
import "./dashboard/Dashboard.css"


//Body
import Dashboard from './dashboard/Dashboard';
import { BrowserRouter, Switch, Route } from 'react-router-dom';


//after imports
Amplify.configure(aws_exports);



function toRender() {
  
  console.log("Your endpoint is at: ", process.env.REACT_APP_PRAYER_REST_ENDPOINT);

  return  <BrowserRouter>
              <Dashboard />
          </BrowserRouter>    
}


export default withAuthenticator(toRender, false);
