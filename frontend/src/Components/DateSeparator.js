import React, { Component } from 'react'
import { Divider } from 'semantic-ui-react';

export default class DateSeparator extends Component {
    render() {
        return (
            <div className="date-separator-container">
                {/* <Divider></Divider> */}
                <div className="divider-date-separator"></div>
                <div className="date-separator-wrapper">
                    <span className="date-separator-date">{this.props.date}</span>
                </div>
            </div>
        )
    }
}
