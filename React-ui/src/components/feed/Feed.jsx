import React, { useContext } from 'react';
import './Feed.css';
import Share from '../share/Share';
import Post from '../post/Post';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function Feed({username}) {
    // console.log("in Feed ", user)
    const [posts, setPosts] = useState([])
    const {user} = useContext(AuthContext);
    const userId = user._id;
    console.log(userId);
    useEffect(() => {
        const fetchPosts = async() => {
            const res = username 
            ? await axios.get("/posts/profile/" +username)
            : await axios.get("/posts/timeline/"+userId);
            setPosts(res.data.sort((p1,p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt)
            }));
        }
        fetchPosts();
    }, [user.username, userId, username])
    return (
        <div className="feed">
            <div className="feedWrapper">
                {(!username || username === user.username) && <Share/>}
                {posts.map(p=>(
                    <Post key={p._id} post={p} />
                ))}
            </div>
        </div>
    )
}
