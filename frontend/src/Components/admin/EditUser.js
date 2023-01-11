import React, {Component} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class EditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:'', firstName: '', lastName: '', username: localStorage.getItem('userToEdit'), password: '',roleFromApi: '',
            role:['ADMINISTRATOR', 'CLIENT'], devices:[]
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
        this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
        this.handleChangeLastName = this.handleChangeLastName.bind(this);
        this.handleChangeUsername = this.handleChangeUsername.bind(this);

    }

    componentDidMount() {
        fetch(
            'http://localhost:8080/user/finduser/' + this.state.username)
            .then(async response => {
                const userFromApi = await response.json();

                this.setState({
                    id: userFromApi.idUser,
                    firstName:userFromApi.firstName,
                    lastName: userFromApi.lastName,
                    password:userFromApi.password,
                    roleFromApi: userFromApi.role,
                    devices: userFromApi.devices
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
            firstName: event.target.elements.firstName.value,
            lastName: event.target.elements.lastName.value,
            username: event.target.elements.username.value,
        })
        const data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            username: this.state.username,
            password: this.state.password,
            role: this.state.selectedRole

        }

        console.log(data)
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        if ( event.nativeEvent.submitter.innerText === "Save") {
            console.log(event.nativeEvent.submitter.innerText);
            fetch('http://localhost:8080/user/update/' + this.state.id, requestOptions)
                .then(
                    response => {if (response.status === 400) {
                        alert ('Username already exists!');}
                    else if (response.status === 201){
                        alert ('User updated successfully!');
                    }
                    });}
    }

    async handleDropdownChange(e1) {
        this.setState({ selectedRole: e1.target.value });
        console.log(e1.target.value)
    }
    async handleChangeFirstName (e){
        this.setState({firstName: e.target.value});
    }
    async handleChangeLastName (e2){
        this.setState({lastName: e2.target.value});
    }
    async handleChangeUsername (e3){
        this.setState({username: e3.target.value});
    }

    render() {
        return (
            <div className = "form" align="center" >
                <h1>Editing user {localStorage.getItem('userToEdit')} </h1>
                <Form onSubmit={this.handleSubmit}>
                    <div>
                        <label>First Name:
                            <input className="textfield"
                                   type="text"
                                   name="firstName"
                                   value ={this.state.firstName}
                                   onChange={this.handleChangeFirstName}
                            />
                        </label>
                    </div>
                    <div>
                        <label>Last Name:
                            <input className="textfield"
                                   type="text"
                                   name="lastName"
                                   value ={this.state.lastName}
                                   onChange={this.handleChangeLastName}
                            />
                        </label>
                    </div>
                    <div>
                        <label> Username:
                            <input className="textfield"
                                   type="text"
                                   name="username"
                                   value ={this.state.username}
                                   onChange={this.handleChangeUsername}
                            />
                        </label>
                    </div>
                    <h6> Current role: {this.state.roleFromApi}</h6>
                    <label> Role: </label>
                    {
                        <select className="textfield"  onChange={this.handleDropdownChange}>
                            {this.state.role.map(optn => (
                                <option>{optn}</option>
                            ))}

                        </select>
                    }
                    <div>
                        <Button  className= "button2"  value= "customer" variant="secondary" size="lg" type="submit" >Save</Button> </div>
                </Form>
            </div>
        );
    }
}
export default EditUser;