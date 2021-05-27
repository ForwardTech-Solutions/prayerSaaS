import React from "react";
import {Nav, Card, Button, Row, Col} from "react-bootstrap";
import './Dashboard.css'

const Side = props => {
   
    var allGroups = [
        {groupname: 'TFBC Congregation'},
        {groupname: 'Young Adults'},
        {groupname: 'Worship Team'},

    ]
    return (
        <>

            <Nav 
                className="col-md-12 d-none d-md-block bg-dark sidebar"
                activeKey="/home"
                onSelect={selectedKey => alert(`selected ${selectedKey}`)}
            >
                    <div className="sidebar-sticky"></div>
                <Card bg='dark' style={{marginTop: 60, marginBottom: 30}}>
                    <Nav.Item>
                        <Nav.Link href="/home">Active</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link-1">Link</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link-2">Link</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="disabled" disabled>
                        Disabled
                        </Nav.Link>
                    </Nav.Item> 
                </Card>
             

                <Card
                    bg={'dark'} 
                  //  style={{position: 'relative', bottom: 0}}
                >
                    <Card.Header>
                        <Row>
                            <Col > <Card.Title>Groups</Card.Title> </Col>
                            <Col> <Button onClick={() => console.log("create New Group pressed")} style={{borderRadius: 25}}>+</Button> </Col>
                        </Row>
                    </Card.Header>
                    <Card.Body>
                    {
                        allGroups.map(group => (
                        <Row>
                            <div style={{color: returnIfExists(group.groupname, 'lightblue'), fontSize:20}}>
                                       <Button variant="dark" onClick={() => {
                                            console.log('setactive button pressed');
                                            // setCreatePrayerFormData({ ...createPrayerFormData, 'groupID': group.id})
                                        }}>                                        
                                            {group.groupname} 
                                        </Button>
                            </div>

                        </Row>
                        ))
                    }
                    </Card.Body>
                </Card>
                      
                      
            </Nav>
        </>
        );
  };

  function returnIfExists(first, backup) {
    if (first)
      return first
    else 
      return backup
  }

  
  const Sidebar = Side;
  export default Sidebar