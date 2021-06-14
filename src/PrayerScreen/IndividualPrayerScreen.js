import React from "react";
import {Nav, Card, Button, Row, Col} from "react-bootstrap";
import './PrayerScreens.css'

const individualPrayerScreen = props => {
   

    return (
        <>
            <h1>{props.prayer ? props.prayer.title : "invalid prayer"}</h1>
        </>
        );
  };

  function returnIfExists(first, backup) {
    if (first)
      return first
    else 
      return backup
  }

  
  const IndividualPrayerScreen = individualPrayerScreen;
  export default IndividualPrayerScreen