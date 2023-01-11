import React, {Component} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class AdminDeviceOperations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'', address:'', description:'', consumption:'',
            selectedDeviceDelete: '',
            selectedDeviceSearch:'', deviceList:[]
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDropdownChangeDelete = this.handleDropdownChangeDelete.bind(this);
    }

    componentDidMount() {
        fetch(
            'http://localhost:8080/device/findall',)
            .then(async response => {
                const devicesFromApi = await response.json();

                this.setState({
                    deviceList: devicesFromApi
                });
            })
            .catch(error => {
                console.log(error);
            });
    }
    async handleSubmit(event){
        event.preventDefault();
        await this.setState({
            name: event.target.elements.name.value,
            description: event.target.elements.description.value,
            address: event.target.elements.address.value,
            consumption: event.target.elements.consumption.value,

        })
        const data = {
            name: this.state.name,
            description: this.state.description,
            address: this.state.address,
            maxHourlyEnergyConsumption: this.state.consumption

        }

        console.log(data)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        if ( event.nativeEvent.submitter.innerText === "Add") {
            console.log(event.nativeEvent.submitter.innerText);
            fetch('http://localhost:8080/device/create', requestOptions)
                .then(
                    response => {if (response.status === 400) {
                        alert ('Device could not be added at this time!');}
                    else if (response.status === 201){
                        alert ('Device created successfully!');
                    }
                    });}
    }

    async handleDropdownChangeDelete(e) {
        await this.setState({selectedDeviceDelete: e.target.value});
    }
    async handleSubmitDelete(event) {
        event.preventDefault();
        const data = {
            name: this.state.selectedDeviceDelete
        }
        const requestOptions = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        };

        fetch('http://localhost:8080/device/delete/' + this.state.selectedDeviceDelete, requestOptions)
            .then(
                response => {
                    if (response.status === 200) {
                        alert('Device deleted!');
                    }
                });

    }
    async handleSubmitSearch(e) {
        return undefined;
    }
    render() {
        return (
            <div className = "form" align="center" >
                <h1>Add a new device </h1>
                <Form onSubmit={this.handleSubmit}>
                        <label>Name:
                            <input className="textfield"
                                   type="text"
                                   name="name"
                            />
                        </label>
                <br/>
                        <label>Description:
                            <input className="textfield"
                                   type="text"
                                   name="description"
                            />
                        </label>
                    <br/>
                        <label> Address:
                            <input className="textfield"
                                   type="text"
                                   name="address"
                            />
                        </label>
                    <br/>
                        <label>Maximum hourly consumption:
                            <input className="textfield"
                                   type="text"
                                   name="consumption"
                            />
                        </label>
                    <div>
                        <Button  className= "button2"  value= "customer" variant="secondary" size="lg" type="submit" >Add</Button> </div>
                </Form>

                <h1>Delete device </h1>
                <select onChange={this.handleDropdownChangeDelete}>
                    {this.state.deviceList.map(optn => (
                        <option>{optn.name}</option>
                    ))}
                </select>
                <br/>
                <Button className="button2" value="customer" variant="secondary" size="lg" type="submit"
                        onClick={(e) => this.handleSubmitDelete(e)}>Delete</Button>
                <br/>

                <h1>View devices</h1>
                <br/>
                <Button  className="button2"  value="customer" variant="secondary" size="lg" type="submit"
                         onClick={(e) => this.handleSubmitSearch(e)} href={"/viewdevices"}>Search</Button>

            </div>

        );
    }


}

export default AdminDeviceOperations;