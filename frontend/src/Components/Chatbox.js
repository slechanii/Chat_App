// Import React dependencies.
import React, { Component, useEffect, useMemo, useState } from 'react'
// Import the Slate editor factory.
import { createEditor } from 'slate'

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react'


export const Chatbox = () => {
    const editor = useMemo(() => withReact(createEditor()), [])
    // Add the initial value when setting up our state.
    const [value, setValue] = useState([
      {
        type: 'paragraph',
        children: [{ text: 'A line of text in a paragraph.' }],
      },
    ])
  
    return (
      <Slate
        editor={editor}
        value={value}
        onChange={newValue => setValue(newValue)}
      >
        <Editable />
      </Slate>
    )
  }


// import React, { Component } from 'react'
// import { Grid, Input, GridRow, Container, TextArea, Button, ButtonGroup, Icon } from 'semantic-ui-react'
// import Axios from 'axios';
// import configData from  "../config.json";

// export default class Chatbox extends Component {

//     state = {
//         messageContent : "",       
//     }

//     handleChange = (e, { name, value }) => this.setState({ [name]: value })

//     sendMessage = () => {
   
//         let message_to_send = {
       
//             content: this.state.messageContent,
//             sender_id: localStorage.getItem("user_id"),
//             destination_id: window.location.pathname.split('/')[2], 
//         }
//       Axios.post(configData.SERVER_URL + "messages/", message_to_send)
//            .then((res) => {
//                this.props.refreshMessages()
//                document.getElementById("textarea-chat").reset();
//                this.setState({messageContent:""})
//            })
//            .catch((err) => {
//                console.log(err)
//            })
//     }

//     render() {
//         return (
//             <Grid.Row className="chatbox-container">
//                 <Grid className="chatbox">
//                     <Grid.Row className="chatbox-textarea-row">
//                     <form className="unstyled" id="textarea-chat">
//                         <TextArea  name="messageContent" onChange={this.handleChange} placeholder="Send a message to #channel" className="chatbox-input"></TextArea>
//                     </form>
//                     </Grid.Row>
//                     <GridRow className="chatbox-formatting-row">
//                         <Button.Group>
//                             <Button icon>
//                                 <Icon name='bold' />
//                             </Button>
//                             <Button icon>
//                                 <Icon name='italic' />
//                             </Button>
//                             <Button icon>
//                                 <Icon name='strikethrough' />
//                             </Button>
//                             <Button icon>
//                                 <Icon name='code' />
//                             </Button>
//                             <Button icon>
//                                 <Icon name='ordered list' />
//                             </Button>
//                             <Button icon>
//                                 <Icon name='bulleted list' />
//                             </Button>
//                             <Button icon>
//                                 <Icon name='quote left' />
//                             </Button>
//                         </Button.Group>
                    
//                             <Button onClick={this.sendMessage} icon>
//                                 <Icon name='send' />
//                             </Button>
                       


//                     </GridRow>
//                 </Grid>
//             </Grid.Row>



//         )
//     }
// }
