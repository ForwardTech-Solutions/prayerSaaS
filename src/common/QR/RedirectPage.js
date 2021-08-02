import React, { useEffect, useState } from 'react';
import {Row, Col, Container} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';


 function RedirectPage(props) {

   const [displayText, setdisplayText] = useState('Redirecting...');

    useEffect(() => {
         function findDestination(id) {


            var requestOptions = {
               method: 'GET',
               redirect: 'follow',
               mode: 'cors',
             };
             
             fetch(process.env.REACT_APP_QR_SERVICE_REST_ENDPOINT +  "/QR/" + id, requestOptions)
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