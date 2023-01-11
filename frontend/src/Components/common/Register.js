import React, {Component} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import './Home.css';
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '', lastName: '', username: '', password: '', role:['ADMINISTRATOR', 'CLIENT'],
            selectedRole:''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
    }
    async handleSubmit(event){
        event.preventDefault();
        await this.setState({
            firstName: event.target.elements.firstName.value,
            lastName: event.target.elements.lastName.value,
            username: event.target.elements.username.value,
            password: event.target.elements.password.value,

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
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        if ( event.nativeEvent.submitter.innerText === "Add") {
            console.log(event.nativeEvent.submitter.innerText);
            fetch('http://localhost:8080/user/create', requestOptions)
                .then(
                    response => {if (response.status === 400) {
                        alert ('Username already exists!');}
                    else if (response.status === 201){
                        alert ('User created successfully!');
                    }
                    });}
    }

    async handleDropdownChange(e1) {
        await this.setState({ selectedRole: e1.target.value });
    }
    render() {
        return (
            <div className = "form" align="center" >
                <h1>  Sign up </h1>
                <Form onSubmit={this.handleSubmit}>
                    <div>
                        <label>First Name:
                            <input className="textfield"
                                   type="text"
                                   name="firstName"
                            />
                        </label>
                    </div>
                    <div>
                        <label>Last Name:
                            <input className="textfield"
                                   type="text"
                                   name="lastName"
                            />
                        </label>
                    </div>
                    <div>
                        <label> Username:
                            <input className="textfield"
                                   type="text"
                                   name="username"
                            />
                        </label>
                    </div>
                    <div>
                        <label>Password:
                            <input className="textfield"
                                   type="password"
                                   name="password"
                            />
                        </label>
                    </div>
                    <label> Role: </label>
                    {
                        <select className="textfield" onChange={this.handleDropdownChange}>
                            {this.state.role.map(optn => (
                                <option>{optn}</option>
                            ))}
                        </select>
                    }
                    <div>
                        <Button  className= "button2"  value= "customer" variant="secondary" size="lg" type="submit" >Add</Button> </div>
                </Form>
                <Button  className= "button2"  variant="secondary"  size="lg" type="submit" href={"/login"} >
                    Login Page
                </Button>
            </div>

        );
    }
}
export default Register;