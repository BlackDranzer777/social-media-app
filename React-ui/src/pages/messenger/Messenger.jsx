import React, { useContext, useState, useEffect, useRef } from 'react';
import './Messenger.css';
import Topbar from '../../components/topbar/Topbar';
import Conversation from '../../components/conversation/Conversation';
import Message from '../../components/message/Message';
import ChatOnline from '../../components/chatOnline/ChatOnline';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import {io} from 'socket.io-client';

export default function Messenger() {
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const socket = useRef();
    const messageRef = useRef();
    const {user} = useContext(AuthContext);
    const scrollRef = useRef();
    const [senderProfilePicture,setSenderProfilePicture] = useState(null); 
    const [messageNotification, setMessageNotification] = useState(0);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth"});
    },[messages]);

    useEffect(() => {
        socket.current = io("ws://timeless.zapto.org:8900");
        socket.current.on("getMessage", (data) => {
            setArrivalMessage({
                senderId : data.senderId,
                text : data.text,
                createdAt : Date.now()
            })
        });
    },[]);


    //This UseEffect needs further updation
    // useEffect(() => {
    //     if(user._id !== arrivalMessage?.senderId){
    //         setMessageNotification(messageNotification + 1);
    //     }
    //     // console.log("currentChat : ", currentChat);
    //     // console.log("Message sender : ", arrivalMessage?.senderId);
    //     // console.log("Message Notification : ", messageNotification);
    // },[arrivalMessage]);





    useEffect(() => {
        arrivalMessage && 
        currentChat?.members.includes(arrivalMessage.senderId) && 
        setMessages((prev) => [...prev, arrivalMessage]);
        
    },[arrivalMessage, currentChat]);


    //useEffect for socket server
    useEffect(() => {
        socket.current.emit("addUser", user._id);
        socket.current.on("getUsers", (users) => {
            setOnlineUsers(user.followings.filter(f=>users.some(u=>u.userId === f)));
        })
    },[user]);



    useEffect(() => {
        const getConversations = async() => {
            try {
                const res = await axios.get('/conversations/'+user._id);
                setConversations(res.data);
            } catch (error) {
                console.log(error)
            }
        }
        getConversations();
    }, [user._id])

    useEffect(() => {
        const getMessages = async() => {
            try {
                const res = await axios.get('/messages/'+currentChat?._id);
                setMessages(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        getMessages();
    },[currentChat]);

    const checkMessage = (message) => {
        message = message.replace(/\n|\r/g, "");
        return (message === null || message.match(/^ *$/) !== null);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log("newMessage : ", newMessage )
        if(checkMessage(newMessage)){
            return;
        }
        const message = {
            sender : user._id,
            text : newMessage,
            conversationId : currentChat._id
        }

        const receiverId = currentChat.members.find(
            (member) => member !== user._id
        );

        socket.current.emit("sendMessage", {
            senderId : user._id,
            receiverId,
            text : newMessage
        });

        try {
            const res = await axios.post("/messages", message);
            setMessages([...messages, res.data]);
            setNewMessage("");
        } catch (error) {
            console.log(error)
        }
    };

   
    const onClickConversation = async(conversation) => {
        setCurrentChat(conversation);
        const friendId = conversation.members.find((m) => {
            return m !== user._id
        });
        const getUser = async() => {
            try {
                const res = await axios.get('/users/profilePicture/'+friendId);
                // console.log("res.data :",res.data);
                setSenderProfilePicture(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        getUser();
    }
    

    const onPressEnter = (event) => {
        if(event.key === "Enter" && !event.shiftKey){
            if(checkMessage(messageRef.current.value)){
                console.log("checkMessage :", checkMessage(messageRef.current.value))
                return;
            }
            console.log("length :",messageRef.current.value.charCodeAt(0));
            handleSubmit(event);
        }
    }
    console.log(currentChat);

    return (
        <>
            <Topbar/>
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input type="text" placeholder="Search for friends..." className="chatMenuInput" />
                        {conversations.map((c) => {
                            return (
                            <div onClick={() => onClickConversation(c)}>
                                <Conversation conversation={c} currentUser={user}/>
                            </div>
                            )
                        })}
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {
                            currentChat ? 
                        (<>
                            <div className="chatBoxTop">
                                {messages.map((m) => {
                                    return (<div ref={scrollRef}><Message userProfilePicture={user.profilePicture} senderProfilePicture={senderProfilePicture}  message={m} own={m?.sender === user._id}/></div>)
                                })}  
                            </div>
                            <div className="chatBoxBottom">
                                <textarea 
                                    name="" 
                                    id=""
                                    ref={messageRef}
                                    placeholder="Type something ..." 
                                    className="chatMessageInput"
                                    onChange={(e) => {setNewMessage(e.target.value)}}
                                    value={newMessage}
                                    // onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
                                    onKeyPress={(e) => onPressEnter(e)}
                                >
                                </textarea>
                                <button className="chatSubmitButton"  onClick={handleSubmit}>Send</button>
                            </div>
                        </>)
                        : (<span className="noConversationText">Open a conversation to start a chat.</span>)}
                    </div>
                </div>
                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <ChatOnline 
                            onlineUsers={onlineUsers} 
                            currentId={user._id} 
                            setCurrentChat={setCurrentChat}
                            onClickConversation={onClickConversation}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
