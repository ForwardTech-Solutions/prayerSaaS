import React, { useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom';
import {Row, Col, Button, Modal, Card, Toast, T} from "react-bootstrap";


import {Auth} from 'aws-amplify';


import LinedPrayerList from "../common/PrayerList/LinedPrayerList"

 function IndividualListScreen(props) {

    const [prayers, setPrayers] = useState([])
    const [prayerIds, setPrayerIds] = useState([])
    const [emailGroupNames, setEmailGroupNames] = useState([])
    const [emailAddresses, setEmailAddresses] = useState([]);

    const [thisList, setThisList] = useState()
    const [selectedAdd, setSelectedAdd] = useState([])

    const [selectedRemove, setSelectedRemove] = useState([])


    const [showPrayerModal, setShowPrayerModal] = useState(false)
    const [showEmailModal, setShowEmailModal] = useState(false)

    const [showFeedbackToast, setShowFeedbackToast] = useState(false)
    const [toastFeedback, setToastFeedback] = useState('null')

    const history = useHistory(); 

    const [groups, setGroups] = useState()


       
    useEffect(() => {
        
        fetchThisList(props.match.params.id)

        fetchMyPrayers()

        fetchEmailGroups();  


     }, [])

     async function fetchThisList(id) {
        //this code authenticat
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`)


        
        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
            mode: "cors",
            headers: myHeaders
        };
        
         fetch("https://8tdq1phebd.execute-api.us-east-1.amazonaws.com/dev2/list/" + id, requestOptions)
            .then(response => response.text())
            .then(result => {
                const parsed = JSON.parse(result)
                setThisList(parsed)
                console.log("fetch list from id: ", result)})
            .catch(error => console.log('error', error));

    }

     async function fetchMyPrayers() {
        console.log("here we go")
            
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`)


        var requestOptions = {
            headers: myHeaders,
            method: 'GET',
            redirect: 'follow',
            mode: "cors"
        };
        
        fetch(process.env.REACT_APP_PRAYER_REST_ENDPOINT + "/prayer", requestOptions)
            .then(response => response.text())
            .then(result => {
                const parsed = JSON.parse(result)         
                setPrayers(parsed.prayers)
                // console.log("individual_List_Screen: " + result)
            })
            .catch(error => console.log('error', error));
        
    }


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
                console.log("emailGroupScreenFetch:" + result)
                console.log("parsed", parsed)
                setEmailAddresses(parsed.email_addresses)
                setEmailGroupNames(splitArrayByPrayerGroup(parsed.email_addresses))
            })
            .catch(error => console.log('error', error));
      
      };


    //function that returns all distinct element.prayergroup values from array
    function splitArrayByPrayerGroup(array) {
        var _groups = []
        array.forEach(function(element) {
            if (_groups.indexOf(element.prayergroup) == -1) {
                _groups.push(element.prayergroup)
            }
        });
        return _groups;
    }
   

    async function handleEditName() {
        console.log("edit clicked")
        let newListName = prompt("Please enter a new name for this List:", "Week of September 15h");
        if (newListName == null || newListName === "") {
          console.log("User cancelled the prompt");
          return 0;
        }
    
        //handle the edit with the new name but keep the same prayerIds and prayergroupIds
        handleEditViaAPI(newListName, thisList.prayerIds, thisList.prayergroupId)

    }


    async function handleEditViaAPI(_newListName, _newListPrayerIds, _newListPrayerGroupId) {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`)

        var raw = JSON.stringify({
          "listName": _newListName,
          "prayerIds": _newListPrayerIds,
          "prayergroupId": _newListPrayerGroupId
        });

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        fetch(process.env.REACT_APP_PRAYER_REST_ENDPOINT + "/list/" + thisList.id, requestOptions)
          .then(response => response.text())
          .then(result => {
            console.log('updateResults: '+ result)
            
            fetchThisList(props.match.params.id)
        
          })
          .catch(error => console.log('error', error));
    }


    


    function handleUpdateCheckedAdd(event, prayerId) {
        console.log("updateChecked: " + prayerId)

        //if checkbox is checked, add to selected array
        if (event.target.checked) {
            setSelectedAdd([...selectedAdd, prayerId])
        }
        //if checkbox is unchecked, remove from selected array
        else {
            setSelectedAdd(selectedAdd.filter(x => x !== prayerId))
        }
    }

    function handleUpdateCheckedRemove(event, prayerId) {
        console.log("updateChecked: " + prayerId)

        //if checkbox is checked, add to selected array
        if (event.target.checked) {
            setSelectedRemove([...selectedRemove, prayerId])
        }
        //if checkbox is unchecked, remove from selected array
        else {
            setSelectedRemove(selectedRemove.filter(x => x !== prayerId))
        }
    }



    async function handleDeleteList() {
        console.log("deleting:", props.match.params.id)
              
        //delete the list
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`)


        var requestOptions = {
          headers: myHeaders,
          method: 'delete',
          redirect: 'follow'
        };

        fetch(process.env.REACT_APP_PRAYER_REST_ENDPOINT + "/list/" + props.match.params.id, requestOptions)
          .then(response => response.text())
          .then(result => {
            console.log('deleteResults: '+ result)    
            history.push('/') 
            history.go(0)
          })
          .catch(error => console.log('delete Error', error));
        
    }




    function addSelectedToThisListPrayerIds () {

        const _newListPrayerIds = [...thisList.prayerIds, ...formatSelected(selectedAdd)]
      
        //update the list with the new prayerIds
        handleEditViaAPI(thisList.listName, _newListPrayerIds, thisList.prayergroupId)

        //reset selected array
        setSelectedAdd([])
        setSelectedRemove([])
    }

    function formatSelected(selected) {
         //map selected array to string
        return selected.map(x => {return {prayerId: x}})

    }

    function removeSelectedFromThisListPrayerIds () {
        //if there are no selected prayerIds, do nothing
        if (selectedRemove.length === 0) {
            return
        }

        //filter the selected ids from the prayerIds
        const _newListPrayerIds = thisList.prayerIds.filter(x => selectedRemove.indexOf(x.prayerId) === -1)

        //update the list with the new prayerIds
        handleEditViaAPI(thisList.listName, _newListPrayerIds, thisList.prayergroupId)

        //reset selected array
        setSelectedAdd([])
        setSelectedRemove([])

    }



    async function handleSendListToEmailGroup(emailGroupName) {
        console.log("sendListToEmailGroup:", emailGroupName)

        //TO: filter emailAddresses to only the emails where prayergroup is this emailGroupName
        var _tos = emailAddresses.filter(x => x.prayergroup === emailGroupName)
            //map to array of addresses
            .map(x => x.address)
        
        //SUBJECT: just the list name
        var _subject = "Prayer List for " + thisList.listName

        //prepare the prayer info
        var _prayers = thisList ? thisList.prayerIds.map(x => {return prayers.filter(y => y.id === x.prayerId)[0]}) : []
        // var _prayerTitles = _prayers.map(x => {return x.prayer})
        // var _prayerUsernames = _prayers.map(x => {return x.username})

        //BODY: the list name and the prayerIds
        var _body = "Prayer List for " + thisList.listName + "\n\n" + _prayers.map(x => {return x.prayer + " by " + x.username}).join("\n")

        var myHeaders = new Headers();
        // myHeaders.append("Content-Type", "application/json");
        // myHeaders.append("Authorization", `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`)

        var _textBody = "all these requests";

        var jsonBody = {
            to: _tos,
            from: 'prayer@forwardtechfl.com',
            subject: _subject,
            body: _body,
        }

        var requestOptions = {
          headers: myHeaders,
          method: 'post',
          redirect: 'follow',
          body: JSON.stringify(jsonBody),
          mode: "cors"

        };

        console.log(jsonBody)

        let fetchResponse; 
        fetch(process.env.REACT_APP_EMAIL_SERVICE_REST_ENDPOINT + "/send-email", requestOptions)
          .then(response => {
                fetchResponse = response.status  
                response.text()})
          .then(result => {
              if(fetchResponse === 200) {
                console.log('successfully sent emails')
                setShowEmailModal(false)
                setToastFeedback("Emails sent")
                setShowFeedbackToast(true)
              }
              else if (fetchResponse === 400) {
                console.log('error sending emails')
                setShowEmailModal(false)
                setToastFeedback("Error sending emails.  Error 400")
                setShowFeedbackToast(true)
              }
              else {
                console.log('error sending emails')
                setShowEmailModal(false)
                setToastFeedback("Error sending emails.  Error ", fetchResponse)
                setShowFeedbackToast(true)
              }
            
          })
          .catch(error => {
              console.log('sent email Error', error)
              setShowEmailModal(false)
              setToastFeedback("Error sending emails.  Unknown Error (fetch error)")
              setShowFeedbackToast(true)
          
            });
        

                //TO DO: add verbose toast feedback based on response code



    }



    


    return (
    <>
        <Row>        
            {/* List Title */}
            
                <h1 data-testid="thisList_title">
                    {thisList ? thisList.listName : ""} 
                    <Button size="sm" variant="outline-info" onClick={()=> {handleEditName()}}>Edit Name</Button> 
                    <Button size="sm" variant="danger" onClick={()=> {handleDeleteList()}} data-testid="List_deleteListButton">Delete this List</Button> 
                </h1> 
         
        </Row>

       

        
        <LinedPrayerList 
            prayersList={
                //filter prayers to only those whos id is in thisList.prayerIds
                thisList ? thisList.prayerIds.map(x => {return prayers.filter(y => y.id === x.prayerId)[0]}) : []

            }
            updateChecked={(event, prayerId) => { handleUpdateCheckedRemove(event, prayerId) }}
        /> 


        {/* add selected to list prayerIds button */}
        <Button size="sm" variant="outline-info" onClick={()=> {setShowPrayerModal(true)}}>Add to This List</Button> 
        <br />
        <Button size="sm" variant="outline-success" onClick={()=> {setShowEmailModal(true)}}>Send this List to Email Group</Button>


        {/* If selected is not empty, display button */}
        {selectedRemove.length > 0 ?
            <>
            {/* remove selected from list prayerIds button */}
            <Button size="sm" variant="outline-danger" onClick={()=> {removeSelectedFromThisListPrayerIds()}}>Remove Selected from This List</Button> 
            
            </> : ""
        }

        
        <Toast 
            onClose={() => setShowFeedbackToast(false)} 
            show={showFeedbackToast} 
            delay={5000} 
            autohide 
            bg='success' //not working idk why
            style={{marginTop: '30px'}}
        >
          <Toast.Header>
            <strong className="me-auto">PrayerSaaS</strong>
          </Toast.Header>
          <Toast.Body style={{color: 'black'}}>{toastFeedback}</Toast.Body>
        </Toast>
        




        {/* Prayer List Modal */}
        <Modal show={showPrayerModal} onHide={()=> {setShowPrayerModal(false)}} scrollable={true} data-testid="IndividualList_AddPrayer_Modal">

            <Modal.Header closeButton>
                <Modal.Title>Add to This List</Modal.Title>
                {selectedAdd.length > 0 
                    ?   // {/* add selected to list prayerIds button */}
                        <Button size="sm" variant="outline-success" onClick={()=> {addSelectedToThisListPrayerIds(); setShowPrayerModal(false)}}>Add Selected to This List</Button>                
                    :   // show disabled button
                        <Button size="sm" variant="outline-success" disabled>Add Selected to This List</Button>
                }
                
            </Modal.Header>
            <Modal.Body>

                
                    <LinedPrayerList 
                        prayersList={
                             //filter the selected ids from the prayerIds
                            thisList ? prayers.filter(x => thisList.prayerIds.indexOf(x.id) === -1)
                                : prayers
                        }
                        updateChecked={(event, prayerId) => { handleUpdateCheckedAdd(event, prayerId) }}
                    /> 

                    
            </Modal.Body>
        </Modal>


        
        {/* Email Groups Modal */}
        <Modal show={showEmailModal} onHide={()=> {setShowEmailModal(false)}} scrollable={true} data-testid="IndividualList_AddPrayer_Modal">

            <Modal.Header closeButton>
                <Modal.Title>Send to which Email Group</Modal.Title>                               
            </Modal.Header>
            <Modal.Body>

                {/* Email Groups */}
                {
                    emailGroupNames.map((emailGroupName, i) => {
                        return (
                            
                            <Card key={"emailGroup" + i}>
                                <Card.Header>
                                    <Card.Title>{emailGroupName}</Card.Title>
                                    <Button size="sm" variant="outline-info" data-testid={emailGroupName + "_send_button"} onClick={()=> {handleSendListToEmailGroup(emailGroupName)}}>Send</Button>
                                </Card.Header>
                            </Card>
                        )
                    })
                }


                    
            </Modal.Body>
        </Modal>



    </>
    );
}

export default IndividualListScreen;