import React, { useState, useEffect, useContext } from 'react';
import './Post.css';
import {Favorite, MoreVert, ThumbUp} from '@material-ui/icons';
import axios from 'axios';
import {format} from 'timeago.js';
import {Link} from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
// import { Users } from '../../dummyData';


export default function Post({post}) {
    

    // console.log(post);
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [likeButtonColor, setLikeButtonColor] = useState('black');
    const [user, setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user:currentUser} = useContext(AuthContext);

    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id));
    },[post.likes, currentUser._id]);

    const likeHandler = () => {
        try{
            axios.put('/posts/'+post._id+"/like", {userId:currentUser._id});
        }catch(err){
            console.log(err);
        }
        setLike(isLiked ? like-1 : like+1);
        setIsLiked(!isLiked);
        setLikeButtonColor(isLiked ? 'black' : 'blue');
    }

    useEffect(() => {
        const fetchUser = async() => {
            const res = await axios.get(`/users?userId=${post.userId}`);
            setUser(res.data);
        }
        fetchUser();
    }, [post.userId])

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`/profile/${user.username}`}>
                            <img 
                                src={user.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} 
                                alt="" 
                                className="postProfileImg" 
                            />
                        </Link>
                        <span className="postUsername">{user.username}</span>
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert/>
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post.desc}</span>
                    <img src={PF+ post.img} alt="" className="postImg" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <Favorite className="postBottomLeftIcon" htmlColor="tomato"/>
                        <ThumbUp className="postBottomLeftIcon" htmlColor={likeButtonColor} onClick={likeHandler}/>
                        <span className="postLikeCounter">
                            {like} people like it
                        </span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{post.comment} comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
