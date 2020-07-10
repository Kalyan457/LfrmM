import React, { Component } from 'react';
import classes from './ReplyToOtherComment.css';
import defaultProfilePic from '../assets/images/defaultProfilePic.png';
import Auxillary from '../hoc/Auxillary';

class ReplyToOtherComment extends Component{
    
    render(){
        return(
            <Auxillary>
            <div className={classes.replyCommentDiv}>
                <img src={defaultProfilePic}  className={classes.profileImage}/>
                <div className={classes.commentsFromDB}>
                        <h5 style={{marginTop: '5px', marginBottom: '0px',fontWeight:'lighter'}}>{this.props.replyToOtherCommentData.profileName}</h5>
                        <h6 style={{marginTop: '0px', marginBottom: '5px',fontWeight:'lighter',color:"gray"}}>{this.props.replyToOtherCommentData.designation} at {this.props.replyToOtherCommentData.institute}</h6>
                        <h5 style={{marginTop: '10px', marginBottom: '5px',fontWeight:'lighter'}}>{this.props.replyToOtherCommentData.comment}</h5>
                </div>
            </div>
            <button value={this.props.commentValue} className={classes.replyCommentBtn} onClick={this.replyCommentHandler}>Reply</button>
            </Auxillary>
        );
    }
}

export default ReplyToOtherComment;