import React,  { useEffect, useState } from "react";
import {Container, Row, Col, Button, Card, Navbar, InputGroup, FormControl} from "react-bootstrap";
import './PrayerScreens.css'

import AddPrayerButton from "../PrayerScreen/components/AddPrayerButton"
import MyPrayerList from "../PrayerScreen/components/MyPrayerList"


//info given: aws, groups
    // props:   AWSUser = {currentAWSUser}
        //      Groups = {allGroups}
        //      User = {currentUser}

//initials
const initialCreatePrayerFormState = {
    prayer: '',
    //description: '',
    groupID: null,
  }
  

  
function MyPrayerScreen(props) {

    const [prayers, setPrayers] = useState([])

    const [createPrayerFormData, setCreatePrayerFormData] = useState(initialCreatePrayerFormState)


   
    useEffect(() => {
        fetchMyPrayers();
    }, []);

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


    
  async function createNewPrayer() {

    //1. populate formToSend dynamically
    var formToSend;
      //a. if no prayer, stop
      if (!createPrayerFormData.prayer) {
        console.log('createPrayerStoppedEarly');
        return;
      }
      //b. if no group, don't include group
      else if (!props._focusedGroup) {
        formToSend = {
          prayer: createPrayerFormData.prayer,
          //description: createPrayerFormData.description
        }
      }
      //c. if group, just grab createPrayerFormData
      else {
        formToSend = createPrayerFormData
        formToSend = {...formToSend, 'groupID': props._focusedGroup.groupname}
      }
        

    //2. Do the actual API work
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      //myHeaders.append("Access-Control-Allow-Origin", "*")

      var putBody = JSON.stringify({
        "username": props.AWSUser,
        "prayer": formToSend.prayer,
        "prayergroup": formToSend.groupID ? formToSend.groupID : "noGroup(null)"
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: putBody,
        redirect: 'follow'
      };

      console.log("sending POST request to: ", process.env.REACT_APP_PRAYER_REST_ENDPOINT)

      fetch(process.env.REACT_APP_PRAYER_REST_ENDPOINT + "/prayer", requestOptions)
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





  function getGroupNameFromID (group_id) {
    if(!group_id) return 'invalidID'
    var result = props.Groups.find(({ id }) => id == group_id ).groupname
    if(result != null) return result
    else return 'no result'
  }



    return (
        <>
            
            {/* Add Prayer short skinny bar */}
            <Row className="justify-content-md-center">
              <Col md="auto">
                  <AddPrayerButton 
                    InputValue={createPrayerFormData.prayer}
                    onChangeFunction={e => setCreatePrayerFormData({prayer: e.target.value, groupID: createPrayerFormData.groupID})}
                    onClickFunction={createNewPrayer}
                    inGroupName =  {props._focusedGroup != null ? " in " + props._focusedGroup.groupname : ''}
                  />

              </Col>
            </Row>
            



          {/* List of prayers */}
            <MyPrayerList 
              _currentUser={props.User}
              prayersList={prayers ? prayers : []}
            />





            

          
            {/* Focused Group */}
          
            <Row> 
                <Col>
                  <h1>{props._focusedGroup ? props._focusedGroup.groupname : ''} </h1>
                </Col>
            </Row>
        


        </>
        );




  };

  
  export default MyPrayerScreen












  
  function returnIfExists(first, backup) {
    if (first)
      return first
    else 
      return backup
  }

  