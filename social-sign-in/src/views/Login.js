import React, { Component } from 'react'
import './index.css'
import FacebookLogin from 'react-facebook-login'
import { Redirect } from 'react-router-dom'
import 'materialize-css/dist/css/materialize.min.css'

class Login extends Component {
  constructor(){
    super();
   
    this.state = {
      isLogged: false
    }

       this.responseFacebook = this.responseFacebook.bind(this);
       this.onFailure = this.onFailure.bind(this);
  }
  
   componentWillMount() {
      if (localStorage.getItem("fbData")) {
           this.setState({ isLogged: true });
    }
  }
  
  
  responseFacebook(response) {
    localStorage.setItem("fbData", JSON.stringify({
      token: response.token,
      email: response.email,
      name: response.name,
      picture: response.picture.data.url,
      social: 'fb'
    }
    ));

        this.setState({ isLogged: true });
    }
  
   onFailure(error) {
    console.log(error);
  }
 
 
  render() {
    if (this.state.isLogged) {
      return(<Redirect to="/home/"/>);
    }
    return(
      <div className="Login">
          <div className="Login-box">
            <div className="card">
              <div className="card-content">
                <FacebookLogin
                     appId="3081129971907919"
                     autoload={ false }
                     fields="name, email, picture.width(120)"
                     callback={ this.responseFacebook }
                     onFailure={ this.onFailure }
                     textButton="Facebook"
                     cssClass="waves-effect waves-light btn blue darken-2"
                     icon="fa fa-facebook"/>
              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default Login;