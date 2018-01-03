import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel, InputGroup } from "react-bootstrap";
import {graphql, commitMutation, createFragmentContainer} from 'react-relay';
import {ConnectionHandler} from 'relay-runtime';
import createNoteMutation from "../mutations/createNote";


class NoteInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {noteText: ''};
  
  }

  commitCreateNote(noteText, author, timeStamp) {
    var self=this;
    return commitMutation(
      self.props.relay.environment,
      {
        mutation: createNoteMutation,
        variables: {
          input: {noteText: noteText, author: author, timeStamp: timeStamp},
        },
        onCompleted: (response, errors)=>{
          self.setState({noteText: ''})
        },
        
        updater: (store, data) => {
            // var storeRecord = store.getRootField("createNote")
            // var notes=store.getRoot().getLinkedRecords("getNotes");
            // var last = notes[notes.length-1];
            // const conn = ConnectionHandler.getConnection(
            //   last,
            //   'getNotes',
            // );
            // ConnectionHandler.insertEdgeAfter(last, storeRecord);
        },

      }
    );
}

  handleChange(event) {
    this.setState({noteText: event.target.value})
  }

  handleKeypress (event){
      if (event.key === 'Enter'){
        var date = new Date();
        var timeStamp = (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear() + ' ' + date.getHours() + ":" + date.getMinutes();
        this.commitCreateNote( this.state.noteText, "SH", timeStamp )      
      }
      
  }

  render() {
    
    return (
          <span> 
              <FormGroup bsSize="large">
                <FormControl 
                  id="notesInputTextArea"
                  componentClass="textarea" 
                  placeholder="Enter your note" 
                  autoFocus 
                  value={this.state.noteText}
                  onChange={this.handleChange.bind(this)}
                  onKeyPress={this.handleKeypress.bind(this)}> 
              </FormControl>
              </FormGroup> 
          </span>     
    );
  }
}
 

 export default createFragmentContainer(NoteInput, {
  noteId: graphql`
    fragment noteInput_noteId on Note {
      id
      }
  `,
});
