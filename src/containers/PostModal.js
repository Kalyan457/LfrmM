import React ,{ Component } from 'react'
import classes from './PostModal.css';
import Modal from '../components/UI/Modal';

class PostModal extends Component {
     componentDidMount(){
         document.getElementById('editable1').focus();
     }   
    
    constructor(props) {
        super(props);
        };

    closeModalHandler = () => {
        console.log('clicked');
        this.props.parentMethod();
    }

    closeModalHandler = (event) => {
        event.stopPropagation();
        this.props.parentMethod();
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
                       <div className={classes.contentDiv} id="editable1" contentEditable = "true" placeholder="Express your mistake if any, else post your learning below." style={{paddingLeft: '10px'}}>
                        </div>
                        <div className={classes.attachments}></div>
                    </div>
                    <div>
                        <h4 style={{marginTop: "15px", marginBottom: "3px", textAlign: 'left', paddingLeft: '10px'}}>
                            <span className={classes.greenFont}>#Learning</span>
                        </h4>
                        <div className={classes.contentDiv}  contentEditable = "true" placeholder="Hurray... I learned this new thing and hope it helps y'all. " style={{paddingLeft: '10px'}}>
                        </div>
                        <div className={classes.attachments}></div>
                    </div>
                    <div>
                        <input type="checkbox" id="anonymous" name="anonymousChkBtn" value="Anonymous" style={{marginTop:"10px"}} />
                        <label for="anonymous" style={{color:"gray",fontSize:"13px"}}>Post as Anonymous</label>
                        <button className={classes.postBtn}>Post</button>
                    </div>
            </Modal>

        );
    }
}

export default PostModal;