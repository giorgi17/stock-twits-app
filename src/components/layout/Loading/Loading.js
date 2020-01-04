import React from 'react';
import './Loading.css';
import loadingGif from '../../../assets/images/loading.gif';

const loading = () => (
    <div id="loading-modal">
        <img src={loadingGif} id="loadingGif"
          width="500px" height="300px" align="center"></img>
    </div>
);

export default loading;