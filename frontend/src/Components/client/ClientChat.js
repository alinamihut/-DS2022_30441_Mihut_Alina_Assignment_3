// @ts-ignore
//import React, { useState } from 'react';
import * as React from 'react';

import './client-chat.css';
import {useState} from "react";
import {Message, Request} from "../../grpc/generated/protos/greetings_pb.js";
import {ChatServiceClient} from "../../grpc/generated/protos/greetings_pb_service.js";


const ClientChat= () => {

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const clientName = localStorage.getItem('client');

    React.useEffect(() => {
            // Make a request for messages from the server
            const request = new Request;
            request.setUsername(clientName)
            //const initialMessages = [];
            const client = new ChatServiceClient('http://localhost:591');
            const receiveMessagesResponse = client.receiveMessages(request);
            console.log(receiveMessagesResponse)
        receiveMessagesResponse.on('data', (response) => {
            const newMessage = {
                sender: response.getFrom(),
                text: response.getText()

            }; console.log(newMessage.text)
            //initialMessages.push(newMessage);
           // setMessages((prevMessages) => [...prevMessages, newMessage]);
            setMessages(prevMessages => [...prevMessages, newMessage]);
        });


        //setMessages(initialMessages);
        return () => {
            receiveMessagesResponse.cancel();
        };
        } , []);


    let handleSubmit =  (event) => {
        event.preventDefault();
        let request = new Message();
        request.setText(input);
        request.setFrom(localStorage.getItem('client'))
        request.setTo('admin')

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
            if (newMessage.sender !== clientName) {
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            }
            //setMessages((prevMessages) => [...prevMessages, newMessage]);
            //setMessages(prevMessages => [...prevMessages, newMessage]);
        });

    };

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    return (
        <div className="client-chat">
            <h1>  Client Chat <br /> </h1>

            <ul>
                {messages.map((message, index) => (
                    <li key={index} className={message.sender === clientName ? 'client-message' : 'admin-message'}>
                        {message.sender === clientName ? 'You: ' : 'Admin: '}{message.text}
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

export default ClientChat;
