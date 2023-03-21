import React,{useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const [userInfo, setuserInfo] = useState({
    file:[],
    filepreview:null,
   });

  const handleInputChange = (event) => {
    setuserInfo({
      ...userInfo,
      file:event.target.files[0],
      filepreview:URL.createObjectURL(event.target.files[0]),
    })
  }

  const [isSucces, setSuccess] = useState(null);

  const submit = async () => {
    const formdata = new FormData(); 
    formdata.append('avatar', userInfo.file);

    axios.post("http://localhost:3005/imageupload", formdata,{   
            headers: { "Content-Type": "multipart/form-data" } 
    })
    .then(res => { // then print response status
      console.warn(res);
      if(res.data.success === 1){
        setSuccess("Image Upload Successfully");
      }
    })
  }

  return (
    <div className="container">
      <h3 className="text-white">Image Upload</h3>
      <div className="form_design">
      {isSucces !== null ? <h4> {isSucces} </h4> :null }
          <div className="form">
             <label className="text-white">Select Image :</label>
             <input type="file" className="form-control" name="upload_file"  onChange={handleInputChange} />
          </div>
          <div className="form">
          <button type="submit" className="btn" onClick={()=>submit()} > Save </button>
          </div>
      </div>
      {userInfo.filepreview !== null ? 
        <img className="previewimg"  src={userInfo.filepreview} alt="UploadImage" />
      : null}
    </div>
  );
}

export default App;
