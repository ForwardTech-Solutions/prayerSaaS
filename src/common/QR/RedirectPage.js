import React, { useEffect, useState } from 'react';
import {Row, Col, Container} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';


 function RedirectPage(props) {

   const [displayText, setdisplayText] = useState('Redirecting...');

    useEffect(() => {
         function findDestination(id) {
            //https://wdq8s7zbcd.execute-api.us-east-1.amazonaws.com/dev/QR/ffb9e2c0-e5ac-11eb-8c31-4be054f54164


            var requestOptions = {
               method: 'GET',
               redirect: 'follow',
               mode: 'cors',
             };
             
             fetch("https://wdq8s7zbcd.execute-api.us-east-1.amazonaws.com/dev/QR/" + id, requestOptions)
               .then(response => response.text())
               .then(result => {
                  console.log('redirectPage findDest fetch result: ' + result);
                  
                  if( typeof result === 'string' && result.length > 0) {
                     window.location.replace("http://" + result.replaceAll('"','').replace('"',''));
                  }
                  else {
                     setdisplayText('Error: internal error. We\'re sorry');
                  }

               })
               .catch(error => {console.log('error', error)
               setdisplayText('Error: invalid URL');
            });

         }

         findDestination(props.match.params.id);
     }, [])

  return (
      <Container
         fluid
         className="App-header"
      >
         <p>{displayText}</p>
      </Container>    
    );
}
    
export default RedirectPage;