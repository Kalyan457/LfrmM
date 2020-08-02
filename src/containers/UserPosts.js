import React, { Component } from 'react';
import classes from './UserPosts.css';
import OtherComments from './OtherComments';
import defaultProfilePic from '../assets/images/defaultProfilePic.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare,faCommentAlt,faLightbulb } from '@fortawesome/free-solid-svg-icons';
import ReactionsCount from './ReactionsCount';
import SavePost from './SavePost';

class UserPosts extends Component {

    state={
        show: true,
        mainComments: this.props.postData.mainComments
    }
    
    reportBtnHandler = () => {
        this.setState({show:false});
    }

    render(){
        if(this.state.show)
        {
            return(
            <div className={classes.userPosts} >
                <SavePost savePostData = {{saved: this.props.postData.saved, viewed: this.props.postData.viewed, postId: this.props.postData.postId}} />
                <div className={classes.dropdown}>
                    <button className={classes.reportPostBtn}>Report</button>
                    <div className={classes.dropdownContent}>
                        <a href="javascript:void(0);" onClick={this.reportBtnHandler}>
                            <h5 style={{paddingBottom:'-10px',marginBottom:'-20px',marginTop:'0px'}}>Block this post</h5>
                            <h6 style={{marginBottom:'-5px',marginTop:'19px',fontWeight:'lighter',color:'gray'}}>This post is offensive</h6>
                        </a>
                        <a href="javascript:void(0);" onClick={this.reportBtnHandler}>
                            <h5 style={{paddingBottom:'-10px',marginBottom:'-20px',marginTop:'0px'}}>Irrelevant post</h5>
                            <h6 style={{marginBottom:'-5px',marginTop:'19px',fontWeight:'lighter',color:'gray'}}>Not relevant to this community</h6>
                        </a>
                        <a href="javascript:void(0);" onClick={this.reportBtnHandler}>
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
                    <pre className={classes.mistakeData}>{this.props.postData.mistake}
                        {this.props.postData.mistakeImage ? <img src={this.props.postData.mistakeImage.src} width="100%" height="70%" className={classes.imgMistake} /> : null }
                    </pre>
                </div>
                <div>
                    <h4 style={{marginTop: "15px", marginBottom: "3px", textAlign: 'left', paddingLeft: '10px'}}>
                        <span className={classes.greenFont}>#Learning</span>
                    </h4>
                    <pre className={classes.mistakeData}>{this.props.postData.learning}
                        {this.props.postData.learningImage ? <img src={this.props.postData.learningImage.src} width="100%" height="70%" className={classes.imgMistake} /> : null }
                    </pre>
                </div>
                <ReactionsCount reactionCountData = {this.props.postData} />
             </div>
           );   
        }
        else
            return (<div> </div>);
    }
}

export default UserPosts;