import React, { useState, useEffect } from 'react';
import './Message.css';
import {format} from 'timeago.js';
import axios from 'axios';

export default function Message({own,message,senderProfilePicture,userProfilePicture}) {

    // const [senderProfilePicture,setSenderProfilePicture] = useState('')
    // // console.log(senderProfilePicture);
    // // console.log(message.profilePicture);
    // useEffect(() => {
    //     const getProfilePicture = () => {
    //         axios.get('/users/profilePicture/'+message.sender).then(result => {
    //             return setSenderProfilePicture(result.data);
    //         }).catch(err => {
    //             return err;
    //         });
    //     }
    //     localStorage.setItem("senderProfilePicture", JSON.stringify(senderProfilePicture))
    //     getProfilePicture();
    // },[message.sender]);
    

    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                {own ? <img 
                    src={userProfilePicture} 
                    alt="" 
                    className="messageImg" 
                /> :
                <img 
                    src={senderProfilePicture} 
                    alt="" 
                    className="messageImg" 
                />
                }
                <p className="messageText">{message.text}</p>
            </div>
            <div className="messageBottom">{format(message.createdAt)}</div>
        </div>
    )
}
