import React from 'react';
import '../styles/MessagePage.css';
import axios from 'axios';
import StompJS from "stompjs";


class MessagePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vector: [
                {
                    userName: "Nume",
                    content: "Mesaj"
                }
            ],
            initialListArrived: false
        };

        this.stompClient = null;

        this.onConnected = this.onConnected.bind(this);
        this.onError = this.onError.bind(this);
        this.onMessageReceived = this.onMessageReceived.bind(this);
        this.getMessageValue = this.getMessageValue.bind(this);
    }


    onConnected() {

        alert('connected');

        // Subscribe to the Public Topic
        this.stompClient.subscribe('/topic/public', this.onMessageReceived);

        // Tell your username to the server
        this.stompClient.send(
            "/app/chat.addUser",
            {},
            JSON.stringify({userName: this.props.userName, type: 'JOIN'})
        );

    }

    onMessageReceived(payload) {
        let message = JSON.parse(payload.body);

        if (message.type === 'CHAT') {
            let newVec = this.state.vector;

            newVec.push(message);
            this.setState({
                vector:newVec
            });
        }
    }

    onError(error) {
        alert('error connecting...');
    }

    /* luam mesajul din casuta de text si il trimitem prin clientul stomp catre server */
    getMessageValue(event) {
        let elem = document.getElementById("message").value;

        let chatMessage = {
            userName: this.props.userName,
            content: elem,
            type: 'CHAT'
        };

        document.getElementById("message").value = "";
        event.preventDefault();

        this.stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
    }

    componentDidMount() {
        // TODO pt docker
        let url = 'http://127.0.0.1:8080/api/getmessages'

        axios
            .get(url, {})
            .then(response => {

                this.setState({
                    vector: response.data,
                    initialListArrived: true
                })

                // TODO pt docker
                this.stompClient = StompJS.client("ws://127.0.0.1:8080/ws")
                this.stompClient.connect({}, this.onConnected, this.onError);

            })
            .catch(() => {
                console.log('Could not retrieve old messages')
            });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let obj = document.getElementById("messageList");
        obj.scrollTop = obj.scrollHeight;
    }

    render () {
        return (
            <div className="chat-page">
                <div className="chat-container">
                    <div className="chat-header">
                        <h2>Welcome to the chat, {this.props.userName} :)</h2>
                    </div>

                    <ul id="messageList" className="message-area">
                        {
                            this.state.vector.map((elem, k) => {
                                return (
                                    <li key={k} className="message">
                                        <span className="message-span">
                                            {elem.userName}
                                        </span>
                                        <p className="message-paragraph">
                                            {elem.content}
                                        </p>
                                    </li>
                                );
                            })
                        }


                    </ul>

                    <form id="messageForm" name="messageForm" nameform="messageForm" className="message-form">
                        <div className="form-group">
                            <div className="input-group clearfix">
                                <input type="text" id="message" placeholder="Type your message..." className="input-text">
                                </input>

                                <button type="submit" className="send-button" onClick={this.getMessageValue}>
                                    Send
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default MessagePage;