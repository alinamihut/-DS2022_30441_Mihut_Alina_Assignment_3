import React, {Component} from "react";
import Button from "react-bootstrap/Button";

class ViewUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '', lastName: '', username: '', password: '', role:['ADMINISTRATOR', 'CLIENT'],
            selectedUserEdit:'',
             usersList:[], deviceList:[]
        }

        this.handleDropdownChangeEdit = this.handleDropdownChangeEdit.bind(this);
        this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
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
    }

    async handleDropdownChangeEdit(e) {
        await this.setState({selectedUserEdit: e.target.value});
        console.log(this.state.selectedUserEdit)

    }

    async handleSubmitEdit(){
        localStorage.setItem('userToEdit', this.state.selectedUserEdit);
        console.log(localStorage.getItem('userToEdit'))
    }
    render() {
        return (
            <div className="App" className="centered">
                <h1> User details </h1>
                <table className="textfield">

                <thead>
                <tr>
                    <th>Id User</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                    <th>Role</th>
                    <th>Devices </th>
                </tr>
                </thead>
                <tbody>

                {this.state.usersList.map((item, i) => (
                    <tr key={i}>
                        <td>{item.idUser}</td>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.username}</td>
                        <td>{item.role}</td>
                        <td>{this.state.usersList[i].devices.map((item) =>  <li> {item.name}</li>) } </td>
                    </tr>
                ))}
                </tbody>
            </table>

                <h1>Edit user </h1>
                <select onChange={this.handleDropdownChangeEdit}>
                    {this.state.usersList.map(optn => (
                        <option>{optn.username}</option>
                    ))}
                </select>
                <br/>
                <div>
                <Button  className="button2"  value="customer" variant="secondary" size="lg" type="submit"
                         href={"/edituser"} onClick={(e) => this.handleSubmitEdit(e)}>Edit</Button>
                </div>
            </div>

        );
    }


}
export default ViewUsers;