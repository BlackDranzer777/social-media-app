import React from 'react';
import './ChatOnline.css';

export default function ChatOnline() {
    return (
        <div className="chatOnline">
            <div className="chatOnlineFriend">
                <div className="chatOnlineImgContainer">
                    <img src="https://c4.wallpaperflare.com/wallpaper/316/222/470/harry-potter-harry-potter-and-the-order-of-the-phoenix-albus-dumbledore-wallpaper-preview.jpg" alt="" className="chatOnlineImg" />
                    <div className="chatOnlineBadge"></div>
                </div>
                <span className="chatOnlineName">John Doe</span>
            </div>

            <div className="chatOnlineFriend">
                <div className="chatOnlineImgContainer">
                    <img src="https://c4.wallpaperflare.com/wallpaper/316/222/470/harry-potter-harry-potter-and-the-order-of-the-phoenix-albus-dumbledore-wallpaper-preview.jpg" alt="" className="chatOnlineImg" />
                    <div className="chatOnlineBadge"></div>
                </div>
                <span className="chatOnlineName">John Doe</span>
            </div>

            <div className="chatOnlineFriend">
                <div className="chatOnlineImgContainer">
                    <img src="https://c4.wallpaperflare.com/wallpaper/316/222/470/harry-potter-harry-potter-and-the-order-of-the-phoenix-albus-dumbledore-wallpaper-preview.jpg" alt="" className="chatOnlineImg" />
                    <div className="chatOnlineBadge"></div>
                </div>
                <span className="chatOnlineName">John Doe</span>
            </div>
        </div>
    )
}
