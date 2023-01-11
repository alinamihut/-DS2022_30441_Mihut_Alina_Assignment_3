import React from 'react';
import './index.css';
import {Route, BrowserRouter, Routes} from "react-router-dom";
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import Home from './Components/common/Home';
import Login from "./Components/common/Login";
import Register from "./Components/common/Register";
import AdminProfile from "./Components/admin/AdminProfile";
import ClientProfile from "./Components/client/ClientProfile";
import AdminUserOperations from "./Components/admin/AdminUserOperations"
import './App.css';
import ViewUsers from "./Components/admin/ViewUsers";
import EditUser from "./Components/admin/EditUser";
import AdminDeviceOperations from "./Components/admin/AdminDeviceOperations";
import ViewDevices from "./Components/admin/ViewDevices";
import EditDevice from "./Components/admin/EditDevice";
import AdminCreateMapping from "./Components/admin/AdminCreateMapping";
import ClientViewDevices from "./Components/client/ClientViewDevices";
import ClientViewEnergyConsumption from "./Components/client/ClientViewEnergyConsumption";
import ClientChat from "./Components/client/ClientChat.js";
import AdminChat from "./Components/admin/AdminChat";
import AdminChat2 from "./Components/admin/AdminChat";
import AdminChat22 from "./Components/admin/AdminChat22";
export default function App() {


    return (
        <div className="App" >
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route exact path="/login" element = {<Login/>} />
                <Route exact path="/register" element = {<Register/>} />
                <Route exact path="/adminprofile" element = {<AdminProfile/>} />
                <Route exact path="/clientprofile" element = {<ClientProfile/>} />
                <Route exact path="/adminuseroperations" element = {<AdminUserOperations/>} />
                <Route exact path="/viewusers" element = {<ViewUsers/>} />
                <Route exact path="/edituser" element = {<EditUser/>} />
                <Route exact path="/admindeviceoperations" element = {<AdminDeviceOperations/>} />
                <Route exact path="/viewdevices" element = {<ViewDevices/>} />
                <Route exact path="/editdevice" element = {<EditDevice/>} />
                <Route exact path="/createmapping" element = {<AdminCreateMapping/>} />
                <Route exact path="/clientviewdevices" element = {<ClientViewDevices/>} />
                <Route exact path="/viewenergyconsumption" element = {<ClientViewEnergyConsumption/>} />
                <Route  path="/clientchat" element={<ClientChat/>} />
                <Route  path="/adminchat" element={<AdminChat/>} />
                <Route  path="/adminchat2" element={<AdminChat22/>} />
            </Routes>
        </BrowserRouter>
        </div>
    );
}
const rootElement =
    document.getElementById('root');
const root =
    createRoot(rootElement);
root.render(
    <StrictMode>
        <App  className="App"/>
    </StrictMode>,
);