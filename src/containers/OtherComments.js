import React, { Component } from 'react';
import classes from './OtherComments.css';
import defaultProfilePic from '../assets/images/defaultProfilePic.png';
import ReplyToOtherComment from './ReplyToOtherComment';

class OtherComments extends Component{
    state={
        show: false,
        subComments:this.props.mainCommentData.subComments,
        postId:this.props.postIdProp
    }

    replyCommentHandler = (event) => {
        this.setState({show:true});
    }

    componentDidMount(){
        document.getElementById("post_"+this.state.postId+"_commentDivId").focus();
    }

    postCommentHandler = (event) => {
        console.log("In Post Comment Handler In OtherComments");
        var id="post_"+this.state.postId+"comment_"+this.props.mainCommentData.commentId;
        var commentText = document.getElementById(id).innerText;
        console.log(commentText);
        var newComment=
            {
                commentId:53,
                profileName: "PNameSub",
                designation: "DesigSub",
                institute: "InstSub",
                comment:commentText
            };
        this.setState({
            show:false //after posting the comment, turn the display off
        });
        console.log(this.props.indexNum);
        this.props.parentCallBack(newComment,this.props.indexNum);
    }

    render(){
        var subCommentIndexId=0;
        console.log(this.state.subComments);
        var replyToMainComment=null;
        if(this.state.show){
            replyToMainComment=
                    <div className={classes.replyCommentParentDiv}>
                        <div className={classes.replyCommentDiv}>
                            <img src={defaultProfilePic}  className={classes.profileImage}/>
                            <div 
                                id={"post_"+this.state.postId+"comment_"+this.props.mainCommentData.commentId}
                                contentEditable="true" 
                                className={classes.placeCommentDiv2}
                                placeholder="Add a comment..." >
                            </div>
                        </div>
                        <button className={classes.postCommentBtn} onClick={this.postCommentHandler}>Post</button>
                    </div>
        }

        return(
            <div style={{marginTop: '15px',marginBottom: '15px'}}>
                <div className={classes.commentDiv}>
                        <img src={defaultProfilePic}  className={classes.profileImage}/>
                        <div className={classes.commentsFromDB}>
                            <a href="#" className={classes.reportBtnForComment}>Report</a>
                            <h5 style={{marginTop: '5px', marginBottom: '0px',fontWeight:'lighter'}}>{this.props.mainCommentData.profileName}</h5>
                            <h6 style={{marginTop: '0px', marginBottom: '5px',fontWeight:'lighter',color:"gray"}}>{this.props.mainCommentData.designation} at {this.props.mainCommentData.institute}</h6>
                            <h5 style={{marginTop: '10px', marginBottom: '5px',fontWeight:'lighter'}}>{this.props.mainCommentData.comment}</h5>
                        </div>
                </div>
                <div className={classes.replyBtnCommentDiv} id="replyCommentDivId">
                    <button value={this.props.mainCommentData.commentId} className={classes.replyCommentBtn} onClick={this.replyCommentHandler}>Reply</button>
                    {replyToMainComment}
                </div>
                {this.props.mainCommentData.subComments.map((eachSubComment) => (<ReplyToOtherComment 
                                                                                    replyToOtherCommentData={eachSubComment} 
                                                                                    subIndexNum={subCommentIndexId++} 
                                                                                    callback={this.props.parentCallBackToReplyToOtherComments} 
                                                                                    mainIndexNum={this.props.indexNum} 
                                                                                    mainCommentId={this.props.mainCommentData.commentId}/>))}
            </div>
        );
    }
}

export default OtherComments;