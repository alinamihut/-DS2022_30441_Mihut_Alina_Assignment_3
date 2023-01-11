import React, {Component} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import './Home.css';
import {Navigate} from "react-router";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '', password: '', clientLoggedIn:0, adminLoggedIn:0, role: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
     async handleSubmit(event){
        event.preventDefault();
        await this.setState({
            username: event.target.elements.username.value,
            password: event.target.elements.password.value,
        })
        const data = {
            username: this.state.username,
            password: this.state.password
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
                'Accept': 'application/json'},
            body: JSON.stringify(data)
        };

        if ( event.nativeEvent.submitter.innerText === "Login") {
            fetch('http://localhost:8080/user/login', requestOptions)
                .then(
                    async response => {
                        if (response.status === 400) {
                            alert('Wrong credentials!')
                        } else if (response.status === 200) {
                            const d = await response.json()
                            console.log(d)
                            if (d.role === 'admin') {
                                this.setState({adminLoggedIn: 1});

                            } else if (d.role === 'client') {
                                this.setState({clientLoggedIn: 1});
                            }
                        }
                    }
                        );
    }
    }

    render() {
        if (this.state.clientLoggedIn === 1){
            localStorage.setItem('client', this.state.username);
            return <Navigate to="/clientprofile"> </Navigate>
        }
        else if (this.state.adminLoggedIn === 1){
            localStorage.setItem('admin', this.state.username);

            return <Navigate to="/adminprofile"> </Navigate>
        }
        return (

            <div className="Login">
                <h1>  Log in </h1>
                <Form onSubmit={this.handleSubmit}>
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
                    <Button className= "button"  variant="light" size="lg" type="submit">Login</Button>
                </Form>
            </div>
        );
    }
}
export default Login;