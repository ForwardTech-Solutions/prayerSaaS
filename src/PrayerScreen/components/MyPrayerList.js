import React from "react";
import {Card, Row, Col} from "react-bootstrap";
import '../PrayerScreens.css'
import { Link } from 'react-router-dom';

const myPScreen = props => {
   
    return (
        <>

          {/* List of prayers */}
          <Row> 
            
            {/* column 3 */}
              <Col>
                <h1>{props._currentUser ? props._currentUser.username + "'s" : ""} Prayers </h1>
              </Col>
          </Row>
          <Row>
                {
                  props.prayersList.map(prayer => (
                    <Link to={"/prayer/"+prayer.id} style={{ textDecoration: 'none', color:'white'}}>

                      <Card
                        bg={"dark"} 
                        style={{ width: '18rem' }}
                      >
                        <Card.Header as="h5">{prayer.prayer}</Card.Header>

                        <Card.Body style={{color: returnIfColor(prayer.prayergroup, 'lightblue')}}>
                          <p className="smallText">by:{prayer.username}</p>
                          <p className="smallText">in:{prayer.prayergroup}</p>
                        </Card.Body>
                      </Card>
                    </Link>
                  ))
                }

                </Row>

        </>
        );
  };

  function returnIfColor(first, backup) {
    const theFirst = "" + first;
    if (theFirst.length == 6)
      return '#' + first
    else 
      return backup
  }


  
  const MyPrayerList = myPScreen;
  export default MyPrayerList