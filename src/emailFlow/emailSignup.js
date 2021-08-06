import React, {useEffect, useState, useRef} from "react";
import {Card, Button, Form, Row, Container, InputGroup, Col} from "react-bootstrap";

import ReCaptchaComp from "../common/ReCaptcha";

function EmailSignupScreen(props) {

  const [address, setAddress] = useState()
  const [name, setName] = useState()
  const [response, setResponse] = useState()
  const [isLoading, setisLoading] = useState()
  const [captchaToken, setCaptchaToken] = useState()
  const captchaRef = useRef(null)

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
    if(result && captchaToken.length > 0) {



            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var jayson = JSON.stringify({
                "address": address,
                "fullName": name ? name : "",
                "prayergroup": props.match.params.group,
                "token": captchaToken,
            })

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: jayson,
                redirect: 'follow',
                mode: 'cors',
            };
            console.log(JSON.stringify(jayson))

////////////////////////////////////////////////////////////////////////////////
              ////////////////////////////////////////////////////////////v
              //TO DO:  add cors to the backend response
////////////////////////////////////////////////////////////////////////////////

            let fetchStatus
            fetch("https://45al5921x1.execute-api.us-east-1.amazonaws.com/dev/email", requestOptions)
            .then(response => {
              fetchStatus = response.status;
              response.text()})
            .then(result => {
              console.log("fetchStatus: ", fetchStatus)
              if(fetchStatus === 200) {
                console.log(result)
                setResponse("Successfully Signed Up!");
                setAddress("")
                setisLoading(false)
              } 
              else if (fetchStatus === 400) {
                setResponse("You seem like a robot (error code 400)... try again")
                setisLoading(false) 
              }
              else {
                setResponse("Error signing up. Please try again. (", fetchStatus, ")")
                throw new Error("Error signing up: ", fetchStatus)
              }
            })
            .catch(error => {
                console.log('error', error)
                setResponse("Sign Up failed... Please try again later");
                setisLoading(false)
                resetCaptcha()
            });


    }
    else {
        setResponse("Email address invalid: " + address);
        setisLoading(false)
        resetCaptcha()
    }

  }

  // function handleCapcthaChange(value) {
  //   console.log("ReCaptcha value: ", value)
  //   if(value.length > 0) {
  //     setCaptchaToken(value)
  //   }
  // }



  function resetCaptcha(){
    // captchaRef.current.reset()
    // setCaptchaToken("")
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
            style={{ height: '36rem', padding: '20px'}}
            data-testid= "email_signup_card"
        >
            <Card.Body style={{color: returnIfColor("", 'lightblue')}}>
              
            <Card.Title as="h1" data-testid="EmailSignup_title" style={{textAlign: 'center'}}>Join the TFBC Prayer Team Email List</Card.Title>


            <Card.Subtitle as="h4"  style={{textAlign: 'center'}}>Get weekly prayer lists, announcments, and encouragement</Card.Subtitle>

            <br/>

            <Form.Label>Name</Form.Label>

            <Form.Control size="lg" type="string" id="EmailSignup_fullName_form" placeholder="John Doe (optional)" onChange={e => {setName(e.target.value)}} />


            <Form.Label>Email Address</Form.Label>

            <InputGroup>
                <Form.Control size="lg" type="email" id="EmailSignup_email_form" placeholder="name@example.com" onChange={e => {setAddress(e.target.value)}} />
                <InputGroup.Append >
                        <Button
                            variant="outline-secondary"
                            size = 'lg'
                            disabled={isLoading || !captchaToken}
                            onClick={!isLoading ? handleClick : null}
                        >
                            {isLoading ? 'Loading…' : 'Sign Up'}
                        </Button>
                </InputGroup.Append>
            </InputGroup>
        
            <p style={response === "Successfully Signed Up!" ? {color: 'green', fontSize: '16px'} : {color: 'red', fontSize: '16px'}}>{response}</p>
            <div style={{justifyContent: 'center', marginTop: '20px'}}>
              <ReCaptchaComp onChange={setCaptchaToken} style={{}} />
            </div>

            </Card.Body>

        </Card>

        </Row>
        </Container>

    </>
    );
};


  export default EmailSignupScreen