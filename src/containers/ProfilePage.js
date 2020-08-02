import React,{Component} from 'react';
import classes from './ProfilePage.css';
import Auxillary from '../hoc/Auxillary';
import defaultProfilePic from '../assets/images/defaultProfilePic.png';

class ProfilePage extends Component{
    state={
        selectedInterests:[],
        firstName:"aaaa",
        lastName:"bbbb",
        email:"abc@abc.com",
        designation:"student",
        institute:"UTD",
        password:null,
        profileImage:defaultProfilePic
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
        document.getElementById("fname").value=this.state.firstName;
        document.getElementById("lname").value=this.state.lastName;
        document.getElementById("designation").value=this.state.designation;
        document.getElementById("institute").value=this.state.institute;
        document.getElementById("email").value=this.state.email;
    }

    render(){
        return(
            <Auxillary>
                <div className={classes.profileDiv}>
                    <div className={classes.profileImageDiv}>
                        <img src={this.state.profileImage}  className={classes.profileImage} />
                    </div>
                    <input 
                        type="file" 
                        style={{display:'none'}}
                        onChange={this.fileSelectedHandlerProfileImage} 
                        accept="image/*"
                        ref={fileInput1 => this.fileInput1 = fileInput1} />
                    <span onClick={()=>this.fileInput1.click()} style={{cursor:"pointer"}}>&#9998;</span>
                    <form name="profileForm">
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
                                className={classes.saveChangesBtn}
                                onClick={this.saveChangesButtonHandler}>Save</button> 
                        </div>   
                    </form>
                </div>
            </Auxillary>
        );
    }
}

export default ProfilePage;
