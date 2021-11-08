import React from 'react';
import './Message.css';
import {format} from 'timeago.js';

export default function Message({message,own}) {
    console.log("message" , message)
    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <img 
                    src="https://c4.wallpaperflare.com/wallpaper/316/222/470/harry-potter-harry-potter-and-the-order-of-the-phoenix-albus-dumbledore-wallpaper-preview.jpg" 
                    alt="" 
                    className="messageImg" 
                />
                <p className="messageText">{message.text}</p>
            </div>
            <div className="messageBottom">{format(message.createdAt)}</div>
        </div>
    )
}
