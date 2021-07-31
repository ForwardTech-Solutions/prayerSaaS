import React, {useEffect, useState} from "react";
import {Card, Button, Form, Row, Container, InputGroup, Col} from "react-bootstrap";

import ReCaptchaComp from "../common/ReCaptcha";

function EmailSignupScreen(props) {

  const [address, setAddress] = useState()
  const [response, setResponse] = useState()
  const [isLoading, setisLoading] = useState()
  const [captchaPassed, setCaptchaPassed] = useState()

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
    var result = validateEmail(address)
    if(result) {


            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var jayson = JSON.stringify({
                "address": props.match.params.group,
                "fullName": "Tim Test",
                "prayergroup": "test_Group_1"
            })

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: jayson,
                redirect: 'follow'
            };
            console.log(JSON.stringify(jayson))

            fetch("https://45al5921x1.execute-api.us-east-1.amazonaws.com/dev/email", requestOptions)
            .then(response => response.text())
            .then(result => {
                setResponse("Successfully Signed Up!");
                setAddress("")
                setisLoading(false)
            })
            .catch(error => {
                console.log('error', error)
                setResponse("Sign Up failed... Please try again later");
                setisLoading(false)
            });


    }
    else {
        setResponse("Email address invalid: " + address);
        setisLoading(false)

    }

  }

  function handleCapcthaChange(value) {
    console.log("ReCaptcha value: ", value)
    if(value.length > 0) {
      setCaptchaPassed(true)
    }
  }



  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
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
            style={{ width: '54rem' , height: '22rem', padding: '20px'}}
            data-testid= "email_signup_card"
        >
            <Card.Body style={{color: returnIfColor("", 'lightblue')}}>
              
            <Card.Title as="h1" data-testid="EmailSignup_title" style={{textAlign: 'center'}}>Join the TFBC Prayer Team Email List</Card.Title>


            <Card.Subtitle as="h4"  style={{textAlign: 'center'}}>Get weekly prayer lists, announcments, and encouragement</Card.Subtitle>

            <br/>

            <InputGroup>
                <Form.Control size="lg" type="email" id="EmailSignup_email_form" placeholder="name@example.com" onChange={e => {setAddress(e.target.value)}} />
                <InputGroup.Append >
                        <Button
                            variant="outline-secondary"
                            size = 'lg'
                            disabled={isLoading || !captchaPassed}
                            onClick={!isLoading ? handleClick : null}
                        >
                            {isLoading ? 'Loading…' : 'Sign Up'}
                        </Button>
                </InputGroup.Append>
            </InputGroup>
        
            <p style={response === "Successfully Signed Up!" ? {color: 'green', fontSize: '16px'} : {color: 'red', fontSize: '16px'}}>{response}</p>
            <div style={{justifyContent: 'center', marginTop: '20px'}}>
              <ReCaptchaComp onChange={handleCapcthaChange} style={{}} />
            </div>

            </Card.Body>

        </Card>

        </Row>
        </Container>

    </>
    );
};


  export default EmailSignupScreen