import React from 'react';
import '../styles/Welcome.css';

class Welcome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };

        this.submitAction = this.submitAction.bind(this);
    }

    submitAction(e) {
        this.props.changePage(document.getElementById("name").value);
        e.preventDefault();
    }

    render () {
        return (
            <div>
                <div className="username-box">
                    <h1 className="title">Choose a username</h1>
                    <form id="usernameForm" name="usernameForm">
                        <div className="form-group">
                            <input type="text" id="name" placeholder="Username" autoComplete="off"
                                   className="form-control" />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="form-button" onClick={this.submitAction}>Start Chatting</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Welcome;