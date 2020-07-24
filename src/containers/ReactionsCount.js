import React, { Component } from 'react';
import classes from './ReactionsCount.css';
import Auxillary from '../hoc/Auxillary';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare,faCommentAlt,faLightbulb } from '@fortawesome/free-solid-svg-icons';
import OtherComments from './OtherComments';
import defaultProfilePic from '../assets/images/defaultProfilePic.png';

class ReactionsCount extends Component {

    state={
        learnedCount:this.props.reactionCountData.learnedCount,
        appreciateCount:this.props.reactionCountData.appreciateCount,
        shareCount:this.props.reactionCountData.shareCount,
        commentCount:this.props.reactionCountData.commentCount,
        postReactions:[this.props.reactionCountData.learnedClicked,this.props.reactionCountData.appreciateClicked,this.props.reactionCountData.shareClicked,false],
        mainComments: this.props.reactionCountData.mainComments,
        show:false,
        postId:this.props.reactionCountData.postId
    }

    postReactionsHandler = (event) => {
        event.preventDefault();
        var selectedBtnId=event.target.id;
        if(selectedBtnId !== undefined){
            var oldLearnedCount=this.state.learnedCount;
            var oldAppreciateCount=this.state.appreciateCount;
            var oldShareCount=this.state.shareCount;
            var postReactionsCopy = this.state.postReactions.slice();
            if(postReactionsCopy[selectedBtnId]==true){
                if(selectedBtnId==0){
                    this.setState({learnedCount:oldLearnedCount-1});
                }
                else if(selectedBtnId==1){
                    this.setState({appreciateCount:oldAppreciateCount-1});
                }
                else if(selectedBtnId==2){
                    this.setState({shareCount:oldShareCount-1});
                }
                else{
                    this.setState({show:false});
                }
                postReactionsCopy[selectedBtnId]=false;  
            }
            else{
                if(selectedBtnId==0){
                    this.setState({learnedCount:oldLearnedCount+1});
                }
                else if(selectedBtnId==1){
                    this.setState({appreciateCount:oldAppreciateCount+1});
                }
                else if(selectedBtnId==2){
                    this.setState({shareCount:oldShareCount+1});
                }
                else{
                    this.setState({show:true});
                }
                postReactionsCopy[selectedBtnId]=true;
            }
            this.setState({postReactions:postReactionsCopy});
        }
    };

    postCommentHandler = (event) => {
        console.log("In Post Comment Handler In ReactionsCount");
        var commentId= "post_"+this.state.postId+"_commentDivId";
        var commentText = document.getElementById(commentId).innerText;
        console.log(commentText);
        var mainCommentPresentInState=this.state.mainComments;
        var newComment=[
            {
                commentId:15,
                profileName: "PName",
                designation: "Desig",
                institute: "Inst",
                comment:commentText,
                loadMoreSubComments: false,
                subComments:[]
            }
        ]
        this.setState({
            mainComments:[
                ...newComment,
                ...this.state.mainComments,
            ]
        });
        document.getElementById(commentId).innerText="";
    };

    callbackToOtherComments = (newComment,indexNum) => {
        var allMainComments = this.state.mainComments.slice();
        allMainComments[indexNum].subComments.splice(0,0,newComment);
        console.log(allMainComments);
        this.setState({
            mainComments:allMainComments
        })
    }
    
    callbackToReplyToOtherComments = (newComment,subIndexNum,mainIndexNum) => {
        var allMainComments = this.state.mainComments.slice();
        allMainComments[mainIndexNum].subComments.splice(subIndexNum+1,0,newComment);
        console.log(allMainComments);
        this.setState({
            mainComments:allMainComments
        })
    }

    componentWillUpdate(){
        console.log(this.state.mainComments);
    }

    render(){
        var commentsToRender=null;
        var mainCommentindexId=0;
        if(this.state.show){
            commentsToRender = (<Auxillary>
                                    <div className={classes.commentDiv}>
                                        <img src={defaultProfilePic}  className={classes.profileImage}/>
                                        <div 
                                            id={"post_"+this.state.postId+"_commentDivId"}
                                            contentEditable="true" 
                                            className={classes.placeCommentDiv}
                                            placeholder="Add a comment..." >
                                        </div>
                                    </div>
                                    <button className={classes.postCommentBtn} onClick={this.postCommentHandler}>Post</button>
                                    {this.state.mainComments.map((eachMainComment) => (<OtherComments 
                                                                                            mainCommentData={eachMainComment} 
                                                                                            postIdProp={this.state.postId} 
                                                                                            parentCallBack={this.callbackToOtherComments} 
                                                                                            indexNum={mainCommentindexId++} 
                                                                                            parentCallBackToReplyToOtherComments={this.callbackToReplyToOtherComments}/>))}
                                </Auxillary>);
        }
        return(
                <Auxillary>
                    <div className={classes.postReactionsCountDiv}>
                        <span 
                            className={classes.postReactionsCount}>{this.state.learnedCount} &#128161;</span>
                        <span 
                            className={classes.postReactionsCount}>{this.state.appreciateCount} &#128079;</span>
                        <span 
                            className={classes.postReactionsCount}>{this.state.shareCount} &#10150;</span>
                        <span 
                            className={classes.postReactionsCount}>{this.state.commentCount} <FontAwesomeIcon icon={faCommentAlt} color="gray" size="xs" /></span>
                    </div>
                    <div className={classes.postReactionsDiv}>
                        <button 
                            id="0"
                            onClick={this.postReactionsHandler.bind(this)}
                            className={this.state.postReactions[0] ? classes.postReactionsBtnsClicked : classes.postReactionsBtns}>&#128161; Learned</button>
                        <button 
                            id="1"
                            onClick={this.postReactionsHandler.bind(this)}
                            className={this.state.postReactions[1] ? classes.postReactionsBtnsClicked : classes.postReactionsBtns}>&#x1f44f; Appreciate</button>
                        <button 
                            id="2"
                            onClick={this.postReactionsHandler.bind(this)}
                            className={this.state.postReactions[2] ? classes.postReactionsBtnsClicked : classes.postReactionsBtns}>&#10150; Share</button>
                        <button 
                            id="3"
                            onClick={this.postReactionsHandler.bind(this)}
                            className={classes.postReactionsBtns}><FontAwesomeIcon icon={faCommentAlt} color="gray" size="xs" /> Comment</button>
                    </div>
                    {commentsToRender}
                </Auxillary>
        );
    }
}

export default ReactionsCount;