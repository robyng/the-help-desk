import React, { useRef, useState } from 'react';
import { uploadFile } from 'aws-sdk';



var AWS = require("aws-sdk");
const config = {
    bucketName: "the-help-desk",
    dirName: 'ticket-number' /* optional */,
    region: "us-west-1",
    accessKeyId: "AKIAYPHHLZCVSV2B6JO7",
    secretAccessKey: "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"
};
let img

const FileDownload = () => {
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

    const handleDownload = () => {
        const s3 = new AWS.S3();

        const params = {
            Bucket: config.bucketName,
            Key: `${config.dirName}\\${ticketNumber.trim()}`,
        };

        // function downloadBlob(blob, name = `${ticketNumber}`) {
        // //function downloadBlob(blob, name = `${ticketNumber}.csv`) {
        //     // Convert your blob into a Blob URL (a special url that points to an object in the browser's memory)
        //     const blobUrl = URL.createObjectURL(blob);
        //     // Create a link element
        //     const link = document.createElement('a');
        //     // Set link's href to point to the Blob URL
        //     link.href = blobUrl;
        //     link.download = name;
        //     // Append link to the body
        //     document.body.appendChild(link);
        //     // Dispatch click event on the link
        //     // This is necessary as link.click() does not work on the latest firefox
        //     link.dispatchEvent(
        //         new MouseEvent('click', {
        //             bubbles: true,
        //             cancelable: true,
        //             view: window,
        //         })
        //     );

        //     // Remove link from body
        //     document.body.removeChild(link);
        // }

        // s3.getObject(params, (err, data) => {
        //     if (err) {
        //         console.log(err, err.stack);
        //     } else {
        //         let aBlob = new Blob([data.Body.toString()], {
        //             //type: 'text/csv;charset=utf-8;',
        //         });
        //         console.log(`file: ${ticketNumber}`)
        //         downloadBlob(aBlob, `${ticketNumber}`);
        //     }
        // });

        function encode(data) {
            var str = data.reduce(function(a,b){ return a+String.fromCharCode(b) },'');
            return btoa(str).replace(/.{76}(?=.)/g,'$&\n');
        }

        s3.getObject(params, (err, data) => {
            if (err) {
                console.log(err, err.stack);
            } else {
                // let aBlob = new Blob([data.Body.toString()], {
                //     //type: 'text/csv;charset=utf-8;',
                // });
                // console.log(`----------------------- file: ${ticketNumber}`)
                // downloadBlob(aBlob, `${ticketNumber.trim()}`);
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
                <input
                    type='submit'
                    value='Download'
                    className='btn btn-primary btn-block mt-3'
                    onClick={handleDownload}
                />

            </form>
            <img src={`${img}`} />
        </>
    );
};

export default FileDownload;