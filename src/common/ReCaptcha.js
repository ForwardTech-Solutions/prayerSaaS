
//      NOTE:  I made this its own compontent because i didn't want to write the api key a lot

import React, { useEffect, useState } from 'react';

import ReCAPTCHA from "react-google-recaptcha";


 function ReCaptchaComp(props) {

    //var _key = process.env.REACT_APP_RECAPTCHA_SITE_KEY
    const _key = window.Cypress ? '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI' : 
    process.env.REACT_APP_RECAPTCHA_SITE_KEY;

    useEffect(() => {
        
     }, [])

  return (
        <ReCAPTCHA
            sitekey={_key}
            onChange={props.onChange}
            theme = "dark"
        />
    );
}

export default ReCaptchaComp;