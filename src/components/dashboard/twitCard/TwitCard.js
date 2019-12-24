import React from 'react';

const TwitCard = props => {

    let pic;

    if (props.pic.chart) {
        pic = <img src={props.pic.chart.original} height="268" width="480"></img>;
    } else {
        pic = '';
    }

    return (
        <div className="row twit">
            <div className="col s12 m6">
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <img src={props.avatar}></img>
                            <span className="card-title">Username: {props.username}</span>
                        <p>{props.content}</p><br></br>
                        {pic}
                    </div>
                    <div className="card-action">
                        <a href="#">This is a link</a>
                        <a href="#">This is a link</a>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default TwitCard;