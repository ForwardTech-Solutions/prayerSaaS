import React, { useEffect, useState } from 'react';
import { QRCode } from 'react-qrcode-logo';


 function QRImage(props) {

    useEffect(() => {

     }, [])

    return (
        <>
            <h3>QR Image</h3>
            <QRCode value={props.value} />
            <p style={{fontSize: '10px'}}>{props.value}</p>
        </>
    );
}

export default QRImage;