import { Component, createRef } from "react";
import { upload } from "../apis/Uploadapis";
import axios from 'axios';

class Upload extends Component {
    constructor() {
        super();
        this.inputRef = createRef();
        this.state = {imageUrl: "", text: ""}
    }

    handleClick = () => {
        if(this.inputRef && this.inputRef.current) {
            this.inputRef.current.click();
        }
    }

    onChangeFile = async (e) => {
        const files = e.target.files;
        const formData = new FormData();
        formData.append('file', files[0]);
        const res = await upload(formData);
        console.log(res.data.url)
        this.setState({ imageUrl: res.data.url, text: res.data.text })

    }

    render() {
        return (
           <div>
                <input
                    onChange={this.onChangeFile} 
                    ref={this.inputRef} 
                    type="file" 
                    style={{display: 'none'}} 
                />
                <button onClick={this.handleClick}>Upload Image</button>
                <img src={this.state.imageUrl} style={{width:"200px", height:"200px"}}/>
                <p>
                    {this.state.text}
                </p>
            </div>
        ) ;
    }
    
    
};

export default Upload;