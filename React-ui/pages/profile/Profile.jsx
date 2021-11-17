import React, {useState, useEffect} from 'react';
import './Profile.css';
import Topbar from "../../components/topbar/Topbar";
import Sidebar from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
import axios from 'axios';
import { useParams } from 'react-router';

export default function Profile() {

    const [user, setUser] = useState({})
    const username = useParams().username;
    console.log(username);

    useEffect(() => {
        const fetchUser = async() => {
            const res = await axios.get(`/users?username=${username}`);
            setUser(res.data);
        }
        fetchUser();
    }, [username])

    return (
        <>
            <Topbar/>
            <div className="profile">
                <Sidebar/>
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            {console.log("User : ",user)}
                            <img src={user.coverPicture || "https://211cgq372nca3nh5ht2i0i9h-wpengine.netdna-ssl.com/wp-content/uploads/bfi_thumb/dummy-transparent-p741e7akx1omowcu2m84zxecf5xmlfzdrnab1bc4yw.png"} alt="" className="profileCoverImg" />
                            <img src={user.profilePicture} alt="" className="profileUserImg" />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.username}</h4>
                            <span className="profileInfoDesc">{user.desc}</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        {console.log("user :",user)}
                        <Feed username={user.username}/>
                        <Rightbar user={user}/>
                    </div>
                </div>
            </div>
        </>
    )
}
