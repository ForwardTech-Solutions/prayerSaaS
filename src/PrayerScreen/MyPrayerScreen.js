import React from "react";
import {Nav, Card, Button, Row, Col} from "react-bootstrap";
import './PrayerScreens.css'

const myPScreen = props => {
   

    return (
        <>
            <h1>{props.prayer ? props.prayer.title : "myPrayerScreen"}</h1>
        </>
        );
  };

  function returnIfExists(first, backup) {
    if (first)
      return first
    else 
      return backup
  }

  
  const MyPrayerScreen = myPScreen;
  export default MyPrayerScreen