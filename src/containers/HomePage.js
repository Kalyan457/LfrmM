import React, { Component } from 'react';
import Auxillary from '../hoc/Auxillary';
import classes from './HomePage.css';
import LfrmMImg from '../assets/images/LfrmM.png';
import PostModal from './PostModal';
import defaultProfilePic from '../assets/images/defaultProfilePic.png';
import UserPosts from './UserPosts';
import request, { post } from "superagent";
import debounce from "lodash.debounce";


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
    
  
    loadUsers = (somedata) => {
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
        var selectedMenuId=event.target.id;
        if(selectedMenuId !== undefined){
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

    render(){
        console.log(this.state.imageMistake);
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
                        <a className={classes.logoutLink}>Logout</a> 
                        <div className={classes.container}>
                            <div className={classes.left}>
                                <a 
                                    className={classes.sideMenu} 
                                    href="#" 
                                    id="menu_1" 
                                    style={{color:'green'}}
                                    onClick={this.menuItemClickHandler.bind(this)}>
                                    <span className={classes.rainbow}>Home</span></a>
                                <a 
                                    className={classes.sideMenu} 
                                    href="#" 
                                    id="menu_2"
                                    onClick={this.menuItemClickHandler.bind(this)} >
                                    #MyLearnings</a>
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
                </div>
            </Auxillary>

        );
    }
}

export default HomePage;