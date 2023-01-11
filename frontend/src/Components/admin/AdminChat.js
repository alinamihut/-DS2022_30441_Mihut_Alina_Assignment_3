import * as React from 'react';

import './admin-chat.css';
import {useState} from "react";
import {Message, Request} from "../../grpc/generated/protos/greetings_pb.js";
import {ChatServiceClient} from "../../grpc/generated/protos/greetings_pb_service.js";


const AdminChat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState({});
    const client = new ChatServiceClient('http://localhost:591');
    const adminName = localStorage.getItem('admin');
    const [clientName, setClientName] = useState('');
    const [clientNameIsSet, setClientNameBoolean] = useState( false);
    const [groupedMessages, setGroupedMessages] = useState({});

    const handleInputChange = (clientName) => (event) => {
        const newInput = { ...input };
        newInput[clientName] = event.target.value;
        setInput(newInput);
    }

    React.useEffect(() => {
        // Make a request for messages from the server
        const request = new Request;
        request.setUsername(adminName)
        const client = new ChatServiceClient('http://localhost:591');
        const receiveMessagesResponse = client.receiveMessages(request);
        receiveMessagesResponse.on('data', (response) => {
            if (response.getFrom() !== adminName && clientNameIsSet === false) {
                setClientName(response.getFrom());
                setClientNameBoolean(true)
            }
            console.log(response.getFrom())
            const newMessage = {
                sender: response.getFrom(),
                text: response.getText()
            };

            setGroupedMessages((prevGroupedMessages) => {
                const groupedMessages = { ...prevGroupedMessages };
                if (!groupedMessages[newMessage.sender]) {
                    groupedMessages[newMessage.sender] = [];
                }
                groupedMessages[newMessage.sender].push(newMessage);
                return groupedMessages;
            });

            //setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        return () => {
            receiveMessagesResponse.cancel();
        };
    } , []);

    let handleSubmit = async (clientName) =>  async (event) => {
        event.preventDefault();
        let request = new Message();
        request.setText(input[clientName]);
        request.setFrom('admin');
        request.setTo(clientName);
        setInput({...input, [clientName]: ""});
        try {
            const client = new ChatServiceClient('http://localhost:591');
            const response = await client.sendMessage(request, {});
            if (response.getMessage()) {
                const newMessage = {
                    sender: response.getMessage().getFrom(),
                    text: response.getMessage().getText()
                };
                setGroupedMessages((prevGroupedMessages) => {
                    const groupedMessages = {...prevGroupedMessages};
                    if (!groupedMessages[newMessage.sender]) {
                        groupedMessages[newMessage.sender] = [];
                    }
                    groupedMessages[newMessage.sender].push(newMessage);
                    return groupedMessages;
                });
            }
        } catch (err) {
            console.error(err);
        }
    }
            return (
                <div className="client-chat">
                    <h1>Admin Chat</h1>
                    <div>
                        <ul>
                            {Object.entries(groupedMessages).map(([clientName, messages], index) => (
                                <React.Fragment key={index}>
                                    <h2>Conversation with {clientName}</h2>
                                    <ul>
                                        {messages.map((message, index) => (
                                            <li key={index}
                                                className={message.sender === adminName ? 'admin-message' : 'client-message'}>
                                                {message.sender === adminName ? 'You: ' : `Client - ${clientName}: `}{message.text}
                                            </li>
                                        ))}
                                        <form onSubmit={(event) => handleSubmit(event, clientName)}>
                                            <input
                                                type="text"
                                                value={input[clientName] || ""}
                                                onChange={handleInputChange(clientName)}
                                                className="form-control"
                                                id="message"
                                                placeholder="Enter message"
                                            />
                                            <button type="submit">Send</button>
                                        </form>
                                    </ul>

                                </React.Fragment>
                            ))}


                        </ul>

                    </div>

                </div>
            );

        };
export default AdminChat;
