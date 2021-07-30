import { reduceRight } from 'lodash';
import React, { useEffect, useState } from 'react';
import {Row, Col} from 'react-bootstrap';

import QRImage from './QRImage'

 function QRObject(props) {

    const [redirectID, setredirectID] = useState('');
    const [feedback, setfeedback] = useState('');

    useEffect(() => {
        function setRedirectIDfromDestination_usingAPI(destination) {
            console.log("Destination: " + destination);

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");


            var requestOptions = {
                method: 'POST',
                redirect: 'follow',
                mode: 'cors',
                headers: myHeaders,
                body: JSON.stringify({
                    "destination": destination
                }),
              };
            

              fetch("https://wdq8s7zbcd.execute-api.us-east-1.amazonaws.com/dev/CreateAndOrReturn", requestOptions)
                .then(response => response.text())
                .then(result => {
                    console.log("QRObject fetch result: " + result);
                    setredirectID(result.replaceAll('"', ''));
                })
                .catch(error => {
                    console.log("QRObject fetch error: " + error);
                    setfeedback("error: " + error);
                
                });

        }
        //find the key for the given destination
        setRedirectIDfromDestination_usingAPI(props.destination);
            //hit the API on the CreateAndOrReturn end point and set redirectID to the result
     }, [])

    return (
        <>
        {feedback.length < 1 ?
            <>
            { redirectID.length > 0 ?
            
                //if and ID is returned (aka successful)
                <>
                    <h1>QR Object</h1>
                    <QRImage value={process.env.REACT_APP_BASE_URL + '/Redirect/' + redirectID} />
                </>
                :
                <> </>
            }
            </>
            :   //otherwise, show error and feedback
            <>
                <h2 style={{color:'red'}}>QRObject error</h2>
                <p>{feedback}</p>
            </>
        }

        </>

 
        //TO DO: right now, this just returns the value of the destination.
        //I need to add a new object (Maybe QRObject) that will check the passed value against the key/destination microservice and create a new value if needed.  Then that object will call this QRImage

        //   - when a page like email groups wants a QR code, it request that image by giving QRObject a destination.
        //   - QRObject wants to take advantage of the (dumb) redirect page.  QR wants to return an image that is a link to a specific redirect page (saas.com/redirect/a1v2b3e4w5).  That redirect page will simply check the Dict API send visitors to the respective destination.
        //  - So QRObject will look in the Dict API to see if that destination already has a key, if it does, use it in the image.  Otherwise, make a new key and use that in the Image
    );
}

export default QRObject;