import axios from 'axios';
import React, { useEffect, useState} from 'react';
import './Conversation.css';

export default function Conversation({conversation, currentUser}) {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const friendId = conversation.members.find((m) => {
            return m !== currentUser._id
        });
        const getUser = async() => {
            try {
                const res = await axios.get('/users?userId='+friendId);
                setUser(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        getUser();
    }, [ currentUser, conversation]);

    return (
        <div className="conversation">
            <img src={user?.profilePicture} alt="" className="conversationImg" />
            <span className="conversationName">{user?.username}</span>
        </div>
    )
}
