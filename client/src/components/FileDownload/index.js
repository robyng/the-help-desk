import React, { useRef, useState, useEffect } from 'react';
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

//----------------------------------------------------------------
const FileDownload = ( { imageName,imagePrefix } ) => {
    //const [ticketNumber, setticketNumber] = useState('monk.jpg');
    
    let [img, setImg] = useState()

    AWS.config.update({
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey
    });

    // const changeHandle = e => {
    //     setticketNumber(e.target.value)
    // }

    // const handleClick = (e) => {
    //     e.preventDefault();
    // };

    const handleDownload = (imageName,imagePrefix) => {
        const s3 = new AWS.S3();

        const params = {
            Bucket: config.bucketName,
            Key: `${imagePrefix}\\${imageName}`,
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
        return img
    }

    useEffect(()=>{
        handleDownload(imageName, imagePrefix)
    }, [])

    return (
        <>

            {
                imageName? (<img src={`${img}`} width="150px" height="auto" alt='' />) : <></>
            }
            

        </>
    );
};

export default FileDownload;