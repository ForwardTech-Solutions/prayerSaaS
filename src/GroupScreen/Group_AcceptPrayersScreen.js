import React, {useEffect, useState} from "react";
import {Card, Button, Form, Row, Container, InputGroup, Col} from "react-bootstrap";
import { checkForBadWords } from "../common/functions/validation";

import ReCaptchaComp from "../common/ReCaptcha";


//TO DO: this is just a copy and paste from the email flow, need to refactor this.  
//endpoints can be found at https://wdq8s7zbcd.execute-api.us-east-1.amazonaws.com/dev /dict(post,get[id]) and /QR(get[id]) 



function GroupAcceptPrayerScreen(props) {

  const [prayer, setPrayer] = useState()
  const [fullName, setFullName] = useState()

  const [response, setResponse] = useState()
  const [isLoading, setisLoading] = useState()

  const [validGroup, setValidGroup] = useState("loading") //values: doesNotExist, valid, notAccepting, or loading 

  const [captchaToken, setCaptchaToken] = useState('')


  
  useEffect(() => {
        
    async function fetchMyGroupAcceptingPrayers(groupID) {

        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
            mode: "cors"
        };
        
        fetch("https://8tdq1phebd.execute-api.us-east-1.amazonaws.com/dev2/group/accepts_unathorized_prayers/" + groupID, requestOptions)
            .then(response => response.text())
            .then(result => {
              var theResult = JSON.parse(result)
              //if group does not exist, result will contain "group does not exist"
              if (result.indexOf("group does not exist") !== -1) {
                setValidGroup('doesNotExist')
                console.log("group does not exist")
                
              }
              //result will be "true" or "false" (the strings, not the boolean).  true means the group is accepting prayers, false means it is not.
              else if(theResult.result !== "true") {
                setValidGroup('notAccepting')
                console.log("group is not accepting prayers")
                
              }
              else {
                setValidGroup('valid')
                console.log("group exists and is accepting prayers")
                
              }
              console.log(theResult)
              console.log(theResult.result, typeof theResult.result)

            })
            .catch(error => {
              console.log('error', error)
            });
    }

    fetchMyGroupAcceptingPrayers(props.match.params.id)



}, []);


  function returnIfColor(first, backup) {
      const theFirst = "" + first;
      if (theFirst.length === 6)
        return '#' + first
      else
        return backup
  }

  // function handleCapcthaChange(value) {
  //   console.log("ReCaptcha value: ", value)
  //   if(value.length > 0) {
  //     setCaptchaToken(true)
  //   }
  // }

//   async function deletePrayerByID( id ) {
//       console.log("delete code not written, but it should delete prayer: ", id)
//       //await API.graphql({ query: deletePrayer, variables: { input: { id } }});
//   }

  function handleClick() {
    setisLoading(true)
    var result = checkForBadWords(prayer)

    //if the user has entered a bad word, we need to show them a message
    if(result) {
      setResponse("You have entered a bad word. Please edit your prayer.")
      console.log("bad word entered")
      setisLoading(false)
    }
    else {


            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var jayson = JSON.stringify({
                "prayer" : prayer,
                "username": "",
                "fullName": (fullName === "" || fullName == null) ? "Anonymous" : fullName,
                "prayerGroupId": props.match.params.id,
                "source" : "addPrayerTo/" + props.match.params.id,
                "token": captchaToken
            })

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: jayson,
                redirect: 'follow',
            };
            console.log(JSON.stringify(jayson))

            //handleClick fetch
            let fetchStatus;
            fetch("https://8tdq1phebd.execute-api.us-east-1.amazonaws.com/dev2/prayer/unauthorized", requestOptions)
            .then(response => {
              fetchStatus = response.status;
              response.text()
            })
            .then(result => {
              console.log('fetchStatus', fetchStatus)
              if(fetchStatus === 200) {

                  console.log(result)
                  setResponse("Successfully Submitted!");
                  setPrayer("")
                  setFullName("")
                  setisLoading(false)
              }
              else if (fetchStatus === 400) {
                console.log("400 error", result)
                setResponse("Invalid URL.  No such prayer group exists" );
                setisLoading(false)
              } 
              else if (fetchStatus === 401) {
                  console.log("401 error", result)
                  setResponse("Cannot add prayer requests to this group");
                  setisLoading(false)
              }
              else if (fetchStatus === 469) {
                console.log("469 error", result)
                setResponse("You seem like a robot... try again");
                setisLoading(false)
            }
              else {
                setResponse("Error (", fetchStatus, ") reached when signing up. Please try again.")
                throw new Error("Error signing up: ", fetchStatus)
              }
            })
            .catch(error => {
                console.log('TOM: fetch error: ', error)
                setResponse("Submit prayer failed... Please try again later");
                setisLoading(false)
            });


    }
  

  }





  return (

    <>
     <Container
        fluid
        className="App-header"
      >
        {validGroup === "loading" ? <h3>Loading...</h3> : 
          <Row>

            <Col >
            {validGroup === 'valid' ? 
                <Card
                    bg={"dark"}
                    style={{  height: '35rem', padding: '20px'}}
                    data-testid= "prayer_accept_card"
                >
                    <Card.Body style={{color: returnIfColor("", 'lightblue')}}>

                    <Card.Title as="h1" data-testid="PrayerAccept_title" style={{textAlign: 'center'}}>How can we pray for you?</Card.Title>


                    <Card.Subtitle as="h4"  style={{textAlign: 'center'}}>Please enter your prayer below.  Our prayer team and staff each meet weekly to pray for your requests</Card.Subtitle>

                    <br/>            
                    
                    <Form.Label>Name</Form.Label>

                    <Form.Control size="lg" type="string" id="PrayerScreen_name_form" placeholder="John Doe (leave blank to remain Anonymous)" onChange={e => {setFullName(e.target.value)}} />


                    <Form.Label>Prayer</Form.Label>

                    <InputGroup>

                        <Form.Control size="lg" type="string" id="PrayerScreen_prayer_form" placeholder="for God's will to be done in..." onChange={e => {setPrayer(e.target.value)}} />

                        <InputGroup.Append >
                                <Button
                                    variant="outline-secondary"
                                    size = 'lg'
                                    disabled={isLoading || captchaToken === ""}
                                    onClick={!isLoading ? handleClick : null}
                                >
                                    {isLoading ? 'Loading…' : 'Submit'}
                                </Button>
                        </InputGroup.Append>
                    </InputGroup>
                
                    <p style={response === "Successfully Submitted!" ? {color: 'green', fontSize: '16px'} : {color: 'red', fontSize: '16px'}}>{response}</p>


                    <div style={{justifyContent: 'center', marginTop: '20px'}}>
                      <ReCaptchaComp onChange={setCaptchaToken} style={{}} />
                    </div>


                    </Card.Body>

                </Card>
                : 
                  <Card
                      bg={"dark"}
                      style={{ width: '54rem' , height: '30rem', padding: '20px'}}
                      data-testid= "invalid_group_card"
                  >
                      <Card.Body style={{color: returnIfColor("", 'lightblue'),textAlign: 'center'}}>
                        <Card.Title as="h1" data-testid="PrayerAccept_title" style={{textAlign: 'center'}}>Oops, wrong place... </Card.Title>
                        
                          {
                            validGroup === 'doesNotExist' ? <><br/><p>This group does not exist</p> 
                            <br/> <p>Contact your administrator about this link</p></>
                            : validGroup === 'notAccepting' ? <p>This group is not accepting prayer requests at this time</p>
                            : <p>Unknown error.  Try again or report the issue to customer service</p>
                          }                      
                        
                      </Card.Body>
                  </Card>

            } 
            {/* end of validGroup == 'valid' ? : */}
            </Col>
          </Row>
        }
        {/* end of validGroup == 'loading' ? : */}

        </Container>

    </>
    );
};


  export default GroupAcceptPrayerScreen