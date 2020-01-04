import React from 'react';
import './ModalImage.css';

const ModalImage = props => {
    // console.log("JAAAA - " + props.keyId);
    try {
        // Get the modal
        var modal = document.getElementById(props.keyId + "twitpicmodal");

        // Get the image and insert it inside the modal - use its "alt" text as a caption
        let picId = props.keyId + "twitpic";
        var img = document.getElementById(picId);
        var modalImg = document.getElementById(props.keyId);
        var captionText = document.getElementById("caption");
        console.log("THIS IS img - " + img);
        console.log(img);
        img.onclick = function(){
            modal.style.display = "block";
            modalImg.src = this.src;
            // console.log("THIS IS ")
            console.log("THIS IS SRC - " + this.src);
            captionText.innerHTML = this.alt;
        }

        // Get the <span> element that closes the modal
        var span = document.getElementById(props.keyId + "twitpicclose");

        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";   
        }
    } catch (e) {
        console.log(e.message);
    }

    return    (<React.Fragment>
            {/* // <!-- Trigger the Modal --> */}
            {/* <img id="myImg" src="https://charts.stocktwits.com/production/original_189005971.jpg" alt="Snow" style={{width: "100%",maxWidth:"300px"}}></img> */}

            {/* // <!-- The Modal --> */}
            <div id={props.keyId + "twitpicmodal"} className="modal">

                {/* <!-- The Close Button --> */}
                <span id={props.keyId + "twitpicclose"} className="close">&times;</span>

                {/* <!-- Modal Content (The Image) --> */}
                <img className="modal-content" id={props.keyId}></img>

                {/* <!-- Modal Caption (Image Text) --> */}
                <div id="caption"></div>
            </div>
        </React.Fragment>);
};

export default ModalImage;
