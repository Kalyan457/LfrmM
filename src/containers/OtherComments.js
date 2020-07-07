import React, { Component } from 'react';
import classes from './OtherComments.css';
import defaultProfilePic from '../assets/images/defaultProfilePic.png';
import ReplyToOtherComments from './ReplyToOtherComments';

class OtherComments extends Component{
    replyCommentHandler = (event) => {
        console.log(event.target.value);
        var id = "reply_"+event.target.value;
        document.getElementById(id).style.display="flex";
    }
    render(){
        var divId = "reply_"+this.props.commentValue;

        return(
            <div  id ="allComments" style={{marginTop: '15px'}}>
                <div className={classes.commentDiv}>
                        <img src={defaultProfilePic}  className={classes.profileImage}/>
                        <div className={classes.commentsFromDB}>
                            <h5 style={{marginTop: '5px', marginBottom: '0px',fontWeight:'lighter'}}>Profile Name</h5>
                                <h6 style={{marginTop: '0px', marginBottom: '5px',fontWeight:'lighter',color:"gray"}}>Designation at Institution</h6>
                                <h5 style={{marginTop: '10px', marginBottom: '5px',fontWeight:'lighter'}}> Comments here</h5>
                        </div>
                </div>
                <div className={classes.replyBtnCommentDiv} id="replyCommentDivId">
                    <button value={this.props.commentValue} className={classes.replyCommentBtn} onClick={this.replyCommentHandler}>Reply</button>
                    <div className={classes.replyCommentParentDiv} id={divId}>
                        <div className={classes.replyCommentDiv}>
                            <img src={defaultProfilePic}  className={classes.profileImage}/>
                            <div 
                                id="commentDivId2" 
                                contentEditable="true" 
                                className={classes.placeCommentDiv}
                                placeholder="Add a comment..." >
                            </div>
                        </div>
                        <button className={classes.postCommentBtn}>Post</button>
                    </div>
                </div>
                <ReplyToOtherComments />
            </div>
        );
    }
}

export default OtherComments;