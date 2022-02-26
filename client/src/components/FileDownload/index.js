import React, { useRef, useState } from 'react';
import { uploadFile } from 'aws-sdk';


var AWS = require("aws-sdk");
const config = {
    bucketName: process.env.REACT_APP_BUCKET_NAME,
    dirName: process.env.REACT_APP_DIR_NAME /* optional */,
    region: process.env.REACT_APP_REGION,
    accessKeyId: process.env.REACT_APP_ACCESS_ID,
    secretAccessKey: process.env.REACT_APP_ACCESS_KEY
};
let img

const FileDownload = ( { imageName } ) => {
    const [ticketNumber, setticketNumber] = useState('monk.jpg');
    let [img, setImg] = useState()

    AWS.config.update({
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey
    });

    const changeHandle = e => {
        setticketNumber(e.target.value)
    }

    const handleClick = (e) => {
        e.preventDefault();
    };

    const handleDownload = (imageName) => {
        const s3 = new AWS.S3();

        const params = {
            Bucket: config.bucketName,
            Key: `${config.dirName}\\${imageName}`,
        };

        function encode(data) {
            var str = data.reduce(function(a,b){ return a+String.fromCharCode(b) },'');
            return btoa(str).replace(/.{76}(?=.)/g,'$&\n');
        }

        s3.getObject(params, (err, data) => {
            if (err) {
                console.log(err, err.stack);
            } else {
                setImg("data:image/jpeg;base64," + encode(data.Body))
            }
        });

        console.log("img is ")
        console.log(img)
        return img
       


    }

    return (
        <>
            <form className='bg-white my-4' onSubmit={handleClick}>
                <input type="text" placeholder={ticketNumber} value={ticketNumber} onChange={changeHandle} />
                <a href="#"
                    value='Download'
                    className='btn btn-primary btn-block mt-3'
                    onClick={handleDownload}
                >Download</a>

            </form>
            <img src={`${img}`} />
        </>
    );
};

export default FileDownload;