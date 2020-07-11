import React, { Component } from 'react';
import classes from './ReactionsCount.css';
import Auxillary from '../hoc/Auxillary';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare,faCommentAlt,faLightbulb } from '@fortawesome/free-solid-svg-icons';

class ReactionsCount extends Component {

    state={
        learnedCount:this.props.reactionCountData.learnedCount,
        appreciateCount:this.props.reactionCountData.appreciateCount,
        shareCount:this.props.reactionCountData.shareCount,
        commentCount:this.props.reactionCountData.commentCount,
        postReactions:[this.props.reactionCountData.learnedClicked,this.props.reactionCountData.appreciateClicked,this.props.reactionCountData.shareClicked,false],
    }

    postReactionsHandler = (event) => {
        event.preventDefault();
        var selectedBtnId=event.target.id;
        var id="post_"+this.props.reactionCountData.postId;
        console.log(id);
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
                    document.getElementById(id+"_commentDivShowHide").style.display="none";
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
                    document.getElementById(id+"_commentDivShowHide").style.display="block";
                    document.getElementById(id+"_commentDivId").focus();
                }
                postReactionsCopy[selectedBtnId]=true;
            }
            this.setState({postReactions:postReactionsCopy});
        }
    };

    render(){
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
                </Auxillary>
        );
    }
}

export default ReactionsCount;