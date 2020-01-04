import React from 'react';
import './Controls.css';

const Controls = props => {
    console.log("FUCK U - " + props.deleteSymbolAction);
    const whichUser = props.userId.hasOwnProperty("access_token") ? true : false;
    const whichUserId = props.userId.hasOwnProperty("access_token") ? props.userId.user_id : props.userId.id;
    let targ = document.getElementById('symbol-select');
    

    const deleteSymbol = (deleteSymbolActionArg, targCopy) => {
        console.log("THIS IS ELEMENT - " + targCopy.value);
        console.log("THIS IS ELEMENT TYPE - " + typeof(targCopy.value));
        // let targ = document.getElementById('symbol-select');
        let val;
        if (targCopy != null) {
            val = targCopy.value;
        }
        console.log(targCopy);
        if (!targCopy) {
            console.log("Undefined!");
        } else {
            console.log("Defined!");
            // console.log(deleteSymbolActionCopy);
            console.log("IS - " + deleteSymbolActionArg);
            deleteSymbolActionArg(val, whichUserId, whichUser, props.loading);
        }
    }

    return ( <React.Fragment>
        <div className="col l6 center-align">
            <div className="input-field col s12">
                <select className="display-select" id="symbol-select" onChange={(e) => props.change(e, props.loading)}>
                    <option value="" defaultValue>Choose your option</option>
                    {props.symbols.map(item => 
                        <option value={item} key={item}>{item}</option>
                    )}
                </select> 
                {/* <a className="waves-effect waves-light btn">button17</a> */}
            </div>
        </div>

        <div className="col l6 center-align">
            <a className="waves-effect waves-light btn" onClick={() => deleteSymbol(props.deleteSymbolAction, targ)}>Delete</a>
        </div>
    </React.Fragment> )
}; 

export default Controls;