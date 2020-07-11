import React, { Component } from 'react';
import classes from './UserPosts.css';
import OtherComments from './OtherComments';
import defaultProfilePic from '../assets/images/defaultProfilePic.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare,faCommentAlt,faLightbulb } from '@fortawesome/free-solid-svg-icons';
import ReactionsCount from './ReactionsCount';

class UserPosts extends Component {

    state={
        savePostState:[],
        mainComments: this.props.postData.mainComments
    }
   
    saveBtnHandler = (event) => {
        event.preventDefault();
        var selectedBtnId=event.target.id;
        if(selectedBtnId !== undefined){
            console.log(selectedBtnId);
            var selectedBtnValue=event.target.value;
            var control = document.getElementById(selectedBtnId);
            var savePostStateCopy = this.state.savePostState.slice();
            var btnText = control.innerText;
            if(savePostStateCopy.includes(selectedBtnValue)){
                console.log(btnText);
                btnText=btnText.substring(0,btnText.length-3);
                console.log(btnText);
                control.innerText=btnText;
                control.style.color="rgb(60, 154, 84)";
                control.style.backgroundColor="white";
                savePostStateCopy = savePostStateCopy.filter(item => item !== selectedBtnValue);
            }
            else{
                btnText=btnText+"d"+ " "+'&#10003;';
                console.log(btnText);
                control.innerHTML=btnText;
                control.style.color="rgb(60, 154, 84)";
                control.style.backgroundColor="white";
                savePostStateCopy.push(selectedBtnValue);
            }
            console.log(savePostStateCopy);
            this.setState({savePostState:savePostStateCopy});
        }
    };
    
    replyCommentHandler = (event) => {
        console.log(event.target.value);
        var id = "reply_"+event.target.value;
        document.getElementById(id).style.display="flex";
    }

    render(){
        console.log(this.props.postData);
        console.log(this.state.mainComments);
        return(
            <div className={classes.userPosts}>
                <span style={{float:'right',color:'green',fontSize:'20px'}}>&#10003;</span>
                <button 
                    className={classes.savePostBtn}
                    value="1" 
                    id="savePost_Btn"
                    onClick={this.saveBtnHandler.bind(this)}>Save</button>
                <div className={classes.dropdown}>
                    <button className={classes.reportPostBtn}>Report</button>
                    <div className={classes.dropdownContent}>
                        <a href="#">
                            <h5 style={{paddingBottom:'-10px',marginBottom:'-20px',marginTop:'0px'}}>Block this post</h5>
                            <h6 style={{marginBottom:'-5px',marginTop:'19px',fontWeight:'lighter',color:'gray'}}>This post is offensive</h6>
                        </a>
                        <a href="#">
                            <h5 style={{paddingBottom:'-10px',marginBottom:'-20px',marginTop:'0px'}}>Irrelevant post</h5>
                            <h6 style={{marginBottom:'-5px',marginTop:'19px',fontWeight:'lighter',color:'gray'}}>Not relevant to this community</h6>
                        </a>
                        <a href="#">
                            <h5 style={{paddingBottom:'-10px',marginBottom:'-20px',marginTop:'0px'}}>Hide post</h5>
                            <h6 style={{marginBottom:'0px',marginTop:'19px',fontWeight:'lighter',color:'gray'}}>I don't want to see this post</h6>
                        </a>
                    </div>
                </div>
                <div className={classes.profileDetails}>
                        <img src={defaultProfilePic}  className={classes.profileImage}/>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                        <span style={{marginLeft:"10px",marginTop:"10px", display:'inline'}}>{this.props.postData.profileName}</span>
                        <h5 style={{marginLeft:"10px", marginTop: '3px', marginBottom: '5px',display:'inline', color:'gray',fontWeight:'lighter'}}>{this.props.postData.designation} at {this.props.postData.institute}</h5>
                        </div>
                </div>
                <div>
                    <h4 style={{marginTop: "15px", marginBottom: "3px", textAlign: 'left', paddingLeft: '10px'}}>
                        <span className={classes.redFont}>#Mistake</span>
                    </h4>
                    <p style={{paddingLeft: '10px'}}>{this.props.postData.mistake}</p>
                </div>
                <div>
                    <h4 style={{marginTop: "15px", marginBottom: "3px", textAlign: 'left', paddingLeft: '10px'}}>
                        <span className={classes.greenFont}>#Learning</span>
                    </h4>
                    <p style={{paddingLeft: '10px'}}>{this.props.postData.learning}</p>
                </div>
                <ReactionsCount reactionCountData = {this.props.postData} />
                <div id={"post_"+this.props.postData.postId+"_commentDivShowHide"} className={classes.commentDivContainer}>
                    <div className={classes.commentDiv}>
                        <img src={defaultProfilePic}  className={classes.profileImage}/>
                        <div 
                            id={"post_"+this.props.postData.postId+"_commentDivId"}
                            contentEditable="true" 
                            className={classes.placeCommentDiv}
                            placeholder="Add a comment..." >
                        </div>
                    </div>
                    <button className={classes.postCommentBtn} onClick={this.postCommentHandler}>Post</button>
                    { this.state.mainComments.map((eachMainComment) => (<OtherComments mainCommentData={eachMainComment} />))}
                </div>
            </div>
        );
    }
}

export default UserPosts;