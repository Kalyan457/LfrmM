import React, { Component } from 'react';
import Auxillary from '../hoc/Auxillary';
import classes from './HomePage.css';
import LfrmMImg from '../assets/images/LfrmM.png';
import PostModal from './PostModal';
import Modal from '../components/UI/Modal';
import defaultProfilePic from '../assets/images/defaultProfilePic.png';

class HomePage extends Component {

    state={
        highlightedMenuId : 'menu_1',
        postingNewPost: false
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
                                    onClick={this.menuItemClickHandler.bind(this)}>Notifications</a>
                                <a 
                                    className={classes.sideMenu} 
                                    href="#" 
                                    id="menu_3"
                                    onClick={this.menuItemClickHandler.bind(this)} >Saved</a>
                                <a 
                                    className={classes.sideMenu} 
                                    href="#" 
                                    id="menu_4"
                                    onClick={this.menuItemClickHandler.bind(this)} >Profile</a>
                                <a 
                                    className={classes.sideMenu} 
                                    href="#" 
                                    id="menu_5"
                                    onClick={this.menuItemClickHandler.bind(this)} >Messages</a>
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
                            <div className={classes.profileDetails}>
                                <img src={defaultProfilePic}  className={classes.profileImage}/>
                                <span style={{marginLeft:"10px",marginTop:"16px"}}>Profile Name</span>
                            </div>
                            <div>
                                <h4 style={{marginTop: "15px", marginBottom: "3px", textAlign: 'left', paddingLeft: '10px'}}>
                                    <span className={classes.redFont}>#Mistake</span>
                                </h4>
                                <label style={{paddingLeft: '10px'}}>This is my Mistake</label>
                            </div>
                            <div>
                                <h4 style={{marginTop: "15px", marginBottom: "3px", textAlign: 'left', paddingLeft: '10px'}}>
                                    <span className={classes.greenFont}>#Learning</span>
                                </h4>
                                <label style={{paddingLeft: '10px'}}>This is my Learning</label>
                            </div>
                            <div className={classes.postReactionsDiv}>
                                <button className={classes.postReactionsBtns}>Learned</button>
                                <button className={classes.postReactionsBtns}>Appreciate</button>
                                <button className={classes.postReactionsBtns}> &#10150; Share</button>
                                <button className={classes.postReactionsBtns} style={{float:'right'}}>Comment</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Auxillary>

        );
    }
}

export default HomePage;