import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser, setUserLoading } from "../../actions/authActions";
import classnames from "classnames";
import stocktwitsLogo from '../../assets/images/stocktwits-logo.png';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

componentDidMount() {
  // If logged in and user navigates to Register page, should redirect them to dashboard
  if (this.props.auth.isAuthenticated) {
    this.props.history.push("/dashboard");
  }
}

static getDerivedStateFromProps(props, state) {
  if (props.errors) {
        return {
          errors: props.errors
        };
    }
}

onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

onStocktwitsSubmit = e => {
  this.props.setUserLoading();
  // this.props.history.push("https://stock-twits-backend.herokuapp.com/api/stocktwits-oauth/stocktwits-login");
  window.location.href = 'https://stock-twits-backend.herokuapp.com/api/stocktwits-oauth/stocktwits-login'; 
}

onSubmit = e => {
      e.preventDefault();
  const newUser = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        password2: this.state.password2
      };
  // console.log(newUser);
  this.props.registerUser(newUser, this.props.history, this.props.setUserLoading); 
  };
  
render() {
    const { errors } = this.state;
return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Register</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id="name"
                  type="text"
                  className={classnames("", {
                    invalid: errors.name
                  })}
                />
                <label htmlFor="name">Name</label>
                <span className="red-text">{errors.name}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email
                  })}
                />
                <label htmlFor="email">Email</label>
                <span className="red-text">{errors.email}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password
                  })}
                />
                <label htmlFor="password">Password</label>
                <span className="red-text">{errors.password}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password2
                  })}
                />
                <label htmlFor="password2">Confirm Password</label>
                <span className="red-text">{errors.password2}</span>
              </div>
              <div className="col s12 m12 l12" style={{ paddingLeft: "11.250px" }}>
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
                  Sign up
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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  // errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser, setUserLoading }
)(withRouter(Register));