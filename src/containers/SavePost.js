import React, { Component } from 'react';
import classes from './SavePost.css';
import Auxillary from '../hoc/Auxillary';

class SavePost extends Component {
    state={
        savePost: this.props.savePostData.saved,
        viewPost: this.props.savePostData.viewed
    }

    saveBtnHandler = (event) => {
        event.preventDefault();
//        var id="post_"+this.props.postData.postId+"_savePost_Btn";
//        var control = document.getElementById(id);
        var savePostCopy = this.state.savePost;
//        var btnText = control.innerText;
        if(savePostCopy == true){
//                btnText=btnText.substring(0,btnText.length-3);
//                control.innerText=btnText;
                savePostCopy = false;
            }
            else{
//                btnText=btnText+"d"+ " "+'&#10003;';
//                control.innerText=btnText;
                savePostCopy = true;
            }
            
            this.setState({savePost:savePostCopy});
    };

    render(){
        console.log(this.props.savePostData);
        return(
            <Auxillary>
                <span style={{float:'right',color:'green',fontSize:'20px'}}>{this.state.viewPost ? "✓" : ""}</span>
                <button 
                    className={classes.savePostBtn} 
                    id={"post_"+this.props.savePostData.postId+"_savePost_Btn"}
                    onClick={this.saveBtnHandler.bind(this)}>{this.state.savePost ? "Saved ✓" : "Save"}
                </button>
            </Auxillary>
        );
    }
}

export default SavePost;
