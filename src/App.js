//default
import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

//cognito authentication 
import { withAuthenticator } from 'aws-amplify-react'
import Amplify, { Auth } from 'aws-amplify';
import aws_exports from './aws-exports';


//after imports
Amplify.configure(aws_exports);


//initials
const initialCreatePrayerFormState = {
  prayer: '',
  //description: '',
  groupID: null,
}


function App2() {
  const [prayers, setPrayers] = useState([])
  const [createPrayerFormData, setCreatePrayerFormData] = useState(initialCreatePrayerFormState)
  const [currentUser, setCurrentUser] = useState('not-signed-in')
  const [allGroups, setAllGroups] = useState([])
  

  useEffect(() => {
   fetchMyPrayers();
   fetchAllGroups();
   updateAWSUser();
  }, [])

  async function updateAWSUser() {
    try{
      let user = await Auth.currentAuthenticatedUser();
      console.log(user.username)
      setCurrentUser(user.username)
    } catch (err) {
      console.log ("error", err)
    }
  }


  function makeid(length) {
    var result           = '#';
    var characters       = '0123456789ABCDEF';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

  function getGroupNameFromID (group_id) {
    if(!group_id) return 'invalidID'
    var result = allGroups.find(({ id }) => id == group_id ).name
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
    console.log("fetchMyPrayers not set up with the REST API yet")   

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
        "username": currentUser,
        "prayer": formToSend.prayer,
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: putBody,
        redirect: 'follow'
      };

      fetch("https://8tdq1phebd.execute-api.us-east-1.amazonaws.com/dev2/prayer", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    


    //await API.graphql({ query: createPrayer, variables: { input: formToSend } });
    //3. Deal with local variables
    setPrayers([ ...prayers, createPrayerFormData ]);
    setCreatePrayerFormData(initialCreatePrayerFormState);
  }

  async function createNewGroup() {
    var randomGroup = {
      name: makeid(6),
    }
    //await API.graphql({ query: createGroup, variables: { input: randomGroup } }).then(() => {fetchAllGroups()})
    // setAllGroups([ ...allGroups, randomGroup ]);
  }

  async function deletePrayerByID({ id }) {
    const newNotesArray = prayers.filter(note => note.id !== id);
    setPrayers(newNotesArray);
    //await API.graphql({ query: deletePrayer, variables: { input: { id } }});
  }


  return (
    <div className="App">
      <header className="App-header">
        <div style={{display: 'flex', flexDirection: 'row'}}>

          {/* column 1 */}
          <img src={logo} className="App-logo" alt="logo" />

          {/* column 2 */}
          <div style={{flex:1}}>
            <h1>Add Prayer</h1>

              <input
                onChange={e => setCreatePrayerFormData({ ...createPrayerFormData, 'prayer': e.target.value})}
                placeholder="Prayer"
                value={createPrayerFormData.prayer}
              /> <br/>
              {/* <input
                onChange={e => setCreatePrayerFormData({ ...createPrayerFormData, 'description': e.target.value})}
                placeholder="Description"
                value={createPrayerFormData.description}
              /> <br/> */}
              <input
                placeholder="Group"
                value={createPrayerFormData.groupID != null ? getGroupNameFromID(createPrayerFormData.groupID) : 'personal'}
                readOnly
              /> <br/>
              {/* <p>{createPrayerFormData.groupID}</p> */}
              <button onClick={() => createNewPrayer()}>Create Prayer</button>
              
            </div>

          {/* column 3 */}
          <div style={{flex:1}}>
              <h1>{currentUser}'s Prayers </h1>
              <div style={{marginBottom: 30}}>
                {
                  prayers.map(prayer => (
                    <div key={prayer.id || prayer.prayer} style={{ border: '4px dotted lightblue'}}>
                      <p >{prayer.prayer}</p>
                      <p className="smallText">by:{prayer.username}</p>

                      {/* <p className="smallText">{prayer.groupID? getGroupNameFromID(prayer.groupID) : "-personal-"}</p> */}
                      {/* <button onClick={() => deletePrayerByID(note)}>Delete note</button> */}
                    </div>
                  ))
                }
              </div>
          </div>


          {/* column 4 */}
            <div style={{flex:1}}>
              <h1>Groups</h1>
              <button onClick={() => createNewGroup()}>Create New Group</button>
              <button onClick={() => console.log(allGroups)}>printGroups</button>

              <div style={{marginBottom: 30}}>
                {
                  allGroups.map(group => (
                    <div key={group.id || group.name} style={{ border: '4px dotted lightblue'}}>
                      <h2>{group.name}</h2>
                      <p className="smallText">PrayerCount: {getPrayerCountFromGroupID(group.id)}</p>
                      <button onClick={() => {
                            console.log('setactive button pressed');
                            setCreatePrayerFormData({ ...createPrayerFormData, 'groupID': group.id})
                          }}>set as Active</button>
                    </div>
                  ))
                }
              </div>
            </div>
        </div>
            
          
      </header> 
    </div>
  );

}



export default withAuthenticator(App2, true);
