import React,{Component} from 'react';
import classes from './ProfilePage.css';
import Auxillary from '../hoc/Auxillary';
import defaultProfilePic from '../assets/images/defaultProfilePic.png';
import debounce from "lodash.debounce";
import UserPosts from './UserPosts';

class ProfilePage extends Component{

    constructor(props){
        super(props);
        this.state={
            selectedInterests:[],
            firstName:"aaaa",
            lastName:"bbbb",
            email:"abc@abc.com",
            designation:"student",
            institute:"UTD",
            password:null,
            profileImage:defaultProfilePic,
            post:[],
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

    interestBtnHandler = (event) => {
        event.preventDefault();
        var selectedBtnId=event.target.id;
        if(selectedBtnId !== undefined){
            console.log(selectedBtnId);
            var selectedBtnValue=event.target.value;
            var control = document.getElementById(selectedBtnId);
            var selectedInterestsCopy = this.state.selectedInterests.slice();
            var btnText = control.innerText;
            if(selectedInterestsCopy.includes(selectedBtnValue)){
                console.log(btnText);
                btnText=btnText.substring(0,btnText.length-2);
                console.log(btnText);
                control.innerText=btnText;
                control.style.color="rgb(60, 154, 84)";
                control.style.backgroundColor="white";
                selectedInterestsCopy = selectedInterestsCopy.filter(item => item !== selectedBtnValue);
            }
            else{
                btnText=btnText+" "+'&#10003;';
                console.log(btnText);
                control.innerHTML=btnText;
                control.style.color="white";
                control.style.backgroundColor="rgb(60, 154, 84)";
                selectedInterestsCopy.push(selectedBtnValue);
            }
            console.log(selectedInterestsCopy);
            this.setState({selectedInterests:selectedInterestsCopy});
        }
    };

    saveChangesButtonHandler = (event) => {
        event.preventDefault();
        var firstName = document.forms['profileForm'].elements['fname'].value;
        var lastName = document.forms['profileForm'].elements['lname'].value;
        var finalizedInterests=this.state.selectedInterests;
        console.log(finalizedInterests);
        alert("Changes Saved Successfully");
    }

    editFNameHandler = (event) => {
        document.getElementById("fname").disabled=false;
    }
    editLNameHandler = (event) => {
        document.getElementById("lname").disabled=false;
    }
    editDesignationHandler = (event) => {
        document.getElementById("designation").disabled=false;
    }
    editInstituteHandler = (event) => {
        document.getElementById("institute").disabled=false;
    }
    
    fileSelectedHandlerProfileImage = (event) => {
        const reader = new FileReader();
        reader.onload = () => {
            if(reader.readyState==2){
                this.setState({
                    profileImage:reader.result
                })
            }
        }
        reader.readAsDataURL(event.target.files[0]);
    }

    componentDidMount(){
        this.loadUsers();
        document.getElementById("fname").value=this.state.firstName;
        document.getElementById("lname").value=this.state.lastName;
        document.getElementById("designation").value=this.state.designation;
        document.getElementById("institute").value=this.state.institute;
        document.getElementById("email").value=this.state.email;
    }

    showPostsHandler = (event) => {
        document.getElementById("posts").style.display="block";
        document.getElementById("profile").style.display="none";
        document.getElementById("interests").style.display="none";
    }
    
    showInterestsHandler = (event) => {
        document.getElementById("interests").style.display="block";
        document.getElementById("profile").style.display="none";
        document.getElementById("posts").style.display="none";
    }
    
    showProfileHandler = (event) => {
        document.getElementById("profile").style.display="block";
        document.getElementById("interests").style.display="none";
        document.getElementById("posts").style.display="none";
    }

    render(){
        console.log(this.state.post);
        return(
            <Auxillary>
                <div className={classes.profileDiv}>
                    <div className={classes.profileImageDiv}>
                        <img src={this.state.profileImage}  className={classes.profileImage} />
                        <span onClick={()=>this.fileInput1.click()} style={{cursor:"pointer"}}>&#9998;</span>
                    </div>
                    <input 
                        type="file" 
                        style={{display:'none'}}
                        onChange={this.fileSelectedHandlerProfileImage} 
                        accept="image/*"
                        ref={fileInput1 => this.fileInput1 = fileInput1} />
                    <div className={classes.choiceBtnsDiv}>
                        <button className={classes.choiceBtns} onClick={this.showPostsHandler}>Posts</button>
                        <button className={classes.choiceBtns} onClick={this.showInterestsHandler}>Interests</button>
                        <button className={classes.choiceBtns} onClick={this.showProfileHandler}>Profile</button>
                        <hr style={{marginTop:"0px"}}></hr>
                    </div>
                    <form name="profileForm" id="profile" className={classes.profile}>
                        <div className={classes.NamesDiv}>
                            <div style={{marginBottom:"2%"}}>
                                <input className={classes.input} id="fname" disabled type="text" name="fname" /> 
                                <span onClick={this.editFNameHandler} style={{cursor:"pointer"}}>&#9998;</span> 
                            </div>
                            <div>
                                <input className={classes.input} id="lname" disabled type="text" name="lname" /> 
                                <span onClick={this.editLNameHandler} style={{cursor:"pointer"}}>&#9998;</span> 
                            </div>
                        </div>
                        <div className={classes.NamesDiv}>
                            <div style={{marginBottom:"2%"}}>
                                <input className={classes.input} id="email" disabled type="email" name="email" />
                                &nbsp;&nbsp;&nbsp;&nbsp;
                            </div>
                            <div>
                                <input className={classes.input} type="password" name="password" placeholder="Change Password" />
                                &nbsp;&nbsp;&nbsp;&nbsp;
                            </div>
                        </div>
                        <div className={classes.NamesDiv}>
                            <div style={{marginBottom:"2%"}}>
                                <input className={classes.input} id="designation" disabled type="text" name="designation"/> 
                                <span onClick={this.editDesignationHandler} style={{cursor:"pointer"}}>&#9998;</span>  
                            </div>
                            <div>
                                <input className={classes.input} id="institute" disabled type="text" name="institute" /> 
                                <span onClick={this.editInstituteHandler} style={{cursor:"pointer"}}>&#9998;</span> 
                            </div>
                        </div>
                        <button 
                                className={classes.saveBtn}
                                onClick={this.profileSaveButtonHandler}>Save</button>
                    </form>
                    <div id="interests" className={classes.interests}>
                        <div className={classes.interestsDiv}>
                            <button 
                                type="button"
                                className={classes.interestButton} 
                                value="1" 
                                id="interest_btn_1"
                                onClick={this.interestBtnHandler.bind(this)}>Coding</button>
                            <button 
                                type="button"
                                className={classes.interestButton} 
                                value="2" 
                                id="interest_btn_2"
                                onClick={this.interestBtnHandler.bind(this)}>Algorithms</button>
                            <button 
                                type="button"
                                className={classes.interestButton} 
                                value="3" 
                                id="interest_btn_3"
                                onClick={this.interestBtnHandler.bind(this)}>Web Development</button>
                            <button 
                                type="button"
                                className={classes.interestButton} 
                                value="4" 
                                id="interest_btn_4"
                                onClick={this.interestBtnHandler.bind(this)}>Machine Learning</button>
                            <button 
                                type="button"
                                className={classes.interestButton} 
                                value="5" 
                                id="interest_btn_5"
                                onClick={this.interestBtnHandler.bind(this)}>Cyber Security</button>
                            <button 
                                type="button"
                                className={classes.interestButton} 
                                value="6" 
                                id="interest_btn_6"
                                onClick={this.interestBtnHandler.bind(this)}>Cloud Computing</button>
                            <button 
                                className={classes.saveBtn}
                                onClick={this.interestSaveButtonHandler}>Save</button> 
                        </div>
                    </div>
                    <div id="posts">
                    { this.state.post.map((eachPost) => (<UserPosts key={eachPost.postId} postData={eachPost} />))}
                    </div>
                </div>
            </Auxillary>
        );
    }
}

export default ProfilePage;
