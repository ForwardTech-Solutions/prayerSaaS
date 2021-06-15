import React, {useEffect, useState} from "react";
import {Card, Button} from "react-bootstrap";
import './PrayerScreens.css'

function IndividualPrayerScreen(props) {
   
  const [prayer, setPrayer] = useState()

  useEffect(() => {
      fetchMyPrayers(props.match.params.id);   
  }, []);

  async function fetchMyPrayers(prayerID) {
      console.log("here we go")
          
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
    
    }


  function returnIfColor(first, backup) {
      const theFirst = "" + first;
      if (theFirst.length == 6)
        return '#' + first
      else 
        return backup
  }

  async function deletePrayerByID( id ) {
      console.log("delete code not written, but it should delete prayer: ", id)
      //await API.graphql({ query: deletePrayer, variables: { input: { id } }});
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
                  >
                    <Card.Header as="h5">{prayer.prayer}</Card.Header>

                    <Card.Body style={{color: returnIfColor(prayer.prayergroup, 'lightblue')}}>
                      <p className="smallText">by:{prayer.username}</p>
                      <p className="smallText">in:{prayer.prayergroup}</p>
                    </Card.Body>
                </Card>    
                      
            
                <Button style={{marginTop: 50}} variant="danger" onClick={() => {deletePrayerByID(prayer.id)}}>Delete this prayer: {prayer.prayer}</Button>

            </> 
            : <></>
          }
    </>
    );
};

  
  export default IndividualPrayerScreen