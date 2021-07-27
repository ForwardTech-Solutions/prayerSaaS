import React, {useEffect, useState} from "react";
import {Card, Button} from "react-bootstrap";
import {Auth} from 'aws-amplify';



function EmailGroupsScreen(props) {
   
  const [groups, setGroups] = useState()


  useEffect(() => {
      async function fetchEmailGroups() {
            
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`)
    
        var requestOptions = {
            headers: myHeaders,
            method: 'GET',
            redirect: 'follow',
            mode: "cors"
        };
        
        //https://45al5921x1.execute-api.us-east-1.amazonaws.com/dev/email
        fetch("https://45al5921x1.execute-api.us-east-1.amazonaws.com/dev/email", requestOptions)
            .then(response => response.text())
            .then(result => {
                const parsed = JSON.parse(result)
                //console.log("emailGroupScreenFetch:" + result)
                setGroups(splitArrayByPrayerGroup(parsed.email_addresses))
            })
            .catch(error => console.log('error', error));
      
      };
      fetchEmailGroups();  
  }, []);

  

  function returnIfColor(first, backup) {
      const theFirst = "" + first;
      if (theFirst.length === 6)
        return '#' + first
      else 
        return backup
  }

  //split up inputArray into differnt arrays based on the distinct element.prayergroup  
  function splitArrayByPrayerGroup(inputArray) {
    //create new array of distinct prayergroup
    const prayerGroups = []
    for (let i = 0; i < inputArray.length; i++) {
              if (prayerGroups.indexOf(inputArray[i].prayergroup) === -1) {
        prayerGroups.push(inputArray[i].prayergroup)
      }
    }
    console.log("fn_prayerGroups:", prayerGroups)
    
    //split up inputArray into differnt arrays based on the distinct element.prayergroups
    const prayerGroupsArrays = prayerGroups.map(x => inputArray.filter(y => y.prayergroup.includes(x)))
    console.log("fn_prayerGroupsArray:", prayerGroupsArrays)
    return prayerGroupsArrays
      
  }


  return (
    <>
        {/* <p>{JSON.stringify(groups)}</p> */}
        {
            (groups ? groups : []).map((group, index) => {

              return (
                <div key={index}>
                    <h2>{group[0].prayergroup}</h2>
                    {group.map((email, i) => {
                        return(
                            
                                <Card
                                    bg={"dark"} 
                                    style={{ width: '32rem', margin: 20, padding:10 }}
                                    data-testid= "individual_prayer_card"
                                    key={email.prayergroup + "[" + i + "]"}
                                >
                                    <Card.Body style={{color: returnIfColor(email.prayergroup, 'lightblue')}}>
                                    <p className="smallText">address:{email.address}</p>
                                    <p className="smallText">subscribed:{email.subscribed ? ' true' : ' false'}</p>
                                    <p className="smallText">name:{email.fullName}</p>
                                    <p className="smallText">id:{email.id}</p>
                                    </Card.Body>
                                   
                                  
                                <Button style={{}} variant="outline-danger" onClick={() => {console.log('unsubscribeThisUser button pressed')}}>Unsubscribe this User (DOESNT WORK YET): {email.fullName}</Button>
                                </Card> 
                            
                        )
                    }
                    )}
                </div> 
                )
          })
        }
    </> 

    );
};

  
  export default EmailGroupsScreen