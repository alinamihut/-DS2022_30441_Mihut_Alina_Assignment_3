import React, {Component} from "react";
import Button from "react-bootstrap/Button";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

class ClientViewDevices extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'', address:'', description:'', maxHourlyEnergyConsumption:'',
            devicesList:[], selectedDevice:'', messages:null
        }

        this.handleDropdownChange = this.handleDropdownChange.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);
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
            'http://localhost:8080/device/findbyclient/' + localStorage.getItem('client'))
            .then(async response => {
                const devicesFromApi = await response.json();
                this.setState({
                    devicesList: devicesFromApi
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    async handleDropdownChange(e) {
        await this.setState({selectedDevice: e.target.value});

    }

    async handleSubmit(){
        localStorage.setItem('deviceToView', this.state.selectedDevice);
        console.log(localStorage.getItem('deviceToView'))
    }
    render() {
        return (
            <div className="App" className="centered">
                <h1> Devices for client {localStorage.getItem('client')}</h1>
                <table className="textfield">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Address</th>
                        <th>Maximum Hourly Energy Consumption</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.devicesList.map((item, i) => (
                        <tr key={i}>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.address}</td>
                            <td>{item.maxHourlyEnergyConsumption}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <br/>
                <h1> View energy consumption for device </h1>
                <select onChange={this.handleDropdownChange}>
                    {this.state.devicesList.map(optn => (
                        <option>{optn.name}</option>
                    ))}
                </select>
                <br/>
                <div>
                    <Button  className="button2"  value="customer" variant="secondary" size="lg" type="submit"
                             href={"/viewenergyconsumption"} onClick={(e) => this.handleSubmit(e)}>View</Button>
                </div>
                <div>
                    {!this.state.messages ? <h3>Loading...</h3> :
                        <h2>{this.state.messages}</h2> }
                </div>
            </div>

        );
    }


}
export default ClientViewDevices;