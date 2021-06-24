import React from "react";
import {Nav} from "react-bootstrap";
import './Dashboard.css'

const Side = props => {
   

    return (
        <>

            <Nav 
                className="col-md-12 d-none d-md-block bg-dark sidebar"
                activeKey="/home"
                onSelect={selectedKey => alert(`selected ${selectedKey}`)}
            >
                    <div className="sidebar-sticky"></div>
                

                {props.children}                     
                      
            </Nav>
        </>
        );
  };

//   function returnIfExists(first, backup) {
//     if (first)
//       return first
//     else 
//       return backup
//   }

  
  const Sidebar = Side;
  export default Sidebar