import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { twitsGetData, twitsAddSymbol, updateNewSymbolInput,
  twitsGetUserSymbols } from "../../actions/twitsActions";
import './Dashboard.css';
import TwitCard from './twitCard/TwitCard';
import Controls from './controls/Controls';
import AddSymbol from './controls/addSymbol/AddSymbol';
import axios from "axios";

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  
componentDidMount() {
  //   // Axios instance 
  // const instance = axios.create({
  //   baseURL: 'https://api.stocktwits.com/api'
  // });

  // instance.defaults.headers.common['Authorization'] = '';

  // instance
  //   .get("/2/streams/symbol/AAPL.json")
  //   .then(res => {
  //       console.log("Data received!");
  //       console.log(res.data.messages);
  //       // console.log(JSON.parse(res));
  //       // dispatch({
  //       //     type: SET_TWITS_DATA,
  //       //     payload: res.messages
  //       // })
  //   })



  // this.props.twitsGetData("ui");

  //  Get user symbols from database
  const user = this.props.auth.user;
  const whichUser = user.hasOwnProperty("access_token") ? true : false;
  const whichUserId = user.hasOwnProperty("access_token") ? this.props.auth.user.user_id : this.props.auth.user.id;
  this.props.twitsGetUserSymbols(whichUserId, whichUser);
}

componentWillUpdate() {
  // setTimeout(function() {
  //   //your code to be executed after 1 second
  //   console.log(this.props);
  // }, 3000);
  console.log("Will update");
  console.log(this.props.twits);
}

componentDidUpdate() {
  console.log(this.props.twits);
}

render() {
    const { user } = this.props.auth;
    let twitData;

    if (this.props.twits.data.length != 0) {

      twitData = this.props.twits.data.map(item => {
        return <TwitCard content={item.body} username={item.user.username}
                avatar={item.user.avatar_url} pic={item.entities} key={item.id}></TwitCard>;
      });
    } else {
      twitData = <div className="row twit">
            <div className="col s12 m6">
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                            <span className="card-title">Oops!</span>
                        <p>No twits found for this symbol</p><br></br>
                    </div>
                </div>
            </div>
        </div>
    }
    
return (
      <div style={{ height: "75vh" }} className="container">
        <div className="row" id="dashboard-row">
          <div className="col s12 center-align valign">
            <h4>
              <b>Hey there,</b> {user.hasOwnProperty("access_token") ? user.username.split(" ")[0] : user.name.split(" ")[0]}
              <p className="flow-text grey-text text-darken-1">
                You are logged into a full-stack{" "}
                <span style={{ fontFamily: "monospace" }}>MERN</span> app 👏
              </p>
            </h4>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
          </div>
        </div>
        
        <div className="row controls valign-wrapper">
          &nbsp;&nbsp;&nbsp; <h3><b>Select symbol</b></h3>
          <Controls symbols={Object.keys(this.props.twits.symbols)} change={this.props.twitsGetData} ></Controls>
        </div>
          
        <div className="row controls valign-wrapper">
          <AddSymbol click={this.props.twitsAddSymbol} change={this.props.updateNewSymbolInput} inputValue={this.props.twits.addNewSymbolInput} error={this.props.twits.addNewSymbolInputError} userId={this.props.auth.user} ></AddSymbol>
          {/* <a className="waves-effect waves-light btn">button</a> */}
        </div>

        <div className="row">
          <div className="col s12 center-align" id="twits-diplay">
                          <h1>Twits data</h1> 
                          
                          {/* <TwitCard content={this.props.twits.data[0].body}></TwitCard> */}
                          {twitData}

          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  twits: state.twits,
});

export default connect(
  mapStateToProps,
  { logoutUser, twitsGetData, twitsAddSymbol, updateNewSymbolInput,
    twitsGetUserSymbols }
)(Dashboard);