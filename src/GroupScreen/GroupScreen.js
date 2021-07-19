import React,  { useEffect, useState } from "react";
import {Row, Col} from "react-bootstrap";
import {Auth} from 'aws-amplify';

import PrayerList from "../common/PrayerList/PrayerList"

//info given: aws, groups
    // props:   AWSUser = {currentAWSUser}
        //      Groups = {allGroups}
        //      User = {currentUser}


//initials



  
function GroupScreen(props) {

    const [group, setGroup] = useState()
    const [prayers, setPrayers] = useState()

    


    useEffect(() => {
        
        async function fetchMyGroup(groupID) {

            var requestOptions = {
                method: 'GET',
                redirect: 'follow',
                mode: "cors"
            };
            
            fetch("https://8tdq1phebd.execute-api.us-east-1.amazonaws.com/dev2/group/" + groupID, requestOptions)
                .then(response => response.text())
                .then(result => {
                    const parsed = JSON.parse(result)
                    setGroup(parsed)
                    console.log("fetch group from id:" + result)})
                .catch(error => console.log('error', error));
        }

        fetchMyGroup(props.match.params.id)

    
    
    }, []);


    useEffect(() => {
        async function fetchPrayers(groupName) {
            
            var myHeaders = new Headers();
            //myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`)

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow',
                mode: "cors",
            };
            
            fetch(process.env.REACT_APP_PRAYER_REST_ENDPOINT + "/prayer/fromGroup/" + groupName, requestOptions)
                .then(response => response.text())
                .then(result => {
                const parsed = JSON.parse(result)
                setPrayers(parsed.prayers)
                console.log("fetch prayers for group:" + result)})
                .catch(error => console.log('error', error));
          
        };

        if(group != null)
            fetchPrayers(group.groupname);  

    }, [group])




    return(
        <>
            {/* Group's Prayers */}
            <Row> 
            
                {/* List Title */}
                <Col>
                    <h1 data-testid="groupTitleHeader">{group ? group.groupname : "Error: No Group"}</h1>
                </Col>
            </Row>


            List of prayers
                <PrayerList 
                    prayersList={prayers ? prayers : []}
                />
           

        </>
    )
}

export default GroupScreen;