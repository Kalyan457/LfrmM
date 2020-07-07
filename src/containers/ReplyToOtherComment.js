import React, { Component } from 'react';
import classes from './ReplyToOtherComments.css';
import defaultProfilePic from '../assets/images/defaultProfilePic.png';

class ReplyToOtherComments extends Component{
    render(){
        return(
            <div className={classes.replyCommentDiv}>
                <img src={defaultProfilePic}  className={classes.profileImage}/>
                <div className={classes.commentsFromDB}>
                    <h5 style={{marginTop: '5px', marginBottom: '0px',fontWeight:'lighter'}}>Profile Name</h5>
                        <h6 style={{marginTop: '0px', marginBottom: '5px',fontWeight:'lighter',color:"gray"}}>Designation at Institution</h6>
                        <h5 style={{marginTop: '10px', marginBottom: '5px',fontWeight:'lighter'}}> Comments here</h5>
                </div>
            </div>
        );
    }
}

export default ReplyToOtherComments;