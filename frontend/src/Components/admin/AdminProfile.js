import '../../App.css';
import React, {Component} from "react";
import Button from "react-bootstrap/Button";

import '../common/Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from "react-router-dom";


const AdminProfile = () => {
    const navigate = useNavigate();

        return (
            <div  className="App" class="centered">
                <h1> Admin Profile <br /> </h1>
                <h2 >Welcome, {localStorage.getItem('admin')}! <br /> </h2>
                <div> <Button className="button2" value="customer" variant="light" size="lg" type="submit" href={"/adminuseroperations"}>Manage users</Button> </div>
                <div> <Button className="button2" value="customer" variant="light" size="lg" type="submit" href={"/admindeviceoperations"}>Manage devices</Button> </div>
                <div> <Button className="button2" value="customer" variant="light" size="lg" type="submit" href={"/createmapping"} >Create user-device mapping </Button> </div>
                <div>
                    <Button className="button2" variant="light" onClick={() => navigate('/adminchat2')}>Chat 1</Button>
                </div>
                <div>
                    <Button className="button2" variant="light" onClick={() => navigate('/adminchat')}>Chat 2</Button>
                </div>

            </div>
    );

}
export default AdminProfile;