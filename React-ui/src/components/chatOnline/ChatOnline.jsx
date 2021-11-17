import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './ChatOnline.css';

export default function ChatOnline({onlineUsers, currentId, setCurrentChat, onClickConversation}) {

    const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);

    useEffect(() => {
        const getFriends = async() => {
            const res = await axios.get('/users/friends/'+currentId);
            setFriends(res.data);
        };
        getFriends();
    },[currentId]);

    // console.log(friends);

    useEffect(() => {
        setOnlineFriends(friends.filter(f=>onlineUsers.includes(f.friendId)))
    },[friends, onlineUsers]);

    const handleClick = async(user) => {
        try {
            const res = await axios.get(`/conversations/find/${currentId}/${user.friendId}`);
            if(res.data == null){
                await axios.post("/conversations/",{senderId: currentId, receiverId: user.friendId});
                const res_find = await axios.get(`/conversations/find/${currentId}/${user.friendId}`);
                console.log(res);
                // setCurrentChat(res_find.data);
                onClickConversation(res_find.data);
            }else{
                // setCurrentChat(res.data);
                onClickConversation(res.data);
            }
        } catch (error) {
           console.log(error) 
        }
    }

    return (
        <div className="chatOnline">
            {onlineFriends.map(o => (
                <div className="chatOnlineFriend" onClick={() => handleClick(o)}>
                    <div className="chatOnlineImgContainer">
                        <img src={o?.profilePicture} alt="" className="chatOnlineImg" />
                        <div className="chatOnlineBadge"></div>
                    </div>
                    <span className="chatOnlineName">{o?.username}</span>
                </div>
            ))}
        </div>
    )
}
