import React, { Component } from 'react';
import classes from './OtherComments.css';
import defaultProfilePic from '../assets/images/defaultProfilePic.png';
import ReplyToOtherComment from './ReplyToOtherComment';

class OtherComments extends Component{
    state={
        subComments:[
            {
                commentId:'',
                profileName: "",
                designation: "",
                institute: "",
                comment:""
            }
        ]
    }
    componentDidUpdate(){
        console.log("In ComponentDidUpdate");
    }
    componentDidMount(){
        console.log("In ComponentDidMount in OtherComments");
        this.setState({
            subComments:this.props.mainCommentData.subComment,
        })
        console.log(this.state.subComments);
    }
    componentWillMount(){
        console.log("In ComponentWillMount in OtherComments");
        this.setState({
            subComments:this.props.mainCommentData.subComment,
        })
        console.log(this.state.subComments);
    }

    replyCommentHandler = (event) => {
        console.log(event.target.value);
        var id = "reply_"+event.target.value;
        document.getElementById(id).style.display="flex";
    }
    render(){
        console.log(this.props.mainCommentData);
        console.log(this.state.subComments);
        var mainCommentsArr = this.props.mainCommentData;
        var divId = "reply_"+this.props.commentValue;

        return(
            <div  id ="allComments" style={{marginTop: '15px'}}>
                <div className={classes.commentDiv}>
                        <img src={defaultProfilePic}  className={classes.profileImage}/>
                        <div className={classes.commentsFromDB}>
                            <h5 style={{marginTop: '5px', marginBottom: '0px',fontWeight:'lighter'}}>{this.props.mainCommentData.profileName}</h5>
                                <h6 style={{marginTop: '0px', marginBottom: '5px',fontWeight:'lighter',color:"gray"}}>{this.props.mainCommentData.designation} at {this.props.mainCommentData.institute}</h6>
                                <h5 style={{marginTop: '10px', marginBottom: '5px',fontWeight:'lighter'}}>{this.props.mainCommentData.comment}</h5>
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
                {this.state.subComments.map((eachSubComment) => (<ReplyToOtherComment replyToOtherCommentData={eachSubComment} />))}
            </div>
        );
    }
}

export default OtherComments;