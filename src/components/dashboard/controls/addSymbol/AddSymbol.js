import React from 'react';
import classnames from "classnames";

const addSymbol = props => {
    // const checkInputLength = (event) => {
    //     if (props.inputValue.length == 0) {
    //         error.empty = "input is empty!";
    //     }
    //     console.log("Is empty - " + error.empty);
    //     console.log("FUUUUCK! - " + props.inputValue);
    // }

    const checkFocusOut = () => {
        let element = document.getElementById('add_symbol');
        let red_text = document.getElementById('symbol-red-text');
        red_text.innerHTML = '';
        element.classList.remove("invalid");
    }

    const checkFocusIn = (event) => {
        props.change(event);
        if (event.target.value.length == 0) {
            let element = document.getElementById('add_symbol');
            let red_text = document.getElementById('symbol-red-text');
            red_text.innerHTML = props.error;
            element.classList.add("invalid");
        }
    }

    const whichUser = props.userId.hasOwnProperty("access_token") ? true : false;
    const whichUserId = props.userId.hasOwnProperty("access_token") ? props.userId.user_id : props.userId.id;

    return (
        <form className="col s6 valign-wrapper">
            {/* <div> RATOOOM - {error.empty}</div> */}
            <div className="input-field col s6">
                <input id="add_symbol" type="text"
                className={classnames("", {
                        invalid: (props.error != '') ? true : false 
                        // invalid : true
                    })}
                    error="eg" value={props.inputValue} onChange={props.change}
                    onFocus={checkFocusIn}
                    onBlur={checkFocusOut}
                     />
                <label htmlFor="add_symbol"><b>Add symbol</b></label>
                <span className="red-text" id="symbol-red-text" >{props.error}</span>
            </div>
            <input type="submit" value="Add" className="waves-effect waves-light btn"
                onClick={(e) => { e.preventDefault(); props.click(props.inputValue, whichUserId, whichUser, props.loading)}} />
        </form>
    )
};

export default addSymbol;