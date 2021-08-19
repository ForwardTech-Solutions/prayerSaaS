import React,  { useEffect, useState } from "react";
import {Row, Col} from "react-bootstrap";
import './PrayerScreens.css'

import {Auth} from 'aws-amplify';

import AddPrayerButton from "./components/AddPrayerButton/AddPrayerButton"
import MyPrayerList from "../common/PrayerList/PrayerList"
import LinedPrayerList from  "../common/PrayerList/LinedPrayerList"


//info given: aws, groups
    // props:   AWSUser = {currentAWSUser}
        //      Groups = {allGroups}
        //      User = {currentUser}

//initials
const initialCreatePrayerFormState = {
    prayer: '',
    //description: '',
    groupname: null,
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
        
        fetch(process.env.REACT_APP_PRAYER_REST_ENDPOINT + "/prayer/", requestOptions)
            .then(response => response.text())
            .then(result => {
              const parsed = JSON.parse(result)
              setPrayers(parsed.prayers)
              console.log("MyPrayerScreen GET /prayer result: ")
              console.log(parsed.prayers)
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
      else if (!props._focusedGroup) {
        formToSend = {
          content: createPrayerFormData.prayer,
          //description: createPrayerFormData.description
        }
      }
      //c. if group, just grab createPrayerFormData
      else {
        formToSend = createPrayerFormData
        formToSend = {...formToSend, 'groupname': props._focusedGroup.groupname, 'groupid': props._focusedGroup.id, content: createPrayerFormData.prayer}
      }
        

    //2. Do the actual API work
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`)


      var putBody = JSON.stringify({
        "username": props.AWSUser,
        "content": formToSend.content,
        "prayergroup": formToSend.groupname ? formToSend.groupname : "",
        "prayerGroupId": formToSend.groupid ? formToSend.groupid : "",
        "source": "MyPrayerScreen",
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: putBody,
        redirect: 'follow',
        mode: "cors"
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




    return (
        <>
            
          {/* Add Prayer short skinny bar */}
          <Row className="justify-content-md-center">
              <Col md="auto">
                  <AddPrayerButton 
                    InputValue={createPrayerFormData.prayer}
                    onChangeFunction={e => setCreatePrayerFormData({prayer: e.target.value, groupname: createPrayerFormData.groupname})}
                    onClickFunction={createNewPrayer}
                    inGroupName =  {props._focusedGroup != null ? " in " + props._focusedGroup.groupname : ''}
                  />

              </Col>
          </Row>
            



          {/* My Prayers */}
          <Row> 
            
            {/* List Title */}
            <Col>
                <h1 data-testid="myPrayerList_title">{props.User ? props.User.username + "'s" : ""} Prayers </h1>
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
                  <h1>{props._focusedGroup ? props._focusedGroup.groupname + " | " + props._focusedGroup.id : ''} </h1>
                  <LinedPrayerList 
                    _currentUser={props.User}
                    prayersList={prayers && props._focusedGroup ? 
                      //filter out prayers that don't belong to the focused group
                      prayers.filter(prayer => prayer.prayergroup === props._focusedGroup.groupname) : []} 
                  />
                </Col>
            </Row>
        


        </>
        );




  };

  
  export default MyPrayerScreen












  
  // function returnIfExists(first, backup) {
  //   if (first)
  //     return first
  //   else 
  //     return backup
  // }

  