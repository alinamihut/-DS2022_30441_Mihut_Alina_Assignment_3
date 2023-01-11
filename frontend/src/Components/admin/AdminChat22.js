import * as React from 'react';

import './admin-chat.css';
import {useState} from "react";
import {Message, Request} from "../../grpc/generated/protos/greetings_pb.js";
import {ChatServiceClient} from "../../grpc/generated/protos/greetings_pb_service.js";


const AdminChat22 = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const client = new ChatServiceClient('http://localhost:591');
    const adminName = localStorage.getItem('admin');
    const [clientName, setClientName] = useState('');


    React.useEffect(() => {
        // Make a request for messages from the server
        const request = new Request;
        request.setUsername(adminName)
        const client = new ChatServiceClient('http://localhost:591');
        const receiveMessagesResponse = client.receiveMessages(request);
        receiveMessagesResponse.on('data', (response) => {
            if (response.getFrom() !== adminName && clientName ==='') setClientName(response.getFrom());
            console.log(clientName)
            const newMessage = {
                sender: response.getFrom(),
                text: response.getText()
            };
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        return () => {
            receiveMessagesResponse.cancel();
        };
    } , []);

    let handleSubmit =  (event) => {
        event.preventDefault();
        let request = new Message();
        request.setText(input);
        request.setFrom(adminName)
        request.setTo(clientName)

        const client = new ChatServiceClient('http://localhost:591');
        /*
        client.sendMessage(request, {}, (err, response) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(response)
            const newMessage = response.getMessage().getText()
            setMessages([...messages, newMessage]);
        });

         */
        client.sendMessage(request, {}, (err, response) => {
            if (err) {
                console.error(err);
                return;
            }

            // If the send message request was successful, update the messages list
            const newMessage = {
                sender: response.getMessage().getFrom(),
                text: response.getMessage().getText()
            };
            if (newMessage.sender !== adminName) {
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            }
            // setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

    };


    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    return (
        <div className="client-chat">
            <h1>Admin Chat</h1>


            <ul>
                {messages.map((message, index) => (
                    <li key={index} className={message.sender === adminName ? 'admin-message' : 'client-message'}>
                        {message.sender === adminName ? 'You: ' : `Client - ${clientName}: `}{message.text}
                    </li>
                ))}
            </ul>

            <form onSubmit={handleSubmit}>
                <input value={input} onChange={handleInputChange} />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default AdminChat22;
