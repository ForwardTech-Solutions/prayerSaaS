import React, { useEffect, useState } from 'react';
import {Row, Col, Container} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';


 function RedirectPage(props) {

   const [displayText, setdisplayText] = useState('Redirecting...');

    useEffect(() => {
         function findDestination(id) {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
    

            var requestOptions = {
               headers: myHeaders,
               method: 'GET',
               redirect: 'follow',
               mode: 'cors',
             };
             
            let fetchStatus;
            fetch(process.env.REACT_APP_QR_SERVICE_REST_ENDPOINT +  "/QR/" + id, requestOptions)
            .then(response => {
              fetchStatus = response.status;
              return response.json()
            })
            .then(result => {
               console.log('fetchStatus', fetchStatus)
               //console.log(JSON.parse(result))
               console.log(result);

               if(fetchStatus === 200) {
                  if( typeof result.result === 'string' && result.result.length > 0) {
                     let theDest = result.result.replaceAll('"','').replace('"','');
                     if(!result.result.startsWith('http')) {
                        theDest = "http://" + theDest
                     }
                     window.location.replace(theDest);
                  }
                  else {
                     console.log('200 result, but bad: ', result)
                     setdisplayText('Error: internal error. We\'re sorry');
                  }

               }
               else if (fetchStatus === 400) {
                  console.log("400 error", result)
                  setdisplayText('Error: invalid URL');
               } 
               // else if (fetchStatus === 401) {
               //    console.log("401 error", result)
               // }
               // else if (fetchStatus === 469) {
               //   console.log("469 error", result)
               // }
               else if (fetchStatus === 400) {
                  console.log("400 error", result)
                  setdisplayText('Error: Internal Error. Please try again later');
               } 
               else {
                 throw new Error("Error signing up: ", fetchStatus)
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