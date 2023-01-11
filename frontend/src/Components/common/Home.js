import '../../App.css';
import './Home.css';
import React, {Component} from "react";
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';


class Home extends Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="App" class="centered" >
                <h1> Online Energy Utility Platform <br /> </h1>
                <Button className= "button"  variant="light" size="lg"  type="submit" href={"/login"} > Login</Button>
                <Button   className= "button"  variant="light" size="lg" type="submit" href={"/register"}>Register </Button>

            </div>
        )
    }
}
export default Home;