import React from "react";
import {Card, Row, Col} from "react-bootstrap";
import { Link } from 'react-router-dom';

const PListLined = props => {
   
    return (
          <Col>
                {
                  props.prayersList.map((prayer, index) => (
                    <Row>
        

                          <Card
                            bg={"dark"} 
                            style={{ width: '40rem' }}
                            data-testid="LinedList_PrayerCard"
                          >
                            {/* <Card.Header as="h5">{prayer.prayer} (lined)</Card.Header> */}

                            <Card.Body style={{color: returnIfColor(prayer.prayergroup, 'lightblue')}}>
                              <Row>  
         
                                  {/* checkbox */}
                                  <input type="checkbox" onChange={(event) => { props.updateChecked(event, prayer.id); }} style={{margin: '10px'}} />                           

                                  <Col>
                                      <Link key={"prayer_" + index } data-testid="prayerCard" to={"/prayer/"+prayer.id} style={{ textDecoration: 'none', color: 'inherit'}}>               
                                          <h4>{prayer.prayer}</h4>
                                      </Link>
                                  </Col>

                                  <Col>
                                      <p className="smallText">by:{prayer.username}</p>
                                  </Col>
                                
                                  <Col>
                                      <p className="smallText">in:{prayer.prayergroup}</p>
                                  </Col>
                             
                              </Row>
                              
                            </Card.Body>
                          </Card>
                     
                    </Row>
                  ))
                }

          </Col>
        );
  };

  function returnIfColor(first, backup) {
    const theFirst = "" + first;
    if (theFirst.length === 6)
      return '#' + first
    else 
      return backup
  }


  
  const LinedPrayerList = PListLined;
  export default LinedPrayerList