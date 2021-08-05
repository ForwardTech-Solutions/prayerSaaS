import React from "react";
import {Card, Row} from "react-bootstrap";
import { Link } from 'react-router-dom';

const PList = props => {
   
    return (
          <Row>
                {
                  props.prayersList.map((prayer, index) => (
                    <Link key={"prayer_" + index } data-testid="prayerCard"
                    to={"/prayer/"+prayer.id} style={{ textDecoration: 'none', color:'white'}}>

                      <Card
                        bg={"dark"} 
                        style={{ width: '18rem' }}
                      >
                        <Card.Header as="h5">{prayer.prayer}</Card.Header>

                        <Card.Body style={{color: returnIfColor(prayer.prayergroup, 'lightblue')}}>
                          <p className="smallText">by:{prayer.username}</p>
                          <p className="smallText">in:{prayer.prayergroup ? prayer.prayergroup : ""}</p>
                          <p className="smallText">from:{prayer.source ? prayer.source : ""}</p>
                          <p className="smallText">name:{prayer.fullName ? prayer.fullName : ""}</p>

                        </Card.Body>
                      </Card>
                    </Link>
                  ))
                }

          </Row>
        );
  };

  function returnIfColor(first, backup) {
    const theFirst = "" + first;
    if (theFirst.length === 6)
      return '#' + first
    else 
      return backup
  }


  
  const PrayerList = PList;
  export default PrayerList