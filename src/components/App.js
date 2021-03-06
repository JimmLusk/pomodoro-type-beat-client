import React, { Component } from 'react';
import {Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import './styles/App.css';
import TimerPage from './timer-page';
import LoginPage from './login-page';
import RegistrationPage from './registration-page';
import LandingPage from './landing-page';
import { loadAuthToken } from '../local-storage.js';
import { setAuthToken, setUserWithToken } from '../actions/authActions';
import { bindActionCreators } from 'redux';


export class App extends Component {
  constructor(props) {
    super(props);
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
        <Route exact path='/home' component={TimerPage}/>
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
