import React, { useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom';
import {Row, Col, Button, Modal} from "react-bootstrap";

import {Auth} from 'aws-amplify';


import LinedPrayerList from "../common/PrayerList/LinedPrayerList"

 function IndividualListScreen(props) {

    const [prayers, setPrayers] = useState([])
    const [prayerIds, setPrayerIds] = useState([])


    const [thisList, setThisList] = useState()
    const [selectedAdd, setSelectedAdd] = useState([])

    const [selectedRemove, setSelectedRemove] = useState([])


    const [showModal, setShowModal] = useState(false)

    const history = useHistory(); 


    useEffect(() => {
        
        fetchThisList(props.match.params.id)

        fetchMyPrayers()

     }, [])

     async function fetchThisList(id) {

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
                console.log("fetch list from id:" + result)})
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
                console.log("indListScreen: " + result)
            })
            .catch(error => console.log('error', error));
        
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
                (thisList ? prayers : []).filter((element) => {
                    for(var i=0; i< thisList.prayerIds.length; i++) {
                        if(element.id === thisList.prayerIds[i].prayerId)
                            return true
                    }
                    return false
                })

            }
            updateChecked={(event, prayerId) => { handleUpdateCheckedRemove(event, prayerId) }}
        /> 


        {/* add selected to list prayerIds button */}
        <Button size="sm" variant="outline-info" onClick={()=> {setShowModal(true)}}>Add to This List</Button> 
        <br />


        {/* If selected is not empty, display button */}
        {selectedRemove.length > 0 ?
            <>
            {/* remove selected from list prayerIds button */}
            <Button size="sm" variant="outline-danger" onClick={()=> {removeSelectedFromThisListPrayerIds()}}>Remove Selected from This List</Button> 
            
            </> : ""
        }
        




        {/* Modal */}
        <Modal show={showModal} onHide={()=> {setShowModal(false)}} scrollable={true} data-testid="IndividualList_AddPrayer_Modal">

            <Modal.Header closeButton>
                <Modal.Title>Add to This List</Modal.Title>
                {selectedAdd.length > 0 
                    ?   // {/* add selected to list prayerIds button */}
                        <Button size="sm" variant="outline-success" onClick={()=> {addSelectedToThisListPrayerIds(); setShowModal(false)}}>Add Selected to This List</Button>                
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
                    

    </>
    );
}

export default IndividualListScreen;