import React, { Component } from 'react';
import Auxillary from '../hoc/Auxillary';
import classes from './HomePage.css';
import LfrmMImg from '../assets/images/LfrmM.png';
import PostModal from './PostModal';
import Modal from '../components/UI/Modal';
import defaultProfilePic from '../assets/images/defaultProfilePic.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare,faCommentAlt,faLightbulb } from '@fortawesome/free-solid-svg-icons';

class HomePage extends Component {

    state={
        highlightedMenuId : 'menu_1',
        postingNewPost: false,
        savePostState:[],
        postReactions:[false,false,false,false],
    }

    menuItemClickHandler = (event) => {
        event.preventDefault();
        var selectedMenuId=event.target.id;
        if(selectedMenuId !== undefined){
            console.log(selectedMenuId);
            var control = document.getElementById(selectedMenuId);
            var previousHighlightedId = this.state.highlightedMenuId;
            var prevControl = document.getElementById(previousHighlightedId);
            if(selectedMenuId != previousHighlightedId){
                prevControl.style.color='black';
                control.style.color='green';
                this.setState({highlightedMenuId:selectedMenuId});
            }
        }
    };

    postingCancelHandler = () => {
        this.setState({postingNewPost:false});
    }

    postingHandler = () => {
        this.setState({postingNewPost:true});
    }

    componentDidMount(){
        document.getElementById('editable').focus();
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

    postReactionsHandler = (event) => {
        event.preventDefault();
        var selectedBtnId=event.target.id;
        if(selectedBtnId !== undefined){
            var control = document.getElementById(selectedBtnId);
            var reactionCountControl = document.getElementById("reactionsCount"+"_"+selectedBtnId);
            var oldCount = reactionCountControl.innerText.split(" ")[0];
            var reactionSymbol = reactionCountControl.innerText.split(" ")[1];
            console.log(oldCount);
            console.log(reactionSymbol);
            var postReactionsCopy = this.state.postReactions.slice();
            if(postReactionsCopy[selectedBtnId]==true){
                control.style.color="gray";
                control.style.backgroundColor="white";
                control.style.fontWeight="normal";
                postReactionsCopy[selectedBtnId]=false;
                if(selectedBtnId!=3){
                    var updatedCount = parseInt(oldCount)-1;
                    reactionCountControl.innerText = updatedCount+" "+reactionSymbol;
                }
                else{
                    document.getElementById("commentDivShowHide").style.display="none";
                }
            }
            else{
                control.style.color="rgb(60, 154, 84)";
                control.style.backgroundColor="white";
                control.style.fontWeight="bold"
                if(selectedBtnId!=3){
                    var updatedCount = parseInt(oldCount)+1;
                    reactionCountControl.innerText = updatedCount+" "+reactionSymbol;
                }
                else{
                    document.getElementById("commentDivShowHide").style.display="block";
                    document.getElementById("commentDivId").focus();
                }
                postReactionsCopy[selectedBtnId]=true;
            }
            this.setState({postReactions:postReactionsCopy});
        }
    };

    replyCommentHandler = (event) => {
        console.log(event.target.value);
        var id = "reply_"+event.target.value;
        document.getElementById(id).style.display="flex";
    }

    postCommentHandler = () => {
        var tagToAppend="<div class=\"commentDiv\">\
            <img src={defaultProfilePic}  className={classes.profileImage}/>\
            <div className={classes.commentsFromDB}>\
                <h5 style=\"margin-top:5px; margin-bottom:0px;font-weight:lighter\">Profile Name</h5>\
                <h6 style=\"margin-top:0px; margin-bottom:5px;font-weight:lighter;color:gray\">Designation at Institution</h6>\
                <h5 style=\"margin-top:10px; margin-bottom:5px;font-weight:lighter\"> Comments here</h5>\
            </div>\
        </div>"
       document.getElementById("allComments").innerHTML = tagToAppend+document.getElementById("allComments").innerHTML;
    }

    render(){
        var modal=null;
        if(this.state.postingNewPost){
            modal=<PostModal parentMethod={this.postingCancelHandler} postingPost={this.state.postingNewPost}/>
        }
        return(
            <Auxillary>
                <div className={classes.body}>
                    <div className={classes.header}>
                        <img 
                            src={LfrmMImg} 
                            alt="LfrmM Logo" 
                            height="56"
                            width="100"
                            style={{position:'absolute'}} />
                        <input className={classes.searchInput} type="text" name="searchInp" placeholder="Search..." />   
                        <a className={classes.logoutLink}>Logout</a> 
                        <div className={classes.container}>
                            <div className={classes.left}>
                                <a 
                                    className={classes.sideMenu} 
                                    href="#" 
                                    id="menu_1" 
                                    style={{color:'green'}}
                                    onClick={this.menuItemClickHandler.bind(this)}>Home</a>
                                <a 
                                    className={classes.sideMenu} 
                                    href="#" 
                                    id="menu_2"
                                    onClick={this.menuItemClickHandler.bind(this)} >#MyLearnings</a>
                                 <a 
                                    className={classes.sideMenu} 
                                    href="#" 
                                    id="menu_3"
                                    onClick={this.menuItemClickHandler.bind(this)} >#Saved</a>
                                <a 
                                    className={classes.sideMenu} 
                                    href="#" 
                                    id="menu_4"
                                    onClick={this.menuItemClickHandler.bind(this)} >#Interest1</a>
                                <a 
                                    className={classes.sideMenu} 
                                    href="#" 
                                    id="menu_5"
                                    onClick={this.menuItemClickHandler.bind(this)} >#Interest2</a>
                                <a 
                                    className={classes.sideMenu} 
                                    href="#" 
                                    id="menu_6"
                                    onClick={this.menuItemClickHandler.bind(this)} >#Interest3</a>
                                <a 
                                    className={classes.sideMenu} 
                                    href="#" 
                                    id="menu_7" 
                                    onClick={this.menuItemClickHandler.bind(this)}>Notifications</a>
                                <a 
                                    className={classes.sideMenu} 
                                    href="#" 
                                    id="menu_8"
                                    onClick={this.menuItemClickHandler.bind(this)} >Messages</a>
                                <a 
                                    className={classes.sideMenu} 
                                    href="#" 
                                    id="menu_9"
                                    onClick={this.menuItemClickHandler.bind(this)} >Profile</a>
                            </div>
                            <div className={classes.right}></div>
                        </div>
                    </div>
                    <div className={classes.middle}>
                        <div className={classes.postLearning} onClick={this.postingHandler}>
                            <div className={classes.profileDetails}>
                                <img src={defaultProfilePic}  className={classes.profileImage}/>
                                <span style={{marginLeft:"10px",marginTop:"16px"}}>Profile Name</span>
                            </div>
                            <div 
                                className={classes.contentDiv} 
                                id="editable" 
                                contentEditable = "true" 
                                placeholder="Wanna share your learning...Let's post it " 
                                style={{paddingLeft: '10px'}}>
                            </div>
                             <button className={classes.postBtn} onClick={this.postingHandler} disabled>Post</button>
                            {modal}
                        </div>
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
                                        <span style={{marginLeft:"10px",marginTop:"10px", display:'inline'}}>Profile Name</span>
                                        <h5 style={{marginLeft:"10px", marginTop: '3px', marginBottom: '5px',display:'inline', color:'gray',fontWeight:'lighter'}}>Designation at Institution</h5>
                                    </div>
                            </div>
                            <div>
                                <h4 style={{marginTop: "15px", marginBottom: "3px", textAlign: 'left', paddingLeft: '10px'}}>
                                    <span className={classes.redFont}>#Mistake</span>
                                </h4>
                                <p style={{paddingLeft: '10px'}}>This is my Mistake. Hope you do not make it as I did, as it screwed me.</p>
                            </div>
                            <div>
                                <h4 style={{marginTop: "15px", marginBottom: "3px", textAlign: 'left', paddingLeft: '10px'}}>
                                    <span className={classes.greenFont}>#Learning</span>
                                </h4>
                                <p style={{paddingLeft: '10px'}}>This is my Learning</p>
                            </div>
                            <div className={classes.postReactionsCountDiv}>
                                <span 
                                    id="reactionsCount_0"
                                    className={classes.postReactionsCount}>5 &#128161;</span>
                                <span 
                                    id="reactionsCount_1"
                                    className={classes.postReactionsCount}>10 &#128079;</span>
                                <span 
                                    id="reactionsCount_2"
                                    className={classes.postReactionsCount}>2 &#10150;</span>
                                <span 
                                    id="reactionsCount_3"
                                    className={classes.postReactionsCount}>5 <FontAwesomeIcon icon={faCommentAlt} color="gray" size="xs" /></span>
                            </div>
                            <div className={classes.postReactionsDiv}>
                                <button 
                                    id="0"
                                    onClick={this.postReactionsHandler.bind(this)}
                                    className={classes.postReactionsBtns}>&#128161; Learned</button>
                                <button 
                                    id="1"
                                    onClick={this.postReactionsHandler.bind(this)}
                                    className={classes.postReactionsBtns}>&#x1f44f; Appreciate</button>
                                <button 
                                    id="2"
                                    onClick={this.postReactionsHandler.bind(this)}
                                    className={classes.postReactionsBtns}>&#10150; Share</button>
                                <button 
                                    id="3"
                                    onClick={this.postReactionsHandler.bind(this)}
                                    className={classes.postReactionsBtns}><FontAwesomeIcon icon={faCommentAlt} color="gray" size="xs" /> Comment</button>
                            </div>
                            
                            <div id="commentDivShowHide" className={classes.commentDivContainer}>
                                <div className={classes.commentDiv}>
                                    <img src={defaultProfilePic}  className={classes.profileImage}/>
                                    <div 
                                        id="commentDivId" 
                                        contentEditable="true" 
                                        className={classes.placeCommentDiv}
                                        placeholder="Add a comment..." >
                                    </div>
                                </div>
                                <button className={classes.postCommentBtn} onClick={this.postCommentHandler}>Post</button>
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
                                        <button value="1" className={classes.replyCommentBtn} onClick={this.replyCommentHandler}>Reply</button>
                                        <div className={classes.replyCommentParentDiv} id="reply_1">
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
                                </div>
                                <div style={{marginTop: '15px'}}>
                                    <div className={classes.commentDiv}>
                                            <img src={defaultProfilePic}  className={classes.profileImage}/>
                                            <div className={classes.commentsFromDB}>
                                                <h5 style={{marginTop: '5px', marginBottom: '0px',fontWeight:'lighter'}}>Profile Name</h5>
                                                    <h6 style={{marginTop: '0px', marginBottom: '5px',fontWeight:'lighter',color:"gray"}}>Designation at Institution</h6>
                                                    <h5 style={{marginTop: '10px', marginBottom: '5px',fontWeight:'lighter'}}> Comments here</h5>
                                            </div>
                                    </div>
                                    <div className={classes.replyBtnCommentDiv} id="replyCommentDivId">
                                        <button value="2" className={classes.replyCommentBtn} onClick={this.replyCommentHandler}>Reply</button>
                                        <div className={classes.replyCommentParentDiv} id="reply_2">
                                            <div className={classes.replyCommentDiv}>
                                                <img src={defaultProfilePic}  className={classes.profileImage}/>
                                                <div 
                                                    id="commentDivId3" 
                                                    contentEditable="true" 
                                                    className={classes.placeCommentDiv}
                                                    placeholder="Add a comment..." >
                                                </div>
                                            </div>
                                            <button className={classes.postCommentBtn}>Post</button>
                                        </div>
                                    </div>
                                    <div className={classes.replyCommentDiv}>
                                            <img src={defaultProfilePic}  className={classes.profileImage}/>
                                            <div className={classes.commentsFromDB}>
                                                <h5 style={{marginTop: '5px', marginBottom: '0px',fontWeight:'lighter'}}>Profile Name</h5>
                                                    <h6 style={{marginTop: '0px', marginBottom: '5px',fontWeight:'lighter',color:"gray"}}>Designation at Institution</h6>
                                                    <h5 style={{marginTop: '10px', marginBottom: '5px',fontWeight:'lighter'}}> Comments here</h5>
                                            </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </Auxillary>

        );
    }
}

export default HomePage;