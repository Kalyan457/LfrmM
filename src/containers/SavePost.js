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
        var savePostCopy = this.state.savePost;
        if(savePostCopy == true){
                savePostCopy = false;
            }
            else{
                savePostCopy = true;
            }
            this.setState({savePost:savePostCopy});
    };

    render(){
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
