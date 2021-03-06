import React, { Component } from 'react';
import Auxillary from '../hoc/Auxillary';
import classes from './HomePage.css';
import LfrmMImg from '../assets/images/LfrmM.png';
import PostModal from './PostModal';
import defaultProfilePic from '../assets/images/defaultProfilePic.png';
import homeIcon from '../assets/images/homeIcon.png';
import learningIcon from '../assets/images/learningIcon.jpg';
import notificationIcon from '../assets/images/notificationIcon.png';
import savedIcon from '../assets/images/savedIcon.png';
import UserPosts from './UserPosts';
import request, { post } from "superagent";
import debounce from "lodash.debounce";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome,faGraduationCap,faSave,faBell,faUser,faHashtag,faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

class HomePage extends Component {

    constructor(props){
        super(props);
        this.state={
            post:[],
            highlightedMenuId : 'menu_1',
            postingNewPost: false,
            error: false,
            hasMore: true,
            isLoading: false,
            postIdUsedforIncrementing:0,
        }

        window.onscroll = debounce(() => {
            const {
            loadUsers,
            state: {
                error,
                isLoading,
                hasMore,
            },
            } = this;
            if (error || isLoading || !hasMore) return;
            if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
                loadUsers();
            }
        }, 100);
    }
    
  
    loadUsers = () => {
       const nextPosts = [
                {
                    postId:this.state.postIdUsedforIncrementing+1,
                    profileName: "My Profile",
                    designation: "My Desig",
                    institute: "My Insti",
                    mistake: "This is My Mistake. I made it",
                    mistakeImage:null,
                    learning: "This is My Learning. I learned it",
                    learningImage:null,
                    saved: true,
                    viewed: false,
                    learnedCount: 2,
                    appreciateCount:3,
                    shareCount:4,
                    commentCount:6,
                    learnedClicked:true,
                    appreciateClicked:true,
                    shareClicked:false,
                    loadMoreComments:false,
                    mainComments:[
                        {
                            commentId:this.state.postIdUsedforIncrementing+1,
                            profileName: "PName",
                            designation: "Desig",
                            institute: "Inst",
                            comment:"This is My Comment1 from state",
                            loadMoreSubComments: false,
                            subComments:[
                                {
                                    commentId:this.state.postIdUsedforIncrementing+1,
                                    profileName: "PNameSub",
                                    designation: "DesigSub",
                                    institute: "InstSub",
                                    comment:"This is sub comment1"
                                },
                                {
                                    commentId:this.state.postIdUsedforIncrementing+2,
                                    profileName: "PNameSub",
                                    designation: "DesigSub",
                                    institute: "InstSub",
                                    comment:"This is sub comment2"
                                }
                            ]
                        },
                        {
                            commentId:this.state.postIdUsedforIncrementing+2,
                            profileName: "PName",
                            designation: "Desig",
                            institute: "Inst",
                            comment:"This is My Comment2 from state",
                            loadMoreSubComments: false,
                            subComments:[
                                {
                                    commentId:this.state.postIdUsedforIncrementing+3,
                                    profileName: "PNameSub",
                                    designation: "DesigSub",
                                    institute: "InstSub",
                                    comment:"This is sub comment3"
                                },
                                {
                                    commentId:this.state.postIdUsedforIncrementing+4,
                                    profileName: "PNameSub",
                                    designation: "DesigSub",
                                    institute: "InstSub",
                                    comment:"This is sub comment4"
                                }
                            ]
                        }     
                    ]
                }
            ]
            this.setState({
                hasMore: (this.state.post.length < 100),
                isLoading: false,
                post: [
                ...this.state.post,
                ...nextPosts,
                ],
                postIdUsedforIncrementing:this.state.postIdUsedforIncrementing+1
            });
    }

    menuItemClickHandler = (event) => {
        event.preventDefault();
        // var selectedMenuId=event.target.id;
        // if(selectedMenuId !== undefined){
        //     var control = document.getElementById(selectedMenuId);
        //     var previousHighlightedId = this.state.highlightedMenuId;
        //     var prevControl = document.getElementById(previousHighlightedId);
        //     if(selectedMenuId != previousHighlightedId){
        //         prevControl.style.color='black';
        //         control.style.color='green';
        //         this.setState({highlightedMenuId:selectedMenuId});
        //     }
        // }
        console.log("In MenuItemHandler");
    };

    postingCancelHandler = () => {
        this.setState({postingNewPost:false});
    }

    postingHandler = () => {
        this.setState({postingNewPost:true});
    }

    componentDidMount(){
        this.loadUsers();
    } 

    callBackToPostModal=(mistake,learning,imageMistake,imageLearning)=>{
        const postFromModal = 
            {
                postId:this.state.postIdUsedforIncrementing+1,
                profileName: "My Profile",
                designation: "My Desig",
                institute: "My Insti",
                mistake: mistake,
                mistakeImage:imageMistake,
                learning: learning,
                learningImage:imageLearning,
                saved: false,
                viewed: false,
                learnedCount: 0,
                appreciateCount:0,
                shareCount:0,
                commentCount:0,
                learnedClicked:false,
                appreciateClicked:false,
                shareClicked:false,
                loadMoreComments:false,
                mainComments:[]
            }
        
        var postsAlreadyInState=this.state.post.slice();
        postsAlreadyInState.splice(0,0,postFromModal);
        this.setState({
            post:postsAlreadyInState,
            postIdUsedforIncrementing:this.state.postIdUsedforIncrementing+1
        })
    }

    logoutHandler = (event) =>{
        
    }

    render(){
        var modal=null;
        if(this.state.postingNewPost){
            modal=<PostModal modalClose={this.postingCancelHandler} postingPost={this.state.postingNewPost} newPost={this.callBackToPostModal}/>
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
                        <a className={classes.logoutLink} 
                            onClick={this.logoutHandler}>
                            <FontAwesomeIcon icon={faSignOutAlt} size="s"/>
                            Logout</a> 
                        <a className={classes.logoutLinkMobile}
                            onClick={this.logoutHandler}>
                            <FontAwesomeIcon icon={faSignOutAlt} size="lg"/>
                        </a> 
                        <div className={classes.container}>
                            <div className={classes.left}>
                                <div className={classes.menuItemsDiv}>
                                    <a 
                                        className={classes.sideMenu} 
                                        href="#" 
                                        id="menu_1" 
                                        onClick={this.menuItemClickHandler.bind(this)}>
                                        <div style={{width:"10px", height:"0px"}}>
                                            <FontAwesomeIcon icon={faHome} size="s"/>
                                        </div>
                                        <span className={classes.menuItemText}>Home</span></a>
                                </div>
                                <div className={classes.menuItemsDiv}>
                                    <a 
                                        className={classes.sideMenu} 
                                        href="#" 
                                        id="menu_2" 
                                        onClick={this.menuItemClickHandler.bind(this)}>
                                        <div style={{width:"10px", height:"0px"}}>
                                            <FontAwesomeIcon icon={faGraduationCap} size="s"/>
                                        </div>
                                        <span className={classes.menuItemText}>My Learnings</span></a>
                                </div>
                                <div className={classes.menuItemsDiv}>
                                    <a 
                                        className={classes.sideMenu} 
                                        href="#" 
                                        id="menu_3" 
                                        onClick={this.menuItemClickHandler.bind(this)}>
                                        <div style={{width:"10px", height:"0px"}}>
                                            <FontAwesomeIcon icon={faSave} size="s"/>
                                        </div>
                                        <span className={classes.menuItemText}>Saved</span></a>
                                </div>
                                <div className={classes.menuItemsDiv}>
                                    <a 
                                        className={classes.sideMenu} 
                                        href="#" 
                                        id="menu_4" 
                                        onClick={this.menuItemClickHandler.bind(this)}>
                                        <div style={{width:"10px", height:"0px"}}>
                                            <FontAwesomeIcon icon={faHashtag} size="s"/>
                                        </div>
                                        <span className={classes.menuItemText}>Interest 1</span></a>
                                </div>
                                <div className={classes.menuItemsDiv}>
                                    <a 
                                        className={classes.sideMenu} 
                                        href="#" 
                                        id="menu_5" 
                                        onClick={this.menuItemClickHandler.bind(this)}>
                                        <div style={{width:"10px", height:"0px"}}>
                                            <FontAwesomeIcon icon={faHashtag} size="s"/>
                                        </div>
                                        <span className={classes.menuItemText}>Interest 2</span></a>
                                </div>
                                <div className={classes.menuItemsDiv}>
                                    <a 
                                        className={classes.sideMenu} 
                                        href="#" 
                                        id="menu_6" 
                                        onClick={this.menuItemClickHandler.bind(this)}>
                                        <div style={{width:"10px", height:"0px"}}>
                                            <FontAwesomeIcon icon={faHashtag} size="s"/>
                                        </div>
                                        <span className={classes.menuItemText}>Interest 3</span></a>
                                </div>
                                <div className={classes.menuItemsDiv}>
                                    <a 
                                        className={classes.sideMenu} 
                                        href="#" 
                                        id="menu_7" 
                                        onClick={this.menuItemClickHandler.bind(this)}>
                                        <div style={{width:"10px", height:"0px"}}>
                                            <FontAwesomeIcon icon={faBell} size="s"/>
                                        </div>
                                        <span className={classes.menuItemText}>Notifications</span></a>
                                </div>
                                <div className={classes.menuItemsDiv}>
                                    <a 
                                        className={classes.sideMenu} 
                                        href="#" 
                                        id="menu_8"
                                        onClick={this.menuItemClickHandler.bind(this)}>
                                        <div style={{width:"10px", height:"0px"}}>
                                            <FontAwesomeIcon icon={faUser} size="s"/>
                                        </div>
                                        <span className={classes.menuItemText}>Profile</span></a>
                                </div>
                                
                            </div>
                            <div className={classes.right}>
                                <h4 style={{textAlign:'center', margin:'auto',borderBottom: '1px solid rgba(0,0,0,0.15)'}}>
                                    <span className={classes.greenFont}>Inspire </span>
                                    <span className={classes.yellowFont2}>and </span>
                                    <span className={classes.redFont}>Innovate</span>
                                </h4>
                                <span style={{fontSize:'20px', color:'gray'}}>&#10077;</span>
                                <span style={{fontSize:'15px', color:'gray'}}> 
                                    There is absolutely nothing you can't get through. You just have to decide and belive that you can do.
                                </span> 
                                <span style={{fontSize:'20px', color:'gray'}}>&#10078;</span>
                                <br></br>
                                <span style={{fontSize:'20px', color:'gray'}}>&#10077;</span>
                                <span style={{fontSize:'15px', color:'gray'}}> 
                                    There is no Plan B. If you need it, it should be, making your Plan A work
                                </span> 
                                <span style={{fontSize:'20px', color:'gray'}}>&#10078;</span>
                                <h5>Look at what the people like you achieved, get inspired by them and start innovating.</h5>
                            </div>
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
                                style={{paddingLeft: '10px'}}
                                >
                            </div>
                            <button className={classes.postBtn}>Post</button>
                            {modal}
                        </div>
                        { this.state.post.map((eachPost) => (<UserPosts key={eachPost.postId} postData={eachPost} />))}
                    </div>
                    <div className={classes.mobileViewMenuDiv}>
                        <div style={{width:"95%",display:"flex",justifyContent:"space-between",bottom:"0"}}>
                            <FontAwesomeIcon icon={faSave} color="gray" size="2x" onClick={this.menuItemClickHandler.bind(this)}/>
                            <FontAwesomeIcon icon={faGraduationCap} color="gray" size="2x" onClick={this.menuItemClickHandler.bind(this)}/>
                            <FontAwesomeIcon icon={faHome} color="gray" size="2x" onClick={this.menuItemClickHandler.bind(this)}/>
                            <FontAwesomeIcon icon={faBell} color="gray" size="2x" onClick={this.menuItemClickHandler.bind(this)}/>
                            <FontAwesomeIcon icon={faUser} color="gray" size="2x" onClick={this.menuItemClickHandler.bind(this)}/>
                        </div>
                    </div>
                </div>
            </Auxillary>

        );
    }
}

export default HomePage;