import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react';

export default class Message extends Component {
    constructor(props) {
        super(props);
    }

    state = {

    }


    render() {

        return (

            <div className="message-row">

                <div className="message-left-col">
                    {this.props.showUsername === false &&
                        <span className="chat-message-side-time">6:33</span>
                    }
                    {this.props.showUsername === true &&
                        <img id="profile-img-chat-message" src="https://ca.slack-edge.com/T01GTD2333N-U01GJ5P688M-gb0c7d943951-48"></img> 

                    }
                </div>
                <div className="message-right-col">

                    {this.props.showUsername === true &&
                        <div className="chat-message-header">
                            <span className="chat-message-username">
                                slechanii
                        </span>
                            <span className="chat-message-time">
                                6:33 PM
                        </span>
                        </div>
                    }
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam semper dapibus nisl id feugiat. Donec sit amet lacus cursus, luctus velit sit amet, lobortis quam. Nullam ex velit, commodo at arcu quis, congue fringilla dolor. Phasellus mattis ipsum vitae eros aliquam eleifend. Mauris congue vitae ligula sed blandit. Mauris a scelerisque dolor. Vivamus molestie, magna eget efficitur fermentum, lectus arcu euismod est, id posuere risus tellus sed mi. Maecenas mollis purus id ante porttitor sodales. Etiam sodales pretium dolor, et luctus ligula feugiat rhoncus. Praesent vitae felis dui. In vestibulum et lorem a consectetur. Quisque finibus consequat leo a rutrum. Nullam erat risus, tempor a iaculis sed, molestie non felis. Nam lacinia dapibus ligula, a rhoncus ante congue vel. Phasellus tristique sollicitudin aliquet. Ut porttitor suscipit tellus non vulputate.
                    </div>
            </div>

        )
    }
}
