import React ,{ Component } from 'react'
import classes from './PostModal.css';
import Modal from '../components/UI/Modal';
import imageUploadIcon from '../assets/images/imageUpload.png';
import linkIcon from '../assets/images/linkIcon.png';

class PostModal extends Component {

    state={
        selectedFileMistake:null,
        selectedFileLearning:null
    }

    componentDidMount(){
        document.getElementById('mistake').focus();
    }   
    
    constructor(props) {
        super(props);
        };

    closeModalHandler = () => {
        console.log('clicked');
        this.props.modalClose();
    }

    closeModalHandler = (event) => {
        event.stopPropagation();
        this.props.modalClose();
    }

    fileSelectedHandlerMistake = (event) => {
        const reader = new FileReader();
        reader.onload = () => {
            if(reader.readyState==2){
                var imageCode = '<img src="'+reader.result+'" width="100%" height="70%" />';
                document.getElementById("mistake").innerHTML += imageCode;
            }
        }
        reader.readAsDataURL(event.target.files[0]);
    }
    
    fileSelectedHandlerLearning = (event) => {
        const reader = new FileReader();
        reader.onload = () => {
            if(reader.readyState==2){
                this.setState({
                    selectedFileLearning:reader.result
                })
            }
        }
        reader.readAsDataURL(event.target.files[0]);
    }

    postingHandler = (event) => {
        var mistakeData=document.getElementById("mistake").innerText;
        var learningData=document.getElementById("learning").innerText;
        var imageMistake=document.getElementById("imgMistake");
        var imageLearning=document.getElementById("imgLearning");
        console.log(mistakeData);
        console.log(learningData);
        console.log(imageMistake);
        console.log(imageLearning);
        this.props.newPost(mistakeData,learningData,imageMistake,imageLearning);
        this.closeModalHandler(event);
    }
      
    render(){

        return(
            <Modal show={this.props.postingPost}>
                
                    <h2 style={{borderBottom:"1px solid rgba(0,0,0,0.15)",paddingBottom:"10px",margin:"0px",paddingTop:"10px"}}>
                        <span className={classes.yellowFont2}>Post </span>
                        <span className={classes.greenFont}>Learning</span>
                    </h2>
                    <span onClick={this.closeModalHandler} className={classes.closeModalBtn}>&times;</span>
                    <div>
                        <h4 style={{marginTop: "15px", marginBottom: "3px", textAlign: 'left', paddingLeft: '10px'}}>
                            <span className={classes.redFont}>#Mistake</span>
                        </h4>
                        <div 
                            className={classes.contentDiv} 
                            id="mistake" 
                            contentEditable = "true" 
                            placeholder="Express your mistake if any, else post your learning below." 
                            style={{paddingLeft: '10px'}}>
                        </div>
                        <div className={classes.attachments}>
                            <input 
                                type="file" 
                                style={{display:'none'}}
                                onChange={this.fileSelectedHandlerMistake} 
                                accept="image/*"
                                ref={fileInput1 => this.fileInput1 = fileInput1} />
                            <img 
                                src={imageUploadIcon} 
                                alt="Upload Image" 
                                height="20"
                                width="30"
                                onClick={()=>this.fileInput1.click()}
                                />
                        </div>
                    </div>
                    <div>
                        <h4 style={{marginTop: "15px", marginBottom: "3px", textAlign: 'left', paddingLeft: '10px'}}>
                            <span className={classes.greenFont}>#Learning</span>
                        </h4>
                        <div 
                            className={classes.contentDiv}  
                            contentEditable = "true" 
                            id="learning"
                            placeholder="Hurray... I learned this new thing and hope it helps y'all. " 
                            style={{paddingLeft: '10px'}}>
                            {this.state.selectedFileLearning ? <img id="imgLearning" src={this.state.selectedFileLearning} width="100px" height="100px"/> : null }
                        </div>
                        <div className={classes.attachments}>
                            <input 
                                type="file" 
                                style={{display:'none'}}
                                onChange={this.fileSelectedHandlerLearning} 
                                accept="image/*"
                                ref={fileInput2 => this.fileInput2 = fileInput2} />
                            <img 
                                src={imageUploadIcon} 
                                alt="Upload Image" 
                                height="20"
                                width="30"
                                onClick={()=>this.fileInput2.click()}
                                />
                        </div>
                    </div>
                    <div>
                        <h4 style={{marginTop: "15px", marginBottom: "3px", textAlign: 'left', paddingLeft: '10px'}}>
                            <span className={classes.yellowFont2}>#HashTags</span>
                        </h4>
                        <div 
                            className={classes.contentDiv}  
                            contentEditable = "true" 
                            placeholder="Place Hashtags to reach appropriate audience." 
                            style={{paddingLeft: '10px',minHeight:'50px'}}>
                        </div>
                    </div>
                    <div>
                        <input type="checkbox" id="anonymous" name="anonymousChkBtn" value="Anonymous" style={{marginTop:"10px"}} />
                        <label for="anonymous" style={{color:"gray",fontSize:"13px"}}>Post as Anonymous</label>
                        <button className={classes.postBtn} onClick={this.postingHandler}>Post</button>
                    </div>
            </Modal>

        );
    }
}

export default PostModal;