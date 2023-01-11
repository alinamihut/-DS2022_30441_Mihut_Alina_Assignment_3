import React, {Component} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class EditDevice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:'', address:'', description:'', maxConsumption:'', name: localStorage.getItem('deviceToEdit'),
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeAddress = this.handleChangeAddress.bind(this);
        this.handleChangeMaxConsumption = this.handleChangeMaxConsumption.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);

    }

    componentDidMount() {
        fetch(
            'http://localhost:8080/device/find/' + localStorage.getItem('deviceToEdit'))
            .then(async response => {
                const deviceFromApi = await response.json();

                this.setState({
                    id: deviceFromApi.idDevice,
                    name:deviceFromApi.name,
                    address: deviceFromApi.address,
                    description:deviceFromApi.description,
                    maxConsumption: deviceFromApi.maxHourlyEnergyConsumption,
                });

                console.log(this.state.roleFromApi)
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
            maxConsumption: event.target.elements.maxConsumption.value
        })
        const data = {
            name: this.state.name,
            description: this.state.description,
            address: this.state.address,
            maxHourlyEnergyConsumption: this.state.maxConsumption
        }

        console.log(data)
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        if ( event.nativeEvent.submitter.innerText === "Save") {
            console.log(event.nativeEvent.submitter.innerText);
            fetch('http://localhost:8080/device/update/' + this.state.id, requestOptions)
                .then(
                    response => {if (response.status === 400) {
                        alert ('Device could not be updated');}
                    else if (response.status === 201){
                        alert ('Device updated successfully!');
                    }
                    });}
    }

    async handleChangeName (e){
        this.setState({name: e.target.value});
    }
    async handleChangeDescription (e2){
        this.setState({description: e2.target.value});
    }
    async handleChangeAddress(e3){
        this.setState({address: e3.target.value});

    }
    async handleChangeMaxConsumption(e1){
        if (isNumber(e1.target.value)){
            this.setState({maxConsumption: e1.target.value});
        }
        else { alert("Please input a valid number!")}

    }
    render() {
        return (
            <div className = "form" align="center" >
                <h1>Editing device {localStorage.getItem('deviceToEdit')} </h1>
                <Form onSubmit={this.handleSubmit}>
                    <label>Name:
                        <input className="textfield"
                               type="text"
                               name="name"
                               value={this.state.name}
                               onChange={this.handleChangeName}
                        />
                    </label>
                    <br/>
                    <label>Description:
                        <input className="textfield"
                               type="text"
                               name="description"
                               value={this.state.description}
                               onChange={this.handleChangeDescription}
                        />
                    </label>
                    <br/>
                    <label> Address:
                        <input className="textfield"
                               type="text"
                               name="address"
                               value={this.state.address}
                               onChange={this.handleChangeAddress}
                        />
                    </label>
                    <br/>
                    <label>Maximum hourly consumption:
                        <input className="textfield"
                               type="text"
                               name="maxConsumption"
                               value={this.state.maxConsumption}
                               onChange={this.handleChangeMaxConsumption}
                        />
                    </label>
                    <div>
                        <Button  className= "button2"  value= "customer" variant="secondary" size="lg" type="submit" >Save</Button> </div>
                </Form>
            </div>
        );
    }
}
export default EditDevice;

function isNumber(str) {
    if (str.trim() === '') {
        return false;
    }
    return !isNaN(str);
}