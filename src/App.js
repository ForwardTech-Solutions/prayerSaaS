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
import IndividualPrayerScreen from './PrayerScreen/IndividualPrayerScreen';
import MyPrayerScreen from './PrayerScreen/MyPrayerScreen';



//after imports
Amplify.configure(aws_exports);



function toRender() {
  return  <BrowserRouter>
              <Switch>
                
                <Route path="/prayer/:id">
                    <IndividualPrayerScreen/>
                </Route>
                
                <Route path="/prayer">
                    <MyPrayerScreen/>
                </Route>
                
                <Route path="/">
                    <Dashboard />
                </Route>

              </Switch>
          </BrowserRouter>    
}


export default withAuthenticator(toRender, false);
