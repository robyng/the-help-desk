import React, {useRef,useState} from 'react';
import { uploadFile } from 'aws-sdk';

var AWS = require("aws-sdk");
const config = {
  bucketName: "the-help-desk",
  dirName: 'ticket-number' /* optional */,
  region:"us-west-1",
  accessKeyId: "",
  secretAccessKey: ""
};




AWS.config.update({
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey
})
const myBucket = new AWS.S3({
  params: { Bucket: config.bucketName},
  region: config.region,
})

function Fileupload() {
  console.log(`************** config ${JSON.stringify(config)}`)
  const [progress , setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInput = (e) => {
      setSelectedFile(e.target.files[0]);
  }

  const uploadFile = (file) => {

      const params = {
          ACL: 'public-read',
          Body: file,
          Bucket: config.bucketName,
          Key: `${config.dirName}\\${file.name}`,
          
      };

      myBucket.putObject(params)
          .on('httpUploadProgress', (evt) => {
              setProgress(Math.round((evt.loaded / evt.total) * 100))
          })
          .send((err) => {
              if (err) console.log(err)
          })
  }


  return <div>
      <div>Native SDK File Upload Progress is {progress}%</div>
      <input type="file" onChange={handleFileInput}/>
      <button onClick={() => uploadFile(selectedFile)}> Upload to S3</button>
  </div>
}

export default Fileupload;