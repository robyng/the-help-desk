import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { ADD_TICKET } from "../../utils/mutations";
import { QUERY_TICKETS2, QUERY_ME } from "../../utils/queries";
import Auth from '../../utils/auth';
import FileDownload from "../FileDownload";
import { uploadFile } from 'aws-sdk';

var AWS = require("aws-sdk");
const config = {
  bucketName: process.env.REACT_APP_BUCKET_NAME,
  dirName: process.env.REACT_APP_DIR_NAME /* optional */,
  region: process.env.REACT_APP_REGION,
  accessKeyId: process.env.REACT_APP_ACCESS_ID,
  secretAccessKey: process.env.REACT_APP_ACCESS_KEY
};
AWS.config.update({
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey
})
const myBucket = new AWS.S3({
  params: { Bucket: config.bucketName},
  region: config.region,
})

function NewTicket() {
  const [progress , setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInput = (e) => {
      setSelectedFile(e.target.files[0]);
  }

  const uploadFile = (filePrefix, file) => {
      // filePrefix is the ticket name
      // where file is the entire file as a blob, and it has a non unique file name
      const params = {
          ACL: 'public-read',
          Body: file,
          Bucket: config.bucketName,
          Key: `${filePrefix}\\${file.name}`,
          
      };

      myBucket.putObject(params)
          .on('httpUploadProgress', (evt) => {
              setProgress(Math.round((evt.loaded / evt.total) * 100))
          })
          .send((err) => {
              if (err) console.log(err)
          })
  }

  const [progress , setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInput = (e) => {
      setSelectedFile(e.target.files[0]);
  }

  const uploadFile = (filePrefix, file) => {
      // filePrefix is the ticket name
      // where file is the entire file as a blob, and it has a non unique file name
      const params = {
          ACL: 'public-read',
          Body: file,
          Bucket: config.bucketName,
          Key: `${filePrefix}\\${file.name}`,
          
      };

      myBucket.putObject(params)
          .on('httpUploadProgress', (evt) => {
              setProgress(Math.round((evt.loaded / evt.total) * 100))
          })
          .send((err) => {
              if (err) console.log(err)
          })
  }

  

  const loggedIn = Auth.loggedIn();

  const [formState, setFormState] = useState({
    title: 'New Ticket Title',
    message: 'new message',
    category: " ",
    isPrivate: false,
    imageName: " ",

  })



  //const [addTicket, {error}] = useMutation(ADD_TICKET)
  const [addTicket, { error }] = useMutation(ADD_TICKET, {
    update(cache, { data: { addTicket } }) {
      try {
        // update tickets array's cache
        // could potentially not exist yet, so wrap in a try/catch

        let { getTickets } = cache.readQuery({ query: QUERY_TICKETS2 });

        cache.writeQuery({
          query: QUERY_TICKETS2,
          data: { getTickets: [addTicket, ...getTickets] },
        });
      } catch (e) {
        console.error(">>>>>>>> catching error ", e, " | ", error);
      }

    },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    let tempData
    try {
      if(selectedFile.name)
         tempData  = await addTicket({
          variables: { ...formState, imageName: selectedFile.name }
        });
      else
      tempData = await addTicket({
        variables: { ...formState, }
      });
      const {data} = tempData; 
      

      console.log.apply(`n\n\n ---->>>>data : ${JSON.stringify(data)}`)
      uploadFile(data.addTicket._id, selectedFile)
     
    } catch (e) {
      console.error(e);
    }



  };

  return (
    <div className='login-card col-lg-5 col-md-10 container'>
      <div>LoggedIn : {JSON.stringify(loggedIn)}</div>
      <form className='form login-form' onSubmit={handleFormSubmit} >
        <div className='form-group'>
          <label htmlFor='title'>Title:</label>
          <input className='form-input' type='text' id='title' name='title' onChange={handleChange} />
          <br />
        </div>
        <div className='form-group'>
          <label htmlFor='message'>Message:</label>
        </div>
        <textarea
          className="form-input col-12 col-md-12"
          onChange={handleChange}
          name="message"

        ></textarea>
        <br />
        <div className='form-group'>
          <div>
            <div className="container mt-12" >
              <label className="col-sm-8" >
                Category: <br />
                <select className="col-sm-8" name="category" onChange={handleChange}>
                  <option value="plumbing" >Plumbing</option>
                  <option value="electrical" >Electrical</option>
                  <option value="cleaning" >Cleaning</option>
                  <option value="financial" >Financial</option>
                  <option value="socialareas" >Social Areas</option>
                </select>
                <br />
                <br />
                <div>
                  <label>
                    <input type="checkbox" value={true} onChange={handleChange} />
                    Private
                  </label>
                  <br />
                  <br />
                  <div>File Upload Progress is {progress}%</div>
                  <input type="file" onChange={handleFileInput} />



                </div>
              </label>
            </div>
          </div>
          <button className='btn' type='submit'>Submit</button>
        </div>
      </form>
      {error && <div><h1>Creating your ticket failed</h1>{error} </div>}
    </div>

  );
}

export default NewTicket;
