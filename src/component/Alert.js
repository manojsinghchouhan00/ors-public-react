import React, { Component } from 'react'

export default class Alert extends Component {
    render() {
        
        return (
            <div>
                { this.props.alert &&
                    <div className="alert alert-primary" role="alert" style={{ marginTop: "70px", height: '60px' }}>
                        A simple primary alert—check it out!
                    </div>
                }
            </div>
        )
    }
}
