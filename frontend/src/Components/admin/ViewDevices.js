import React, {Component} from "react";
import Button from "react-bootstrap/Button";

class ViewDevices extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idDevice:'', name:'', address:'', description:'', maxHourlyEnergyConsumption:'',
            selectedDeviceEdit:'',
            devicesList:[]
        }

        this.handleDropdownChangeEdit = this.handleDropdownChangeEdit.bind(this);
        this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
    }
    componentDidMount() {
        fetch(
            'http://localhost:8080/device/findall',)
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

    async handleDropdownChangeEdit(e) {
        await this.setState({selectedDeviceEdit: e.target.value});
        console.log(this.state.selectedDeviceEdit)

    }

    async handleSubmitEdit(){
        localStorage.setItem('deviceToEdit', this.state.selectedDeviceEdit);
        console.log(localStorage.getItem('deviceToEdit'))
    }
    render() {
        console.log(this.state.devicesList)
        return (
            <div className="App" className="centered">
                <h1> Device details </h1>
                <table className="textfield">

                    <thead>
                    <tr>
                        <th>Id Device</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Address</th>
                        <th>Maximum Hourly Energy Consumption</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.devicesList.map((item, i) => (
                        <tr key={i}>
                            <td>{item.idDevice}</td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.address}</td>
                            <td>{item.maxHourlyEnergyConsumption}</td>
                            <td>{item.u}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <h1>Edit a device </h1>
                <select onChange={this.handleDropdownChangeEdit}>
                    {this.state.devicesList.map(optn => (
                        <option>{optn.name}</option>
                    ))}
                </select>
                <br/>
                <div>
                    <Button  className="button2"  value="customer" variant="secondary" size="lg" type="submit"
                             href={"/editdevice"} onClick={(e) => this.handleSubmitEdit(e)}>Edit</Button>
                </div>
            </div>

        );
    }


}
export default ViewDevices;