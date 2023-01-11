import React, {Component} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class AdminUserOperations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '', lastName: '', username: '', password: '', role:['ADMINISTRATOR', 'CLIENT'],
            selectedRole:'',
            selectedUserDelete: '',
            selectedUserSearch:'', usersList:[]
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
        this.handleDropdownChangeDelete = this.handleDropdownChangeDelete.bind(this);
    }

    componentDidMount() {
        fetch(
            'http://localhost:8080/user/find')
            .then(async response => {
                const usersFromApi = await response.json();

                this.setState({
                    usersList: usersFromApi

                });
            })
            .catch(error => {
                console.log(error);
            });
        console.log(this.state.usersList)
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
    console.log(e1.target.value)
    }

    async handleDropdownChangeDelete(e) {
        await this.setState({selectedUserDelete: e.target.value});
    }
    async handleSubmitDelete(event) {
        event.preventDefault();
        const data = {
            username: this.state.selectedUserDelete
        }
        const requestOptions = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        };
        if (this.state.selectedUserDelete === localStorage.getItem('admin')){
            alert('You cannot delete the user that is logged in!');
        }
        else {
            fetch('http://localhost:8080/user/delete/' + this.state.selectedUserDelete, requestOptions)
                .then(
                    response => {
                        if (response.status === 200) {
                            alert('User deleted!');
                        }
                    });
        }
    }
    async handleSubmitSearch(e) {
        return undefined;
    }
    render() {
        return (
            <div className = "form" align="center" >
                <h1>Add a new user </h1>
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

                <h1>Delete user </h1>
                <select onChange={this.handleDropdownChangeDelete}>
                    {this.state.usersList.map(optn => (
                        <option>{optn.username}</option>
                    ))}
                </select>
                <br/>
                <Button className="button2" value="customer" variant="secondary" size="lg" type="submit"
                onClick={(e) => this.handleSubmitDelete(e)}>Delete</Button>
                <br/>

                <h1>View users</h1>
                <br/>
                <Button  className="button2"  value="customer" variant="secondary" size="lg" type="submit"
                        onClick={(e) => this.handleSubmitSearch(e)} href={"/viewusers"}>Search</Button>

            </div>

        );
    }


}

export default AdminUserOperations;