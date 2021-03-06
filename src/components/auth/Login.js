import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser, loginTwitsUser, setUserLoading } from "../../actions/authActions";
import classnames from "classnames";
import stocktwitsLogo from '../../assets/images/stocktwits-logo.png';
import queryString from 'query-string'

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

componentDidMount() {
  // If logged in and user navigates to Login page, should redirect them to dashboard
  if (this.props.auth.isAuthenticated) {
    this.props.history.push("/dashboard");
  }
  const values = queryString.parse(this.props.location.search);
  if (values.success && values.token) {
    this.props.loginTwitsUser(values, this.props.setUserLoading);
  }
}

static getDerivedStateFromProps(props, state) {
  if (props.auth.isAuthenticated) {
    props.history.push("/dashboard"); // push user to dashboard when they login
  }
  if (props.errors) {
      return {
        errors: props.errors
      };
  }
}

onStocktwitsSubmit = e => {
  this.props.setUserLoading();
  // this.props.history.push("https://stock-twits-backend.herokuapp.com/api/stocktwits-oauth/stocktwits-login");
  window.location.href = 'https://stock-twits-backend.herokuapp.com/api/stocktwits-oauth/stocktwits-login'; 
}

onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

onSubmit = e => {
        e.preventDefault();
    const userData = {
          email: this.state.email,
          password: this.state.password
        };
        this.props.loginUser(userData, this.props.setUserLoading); // since we handle the redirect 
  };

render() {
    const { errors } = this.state;
return (
      <div className="container">
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Login</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email || errors.emailnotfound
                  })}
                />
                <label htmlFor="email">Email</label>
                <span className="red-text">
                  {errors.email}
                  {errors.emailnotfound}
                </span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password || errors.passwordincorrect
                  })}
                />
                <label htmlFor="password">Password</label>
                <span className="red-text">
                  {errors.password}
                  {errors.passwordincorrect}
                </span>
              </div>
              <div className="col s12 m12 l12">
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Login
                </button>
              </div>
            </form>
            {/* Login/Register with stocktwits */}
            <div className="col s12 m12 l12" style={{ paddingLeft: "11.250px" }}>
                <button
                    style={{
                      width: "150px",
                      paddingBottom: "100px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                      marginTop: "1rem"
                    }}
                    onClick={this.onStocktwitsSubmit}
                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                  >
                    Login with stocktwits <img src={stocktwitsLogo} alt="stock-twit-login-pic" width="100px" height="42px" ></img>
                    <br></br>
                  </button>
                  {/* <img src={stocktwitsLogo} width="100px" height="42px" ></img> */}
              </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  loginTwitsUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser, loginTwitsUser, setUserLoading }
)(Login);