import React, { Component } from 'react'
import { Divider } from 'semantic-ui-react';
import classNames from "classnames"

export default class DateSeparator extends Component {
    render() {
        let wrapper_classes = classNames(
            'date-separator-wrapper',
            {
                'yesterday-date': this.props.date === "Yesterday",
                'today-date': this.props.date === "Today",
                'other-date': this.props.date != "Yesterday" && this.props.date != "Today",
            }
        );
        return (
            <div className="date-separator-container">
         
                    <div className="divider-date-separator"></div>
                    <div className={wrapper_classes}>
                        <span className="date-separator-date">{this.props.date}</span>
                    </div>
                
            </div>
        )
    }
}
