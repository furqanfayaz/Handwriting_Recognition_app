import { Component } from 'react';
import { getList } from '../apis/Uploadapis';
import "../styles/styles.css";

class UploadedList extends Component {
    state = {
        list: [],
    }
    
    componentDidMount() {
        this.getUploadedList();
    }   
    
    getUploadedList = async () => {
        const res = await getList();
        this.setState({ list: res.data.image_details });
    }


    render() {
        const { list } = this.state;
        return (
            <div className="list-container"> 
                <div className="heading-container">
                    <div className="flex-1">
                        <h3>Uploaded Image </h3>
                     </div>
                     <div className="flex-1">
                        <h3>Recognized Text </h3>
                     </div>
                    
                </div>
                {list.map((item, index) => {
                    return (
                        <div className="upload-result-container" key={item.id}>
                            
                            <div className="flex-01">
                                <h3>{index + 1}.</h3>
                            </div> 
                            <div className="flex-2">
                                <div 
                                    className="list-image-preview" 
                                    style={{ backgroundImage: `url(${item.url})` }}
                                />
                            </div>
                            <div className="flex-2">
                                <p>
                                    {item.text}
                                </p>
                            </div>
                            
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default UploadedList;