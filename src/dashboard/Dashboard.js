//default
import React, { useEffect, useState } from 'react';
import logo from '../logo.svg';
import './Dashboard.css';

//cognito authentication 
import {Auth} from 'aws-amplify';


import {Container, Row, Col, Button, Card, Navbar, InputGroup, FormControl } from 'react-bootstrap'

import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';



import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./sidebar.js";
import AddPrayerButton from "../PrayerScreen/components/AddPrayerButton"
import MyPrayerList from "../PrayerScreen/components/MyPrayerList"
import MyPrayerScreen from "../PrayerScreen/MyPrayerScreen"

//initials
const initialCreatePrayerFormState = {
  prayer: '',
  //description: '',
  groupID: null,
}





function Dashboard() {
  const [prayers, setPrayers] = useState([])
  const [createPrayerFormData, setCreatePrayerFormData] = useState(initialCreatePrayerFormState)
  const [currentAWSUser, setCurrentAWSUser] = useState('not-signed-in')
  const [currentUser, setCurrentUser] = useState()
  const [allGroups, setAllGroups] = useState([])
  const [focusedGroupsPrayers, setFocusedGroupsPrayers] = useState([])
  const [focusedGroup, setFocusedGroup] = useState()


  useEffect(() => {
   fetchMyPrayers();
   fetchAllGroups();
   updateAWSUser();
  }, [])


  useEffect(() => {
    fetchAGroupPrayers(focusedGroup)
  }, [focusedGroup])

  useEffect(() => {
    fetchCurrentUserByCognito(currentAWSUser)
  }, [currentAWSUser])

  async function updateAWSUser() {
    try{
      let user = await Auth.currentAuthenticatedUser();
      console.log(user.username)
      setCurrentAWSUser(user.username)
    } catch (err) {
      console.log ("error", err)
    }
  }


  function makeid(length) {
    var result           = '';
    var characters       = '0123456789ABCDEF';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

  function getGroupNameFromID (group_id) {
    if(!group_id) return 'invalidID'
    var result = allGroups.find(({ id }) => id == group_id ).groupname
    if(result != null) return result
    else return 'no result'
  }
  function getPrayerCountFromGroupID (group_id) {
    if(!group_id) return 'invalidID'
    var result = prayers.filter(({groupID}) => groupID == group_id ).length
    if(result != null) return result
    else return 'no result'
  }

  async function fetchMyPrayers() {
    console.log("here we go")
        
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      mode: "cors"
    };
    
    fetch("https://8tdq1phebd.execute-api.us-east-1.amazonaws.com/dev2/prayer", requestOptions)
      .then(response => response.text())
      .then(result => {
        const parsed = JSON.parse(result)
        setPrayers(parsed.prayers)
        console.log(JSON.parse(result))})
      .catch(error => console.log('error', error));
  
    }


  async function fetchAllGroups() {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    
    fetch("https://8tdq1phebd.execute-api.us-east-1.amazonaws.com/dev2/group", requestOptions)
      .then(response => response.text())
      .then(result => {
        const parsed = JSON.parse(result)
        setAllGroups(parsed.groups)
        console.log(JSON.parse(result))
      })
      .catch(error => console.log('error', error));

      
  }

  async function fetchCurrentUserByCognito(cognito_id) {
    var _url = "https://8tdq1phebd.execute-api.us-east-1.amazonaws.com/dev2/user/fromCognitoID/" + cognito_id

    await fetch(_url)
      .then(response => response.text())
      .then(result => {
        const parsed = JSON.parse(result)
        setCurrentUser(parsed.user[0])
        console.log("user just set: ", parsed)
      })
      .catch(error => console.log('error', error));
  }

  async function fetchAGroupPrayers(_group) {
      var _groupname = _group ? _group.groupname : ""

        if(_groupname == "") {
          setFocusedGroupsPrayers([])
          return;
        }
          

        var myHeaders = new Headers();
        //myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`)



        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow',
          mode: "cors"

        };

        var _url = "https://8tdq1phebd.execute-api.us-east-1.amazonaws.com/dev2/prayer/fromGroup/" + _groupname

        await fetch(_url, requestOptions)
          .then(response => response.text())
          .then(result => {
            const parsed = JSON.parse(result)
            setFocusedGroupsPrayers(parsed.prayers)
            console.log(parsed)
          })
          .catch(error => console.log('error', error));
  }


  async function createNewPrayer() {

    //1. populate formToSend dynamically
    var formToSend;
      //a. if no prayer, stop
      if (!createPrayerFormData.prayer) {
        console.log('createPrayerStoppedEarly');
        return;
      }
      //b. if no group, don't include group
      else if (!createPrayerFormData.groupID) {
        formToSend = {
          prayer: createPrayerFormData.prayer,
          //description: createPrayerFormData.description
        }
      }
      //c. if group, just grab createPrayerFormData
      else
        formToSend = createPrayerFormData

    //2. Do the actual API work
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      //myHeaders.append("Access-Control-Allow-Origin", "*")

      var putBody = JSON.stringify({
        "username": currentAWSUser,
        "prayer": formToSend.prayer,
        "prayergroup": formToSend.groupID ? getGroupNameFromID(formToSend.groupID) : "noGroup(null)"
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: putBody,
        redirect: 'follow'
      };

      fetch("https://8tdq1phebd.execute-api.us-east-1.amazonaws.com/dev2/prayer", requestOptions)
        .then(response => response.text())
        .then(result => {
          console.log(result)
          fetchMyPrayers()
        })
        .catch(error => console.log('error', error));
    


    //await API.graphql({ query: createPrayer, variables: { input: formToSend } });
    //3. Deal with local variables
    setPrayers([ ...prayers, createPrayerFormData ]);
    setCreatePrayerFormData(initialCreatePrayerFormState);
  }

  async function createNewGroup() {
    var randomGroup = {
      groupname: makeid(6),
    }
        

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`)

        var raw = JSON.stringify({
          "groupname": randomGroup.groupname
        });

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        fetch("https://8tdq1phebd.execute-api.us-east-1.amazonaws.com/dev2/group", requestOptions)
          .then(response => response.text())
          .then(result => {
            console.log(result)
            fetchAllGroups()
          })
          .catch(error => console.log('error', error));

    //await API.graphql({ query: createGroup, variables: { input: randomGroup } }).then(() => {fetchAllGroups()})
    // setAllGroups([ ...allGroups, randomGroup ]);
  }

  async function deletePrayerByID({ id }) {
    const newNotesArray = prayers.filter(note => note.id !== id);
    setPrayers(newNotesArray);
    //await API.graphql({ query: deletePrayer, variables: { input: { id } }});
  }

  function returnIfExists(first, backup) {
    if (first)
      return first
    else 
      return backup
  }

  function returnIfColor(first, backup) {
    const theFirst = "" + first;
    if (theFirst.length == 6)
      return '#' + first
    else 
      return backup
  }


  async function signOutAWS() {
    try {
        await Auth.signOut();
    } catch (error) {
        console.log('error signing out: ', error);
    }
  }




  return (
    <>
      <Navbar bg="dark" variant="dark" className="navbar" fixed="top" >
        <Navbar.Brand>
        <img src={logo} className="App-logo" alt="logo" />
          PrayerSaaS
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Button className="justify-content-end" style={{}} variant="warning" onClick={signOutAWS}>Sign out {currentUser ? currentUser.username: ""}</Button>
        </Navbar.Collapse>

      </Navbar>

      <Container 
        fluid
        className="App-header"
      >
        <Row>

          {/* Dashboard Sidebar */}
          <Col xs={2} id="sidebar-wrapper">      
            <Sidebar >

                <Card bg='dark' style={{marginTop: 60, marginBottom: 30}}>
                        <NavLink to="/">
                            Home
                        </NavLink>
                        <NavLink to="/prayer">
                            myPrayers
                        </NavLink>
                        <NavLink to="/prayer/asdf">
                            prayer: asdf
                        </NavLink>
                     
                        
                </Card>

                <Card
                        bg={'dark'} 
                    //  style={{position: 'relative', bottom: 0}}
                    >
                        <Card.Header>
                            <Row>
                                <Col > <Card.Title>Groups</Card.Title> </Col>
                                <Col> <Button onClick={() => createNewGroup()} style={{borderRadius: 25}}>+</Button> </Col>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                        {
                            allGroups.map(group => (
                            <Row>
                                <div style={{color: returnIfColor(group.groupname, 'lightblue'), fontSize:20}}>
                                        <Button variant="dark" onClick={() => {
                                                console.log('setactive button pressed');
                                                setCreatePrayerFormData({ ...createPrayerFormData, 'groupID': group.id})
                                                setFocusedGroup(group)
                                            }}>                                        
                                                {group.groupname} 
                                            </Button>
                                </div>

                            </Row>
                            ))
                        }
                        </Card.Body>
                </Card>
              
            </Sidebar>
          </Col>

          {/* Rest of the Dashboard */}
          <Col  xs={10} id="page-content-wrapper">


          <MyPrayerScreen
                AWSUser = {currentAWSUser}
                Groups = {allGroups}
                User = {currentUser}
                _focusedGroup = {focusedGroup}
          />


          </Col> 
        </Row>


          {/* 
            <Row>
                  {
                      focusedGroupsPrayers.map(prayer => (
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
                    ))
                  }

            </Row> */}
 


      </Container>
          
     </>
  );

}

export default Dashboard;