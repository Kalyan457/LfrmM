import React, { Component } from 'react';
import Auxillary from '../../hoc/Auxillary';
import classes from './RegisterPage.css';

class RegisterPage extends Component {

    state={
        selectedInterests:[]
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

    registerButtonHandler = (event) => {
        event.preventDefault();
        var firstName = document.forms['registerForm'].elements['fname'].value;
        var lastName = document.forms['registerForm'].elements['lname'].value;
        var email = document.forms['registerForm'].elements['email'].value;
        var password = document.forms['registerForm'].elements['confirmPassword'].value;

        console.log(firstName);
        console.log(lastName);
        console.log(email);
        console.log(password);

        var finalizedInterests=this.state.selectedInterests;
        console.log(finalizedInterests);
        alert("Registered Successfully")
    }

    render(){
        return(
            <Auxillary>
                <div className={classes.registerDiv}>
                    <h2 style={{textAlign:'center'}}>
                        <span className={classes.yellowFont2}>Register to </span>
                        <span className={classes.greenFont}>Learn</span>
                    </h2>
                    <form name="registerForm">
                        <div className={classes.namesDiv}>
                            <input className={classes.input} type="text" name="fname" placeholder="First Name" />    
                            <input className={classes.input} type="text" name="lname" placeholder="Last Name" />
                        </div>
                        <div className={classes.emailDiv}>
                            <input className={classes.input} type="email" name="email" placeholder="Email" />
                            <input className={classes.input} type="password" name="confirmPassword" placeholder="Re-Enter Password" />
                        </div>
                        <h2 style={{textAlign:'center'}}><span className={classes.yellowFont2}>Interests</span></h2>
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
                        </div>   
                        <a className={classes.anchorTag}  href="/">&#8810; back to login</a>   
                        <button 
                            className={classes.registerBtn}
                            onClick={this.registerButtonHandler}>Register</button>              
                    </form>
                </div>
            </Auxillary>
        );
    }
}

export default RegisterPage;