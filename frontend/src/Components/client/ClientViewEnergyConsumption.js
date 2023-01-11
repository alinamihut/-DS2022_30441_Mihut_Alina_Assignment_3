import React, {Component} from "react";
import Button from "react-bootstrap/Button";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
class ClientViewEnergyConsumption extends Component {
    constructor(props) {
        super(props);
        this.state = {
            measurementsFromApiList:[], messages: null
        }


    }

    componentDidMount() {

        let usr = '/user/' + localStorage.getItem('client') + '/reply'
        var socket = new SockJS('http://localhost:8080/ws');
        let stompClient = Stomp.over(socket);
        stompClient.connect({}, frame => {
             stompClient.subscribe(usr, message => {
                 console.log(message.body);
                 this.setState({messages: message.body})

            });
        });

        fetch(
            'http://localhost:8080/energyconsumption/findbydevice/' + localStorage.getItem('deviceToView'))
            .then(async response => {
                const measurementsFromApi = await response.json();
                this.setState({
                    measurementsFromApiList: measurementsFromApi
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="App" className="centered">
                <h1> Energy consumption for device -  {localStorage.getItem('deviceToView')}</h1>
                <table className="textfield">
                    <thead>
                    <tr>
                        <th>Timestamp</th>
                        <th>Energy Consumption </th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.measurementsFromApiList.map((item, i) => (
                        <tr key={i}>
                            <td>{item.timestamp}</td>
                            <td>{item.consumption}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <br/>
                <div>
                    {!this.state.messages ? <h3>Loading...</h3> :
                        <h2>{this.state.messages}</h2> }
                </div>
            </div>

        );
    }


}
export default ClientViewEnergyConsumption;