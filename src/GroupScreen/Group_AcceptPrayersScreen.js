import React, {useEffect, useState} from "react";
import {Card, Button, Form, Row, Container, InputGroup} from "react-bootstrap";
import { checkForBadWords } from "../common/functions/validation";


//TO DO: this is just a copy and paste from the email flow, need to refactor this.  
//endpoints can be found at https://wdq8s7zbcd.execute-api.us-east-1.amazonaws.com/dev /dict(post,get[id]) and /QR(get[id]) 



function GroupAcceptPrayerScreen(props) {

  const [prayer, setPrayer] = useState()
  const [fullName, setFullName] = useState()

  const [response, setResponse] = useState()
  const [isLoading, setisLoading] = useState()

  useEffect(() => {

  }, []);


  function returnIfColor(first, backup) {
      const theFirst = "" + first;
      if (theFirst.length === 6)
        return '#' + first
      else
        return backup
  }

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
      setisLoading(false)
    }
    else {


            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var jayson = JSON.stringify({
                "prayer" : prayer,
                "username": "",
                "fullName": fullName,
                "prayerGroupId": props.match.params.id,
                "source" : "addPrayerTo/" + props.match.params.id
            })

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: jayson,
                redirect: 'follow'
            };
            console.log(JSON.stringify(jayson))

            fetch("https://8tdq1phebd.execute-api.us-east-1.amazonaws.com/dev2/prayer/unauthorized", requestOptions)
            .then(response => response.text())
            .then(result => {
              console.log(result)

                //if results contains "hello"
                if (result.indexOf("does not accept unauthorized prayer requests") > -1) {
                    setResponse("Cannot add prayer requests to this group");
                    setisLoading(false)
                }
                else {
                  setResponse("Successfully Submitted!");
                  setPrayer("")
                  setFullName("")
                  setisLoading(false)
                }
                
            })
            .catch(error => {
                console.log('error', error)
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
        <Row>

        <Card
            bg={"dark"}
            style={{ width: '54rem' , height: '30rem', padding: '20px'}}
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
                            disabled={isLoading}
                            onClick={!isLoading ? handleClick : null}
                        >
                            {isLoading ? 'Loading…' : 'Submit'}
                        </Button>
                </InputGroup.Append>
            </InputGroup>
        
            <p style={response === "Successfully Submitted!" ? {color: 'green', fontSize: '16px'} : {color: 'red', fontSize: '16px'}}>{response}</p>


            </Card.Body>

        </Card>

        </Row>
        </Container>

    </>
    );
};


  export default GroupAcceptPrayerScreen