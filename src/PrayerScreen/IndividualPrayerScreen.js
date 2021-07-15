import React, {useEffect, useState} from "react";
import {Card, Button} from "react-bootstrap";
import {Auth} from 'aws-amplify';
import './PrayerScreens.css'

import {useHistory} from 'react-router-dom';


function IndividualPrayerScreen(props) {
   
  const [prayer, setPrayer] = useState()
  const history = useHistory(); 


  useEffect(() => {
      async function fetchMyPrayers(prayerID) {
            
        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
            mode: "cors"
        };
        
        fetch("https://8tdq1phebd.execute-api.us-east-1.amazonaws.com/dev2/prayer/" + prayerID, requestOptions)
            .then(response => response.text())
            .then(result => {
            const parsed = JSON.parse(result)
            setPrayer(parsed)
            console.log("idividualFetch:" + JSON.parse(result))})
            .catch(error => console.log('error', error));
      
      };
      fetchMyPrayers(props.match.params.id);  
  }, []);

  



  async function handleDeletePrayer( _id) {
    console.log("deleting:", _id)
          
    //delete the list
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`)


    var requestOptions = {
      headers: myHeaders,
      method: 'delete',
      redirect: 'follow'
    };

    fetch(process.env.REACT_APP_PRAYER_REST_ENDPOINT + "/prayer/" + _id, requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log('deleteResults: '+ result)    
        history.push('/') 
        history.go(0)
      })
      .catch(error => console.log('delete Error', error));
    
}


  function returnIfColor(first, backup) {
      const theFirst = "" + first;
      if (theFirst.length === 6)
        return '#' + first
      else 
        return backup
  }


  return (
    <>
          {prayer ? 
            <>
                <p>
                  id: {prayer.id}
                </p>
                <Card
                    bg={"dark"} 
                    style={{ width: '18rem' }}
                    data-testid= "individual_prayer_card"
                  >
                    <Card.Header as="h5">{prayer.prayer}</Card.Header>

                    <Card.Body style={{color: returnIfColor(prayer.prayergroup, 'lightblue')}}>
                      <p className="smallText">by:{prayer.username}</p>
                      <p className="smallText">in:{prayer.prayergroup}</p>
                    </Card.Body>
                </Card>    
                      
            
                <Button style={{marginTop: 50}} variant="outline-danger" onClick={() => {handleDeletePrayer(prayer.id)}}>Delete this prayer: {prayer.prayer}</Button>

            </> 
            : <></>
          }
    </>
    );
};

  
  export default IndividualPrayerScreen