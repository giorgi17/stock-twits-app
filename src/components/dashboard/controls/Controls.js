import React from 'react';
import './Controls.css';

const Controls = props => (
    
    <div className="col s12 center-align">
        <div className="input-field col s12">
            <select className="display-select" onChange={(e) => props.change(e)}>
                <option value="" disabled defaultValue>Choose your option</option>
                {props.symbols.map(item => 
                    <option value={item} key={item}>{item}</option>
                )}
            </select> 
        </div>
    </div>
); 

export default Controls;