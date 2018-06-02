import React, { Component } from 'react';
import {Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import './App.css';
import Timer from './components/timer';
//import Tomato from './components/tomato';
import LoginPage from './components/login-page';
import RegistrationPage from './components/registration-page';
import LandingPage from './components/landing-page';
//import loadAuthToken from './local-storage';
import { loadAuthToken } from './local-storage';
import { setAuthToken, setUserWithToken } from './actions/authActions';
import { bindActionCreators } from 'redux';


class App extends Component {

   componentDidMount() {
     const authToken = loadAuthToken();
     if(authToken){
      this.props.setAuthToken(authToken);
      this.props.setUserWithToken(authToken);
     }
   }

  render() {
    return (
      <div className="App">
        <Route exact path="/" component={LandingPage} />
        <Route exact path='/home' component={Timer}/>
        <Route exact path='/login' component={LoginPage}/>
        <Route exact path='/register' component={RegistrationPage}/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
	hasAuthToken: state.auth.authToken !== null,
	loggedIn: state.auth.currentUser !== null
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setAuthToken,
    setUserWithToken,
  }, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
