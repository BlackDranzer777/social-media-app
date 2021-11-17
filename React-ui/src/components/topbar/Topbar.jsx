import React, { useContext } from 'react';
import './Topbar.css';
import { Person, Search, Chat, Notifications } from "@material-ui/icons";
import {Link} from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext';

export default function Topbar() {
    const {user} = useContext(AuthContext);

    const onImgClick = () => {
        return;
    }

    return (
        <div className="topBarContainer">
            <div className="topBarLeft">
                <Link to="/" style={{textDecoration:"none"}}>
                    <span className="logo">timeless</span>
                </Link>
                <Link to="/" style={{textDecoration:"none"}}>
                    <span className="logo-symbol">t</span>
                </Link>
            </div>
            <div className="topBarCenter">
                <div className="searchBar">
                    <Search className="searchIcon"/>
                    <input placeholder="Search for friend, post or video" className="searchInput" />
                </div>
            </div>
            <div className="topBarRight">
                {/* <div className="topBarLinks">
                    <span className="topBarLink">HomePage</span>
                    <span className="topBarLink">Timeline</span>
                </div> */}
                <div className="topBarIcons">
                    <div className="topBarIconItem">
                        <Person/>
                        <span className="topBarIconBadge">1</span>
                    </div>
                    <div className="topBarIconItem">
                        <Link to={`/messenger`}  >
                            <Chat style={{textDecoration:"none", color:"white"}} />
                        </Link>
                        <span className="topBarIconBadge">1</span>
                    </div>
                    <div className="topBarIconItem">
                        <Notifications/>
                        <span className="topBarIconBadge">1</span>
                    </div>
                    <Link to={`/profile/${user.username}`}>
                        <img src={user.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="" className="topBarImg" />
                    </Link>
                    <Link onClick={onImgClick}>
                        <img src={user.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="" className="topBarImg-mobile" />
                    </Link>
                </div>
            </div>
        </div>
    )
}
