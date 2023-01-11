import '../../App.css';
import React, {Component} from "react";
import Button from "react-bootstrap/Button";
import '../common/Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Message} from "../../grpc/generated/proto/greetings_pb.d.ts";
import {ChatServiceClient} from "../../grpc/generated/proto/greetings_pb_service.d.ts";
import { useNavigate } from 'react-router-dom';
const ClientProfile = () => {
    const navigate = useNavigate();

    /*
    const sendMessage1 = (event) => {
        let request = new Message();
        //request.setText('sss');
        //request.setUser('DDD');

        let client = new ChatServiceClient('http://localhost:591');
        let call = client.sendMessage((err, response) => {
            console.log({ err, response });
        });

        call.write(request);
        call.end();
    };

     */

    const handleButtonClick = () => {
        navigate('/clientchat');
    };

        return (

            <div  className="App" class="centered">
                <h1> Client Profile <br /> </h1>
                <h2 >Welcome, {localStorage.getItem('client')}! <br /> </h2>
                <div> <Button className="button2" value="customer" variant="light" size="lg" type="submit" href={"/clientviewdevices"}>View your device </Button> </div>
                <div>
                    <Button className="button2" variant="light" onClick={() => navigate('/clientchat')}>Chat</Button>
                </div>
            </div>
        )

}
export default ClientProfile;