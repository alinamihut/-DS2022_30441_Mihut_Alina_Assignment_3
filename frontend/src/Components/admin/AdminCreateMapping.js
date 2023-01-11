import React, {Component} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class AdminCreateMapping extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDevice: '',
            selectedUser:'', usersList:[], deviceList:[]
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDropdownChangeUser = this.handleDropdownChangeUser.bind(this);
        this.handleDropdownChangeDevice = this.handleDropdownChangeDevice.bind(this);
    }
    componentDidMount() {
        fetch(
            'http://localhost:8080/user/find',)
            .then(async response => {
                const usersFromApi = await response.json();

                this.setState({
                    usersList: usersFromApi
                });
            })
            .catch(error => {
                console.log(error);
            });

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
        const data = {
            deviceName: this.state.selectedDevice,
            username: this.state.selectedUser,
        }

        console.log(data)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        if ( event.nativeEvent.submitter.innerText === "Create") {
            fetch('http://localhost:8080/device/adduser', requestOptions)
                .then(
                    response => {if (response.status === 400) {
                        alert ('Mapping could not be created!');}
                    else if (response.status === 201){
                        alert ('Mapping created successfully!');
                    }
                    });
        }
    }

    async handleDropdownChangeUser(e1) {
        await this.setState({ selectedUser: e1.target.value });
        console.log(e1.target.value)
    }

    async handleDropdownChangeDevice(e) {
        await this.setState({selectedDevice: e.target.value});
    }
    render() {
        return (
            <div className = "form" align="center" >
                <h1>Create user-device mapping</h1>
                <Form onSubmit={this.handleSubmit}>
                    <h3> Select a user </h3>

                        <select className="textfield" onChange={this.handleDropdownChangeUser}>
                            {this.state.usersList.map(optn => (
                                <option>{optn.username}</option>
                            ))}

                        </select>

                    <h3> Select a device </h3>
                    <select className="textfield" onChange={this.handleDropdownChangeDevice}>
                        {this.state.deviceList.map(optn => (
                            <option>{optn.name}</option>
                        ))}
                    </select>
                    <div>
                        <Button  className= "button2"  value= "customer" variant="secondary" size="lg" type="submit" >Create</Button> </div>
                </Form>
            </div>

        );
    }
}
export default AdminCreateMapping;