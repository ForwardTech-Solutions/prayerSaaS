import React from "react";
import {Button, Card,  InputGroup, FormControl} from "react-bootstrap";

const addButton = props => {
   

    return (
        
        <Card
                bg={'dark'} 
                style={{margin: 5}}
                >
                <Card.Body>

                    <InputGroup>
                    <FormControl
                        placeholder="Add a prayer..."
                        aria-label="newPrayerContent"
                        aria-describedby="basic-addon2"
                        value={props.InputValue}
                        onChange={props.onChangeFunction}
                        data-testid="AddPrayerButton_input_field"
                    />
                    <InputGroup.Append>
                        <Button 
                            variant="outline-secondary"
                            onClick={props.onClickFunction}
                            data-testid="button"
                        >
                        Create Prayer {props.inGroupName}      
                        </Button>
                    </InputGroup.Append>
                    </InputGroup>
                </Card.Body>
            </Card>
        
        );
  };

  
  const AddPrayerButton = addButton;
  export default AddPrayerButton