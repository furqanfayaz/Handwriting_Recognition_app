import { Component, createRef } from "react";
import Link from 'next/link';
import { upload } from "../apis/Uploadapis";
import "../styles/styles.css";



class Upload extends Component {
    constructor() {
        super();
        this.inputRef = createRef();
        this.state = {
            imageUrl: "", 
            text: "",
            loading: false,
        }
    }

    handleClick = () => {
        if(this.inputRef && this.inputRef.current) {
            this.inputRef.current.click();
        }
    }

    onChangeFile = async (e) => {
        this.setState({loading: true});
        const files = e.target.files;
        const formData = new FormData();
        formData.append('file', files[0]);
        const res = await upload(formData);
        this.setState({ 
            loading: false,
            imageUrl: res.data.data.url, 
            text: res.data.data.text 
        })

    }

    render() {
        const { imageUrl, text, loading } = this.state;
        return (
           <div className="upload-container">
               <h1>Handwriting Recognition</h1> 
               <div className="upload-inner-container">
                    <input
                        onChange={this.onChangeFile} 
                        ref={this.inputRef} 
                        type="file" 
                        style={{display: 'none'}} 
                    />
                    <button 
                        disabled={loading}
                        className="upload-btn" 
                        onClick={this.handleClick}
                    >
                        {loading ? 'Loading ...' :'Upload Image'}
                    </button>
                    {imageUrl && text && 
                    (
                        <div className="upload-result-container">
                            <div className="flex-1">
                                <h4>Uploaded Image </h4>
                                <div 
                                    className="upload-image-preview" 
                                    style={{ backgroundImage: `url(${imageUrl})` }}
                                />
                            </div>
                            <div className="flex-1">
                                <h4>Recognized Text </h4>
                                <p>
                                    {text}
                                </p>
                            </div>
                        </div>
                    )}
                    <p>
                        See previous uploaded images,&nbsp;
                        <Link href="/list">
                            <a>click here</a>
                        </Link>
                        .
                    </p>
               </div>
            </div>
        ) ;
    }
    
    
};

export default Upload;