import React, { useContext, useEffect, useState } from 'react';
import './Rightbar.css';
import {CardGiftcard, Add, Remove} from '@material-ui/icons';
import { Users } from '../../dummyData';
import Online from '../online/Online';
import axios from 'axios';
import {Link} from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';

export default function Rightbar({ user }) {
    // console.log("userId :", user.username)
    const {user:currentUser, dispatch} = useContext(AuthContext);
    const [followed, setFollowed] = useState(currentUser.followings.includes(user?._id));
    // setFollowed(currentUser.followings.includes(user?._id));
    useEffect(() => {
        setFollowed(currentUser.followings.includes(user?._id));
     },[currentUser, user]);
    
    // console.log("followed : ",followed);
    // // console.log("")
    // console.log("followings : ",currentUser.followings.includes(user?._id))
    
    const [friends, setFriends] = useState([])
    console.log("currentUser: ",currentUser);

    

    const submitFollowHandler = async() => {
        
        try {
            if (followed) {
              await axios.put(`/users/${user._id}/unfollow`, {
                userId: currentUser._id,
              });
              dispatch({ type: "UNFOLLOW", payload: user._id });
            } else {
              await axios.put(`/users/${user._id}/follow`, {
                userId: currentUser._id,
              });
              dispatch({ type: "FOLLOW", payload: user._id });
            }
          } catch (err) {
          }
    }

    

    useEffect(() => {
        console.log("userId: ",user?.username);
        const getFriends = async() => {
            try {
                const friendList = await axios.get(`/users/friends/${user._id}`);
                // console.log("friendList :",friendList);
                setFriends(friendList.data);
            } catch (error) {
                console.log(error);
            }
        }
        getFriends();
    }, [user]);

    // console.log(user);
    const HomeRightBar = () => {
        return (
            <>
                <div className="birthdayContainer">
                    <CardGiftcard className="birthdayImg" htmlColor="tomato"/>
                    <span className="birthdayText">
                        <b>Darlene Alderson</b> and <b>1 other friend</b> have their birthday today.
                    </span>
                </div>
                <h4 className="rightbarTitle">Online Friends</h4>
                <ul className="rightbarFriendList">
                    {Users.map(u => (
                        <Online key={u.id} user={u}/>
                    ))}
                </ul>
            </>
        )
    }

    const ProfileRightBar = () => {
        return (
            <>
                {user.username !== currentUser.username && 
                    <button className="rightbarFollowButton" onClick={submitFollowHandler}>
                        {followed ? "Unfollow" : "Follow"}
                        {followed ? <Remove/> : <Add/>}
                    </button>
                }
                {/* <h4 className="rightbarTitle">User Information</h4> */}
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">City:</span>
                        <span className="rightbarInfoValue">{user.city}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">From:</span>
                        <span className="rightbarInfoValue">{user.from}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Relationship:</span>
                        <span className="rightbarInfoValue">{user.relationship ? "In relationship" : "Single"}</span>
                    </div>
                </div>
                <h4 className="rightbarTitle">User Followings</h4>
                <div className="rightbarFollowings">
                    {friends.map(friend => {
                        // {console.log("Friend :",friend)}
                        return(
                            <Link to={'/profile/'+friend.username} style={{textDecoration:"none"}}>
                                <div className="rightbarFollowing">
                                    <img src={friend.profilePicture || "https://bizraise.pro/wp-content/uploads/2014/09/no-avatar-300x300.png"} alt="" className="rightbarFollowingImg"/>
                                    <span className="rightbarFollowingName">{friend.username}</span>
                                </div>
                            </Link>
                        );
                    })}
                    {console.log("friends: ",friends)}
                </div>
            </>
        )
    }

    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                {user ? <ProfileRightBar/> : <HomeRightBar/>}
            </div>
        </div>
    )
}
