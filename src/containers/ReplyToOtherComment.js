import React, { Component } from 'react';
import classes from './ReplyToOtherComment.css';
import defaultProfilePic from '../assets/images/defaultProfilePic.png';
import Auxillary from '../hoc/Auxillary';

class ReplyToOtherComment extends Component{

    state={
        show:false
    }
    
    replyCommentHandler = (event) => {
        this.setState({show:true});
    }
    
    render(){
        var replyToOtherComment=null;
        if(this.state.show){
            replyToOtherComment=
                    <div className={classes.replyCommentParentDiv}>
                        <div className={classes.replyCommentDiv}>
                            <img src={defaultProfilePic}  className={classes.profileImage}/>
                            <div 
                                id="commentDivId2" 
                                contentEditable="true" 
                                className={classes.placeCommentDiv2}
                                placeholder="Add a comment..." >
                            </div>
                        </div>
                        <button className={classes.postCommentBtn}>Post</button>
                    </div>
        }

        return(
            <Auxillary>
                <div className={classes.replyCommentDiv}>
                    <img src={defaultProfilePic}  className={classes.profileImage}/>
                    <div className={classes.commentsFromDB}>
                        <a href="#" className={classes.reportBtnForComment}>Report</a>
                        <h5 style={{marginTop: '5px', marginBottom: '0px',fontWeight:'lighter'}}>{this.props.replyToOtherCommentData.profileName}</h5>
                        <h6 style={{marginTop: '0px', marginBottom: '5px',fontWeight:'lighter',color:"gray"}}>{this.props.replyToOtherCommentData.designation} at {this.props.replyToOtherCommentData.institute}</h6>
                        <h5 style={{marginTop: '10px', marginBottom: '5px',fontWeight:'lighter'}}>{this.props.replyToOtherCommentData.comment}</h5>
                    </div>
                </div>
                <div className={classes.replyBtnCommentDiv} id="replyCommentDivId">
                    <button value={this.props.commentValue} className={classes.replyCommentBtn} onClick={this.replyCommentHandler}>Reply</button>
                    {replyToOtherComment}
                </div>
            </Auxillary>
        );
    }
}

export default ReplyToOtherComment;