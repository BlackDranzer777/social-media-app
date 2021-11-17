import React, { useContext, useRef, useState } from 'react';
import './Share.css';
import { PermMedia, Label, Room, EmojiEmotions, Cancel } from '@material-ui/icons';
import {AuthContext} from '../../context/AuthContext';
import axios from 'axios';


export default function Share() {
    // console.log(user.profilePicture);
    const {user} = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const desc = useRef();
    const [file, setFile] = useState(null);

    // const submitHandler = async(e) => {
    //     e.preventDefault();
    //     const newPost = {
    //         userId: user._id.$oid,
    //         desc: desc.current.value,
    //     }
    //     if(file){
    //         const data = new FormData();
    //         const fileName = Date.now() + file.name;
    //         data.append("file", file);
    //         data.append("name", fileName);
    //         newPost.img = fileName;
    //         console.log(newPost);
    //         try{
    //             await axios.post("/api/upload", data);
    //         }catch(error){
    //             console.log(error);
    //         }
    //     }
    //     try{
    //         await axios.post("/posts", newPost);
    //         window.location.reload();
    //     }catch(error){
    //         console.log("Share.jsx: ",error);
    //     }
    // }
    const submitHandler = async (e) => {
        e.preventDefault();
        const newPost = {
          userId: user._id,
          desc: desc.current.value,
        };
        if (file) {
          const data = new FormData();
          const fileName = Date.now() + file.name;
          data.append("name", fileName);
          data.append("file", file);
          newPost.img = fileName;
          console.log(newPost);
          //for uploading file
          try {
            await axios.post("/upload", data);
          } catch (err) {}
        }
        try {
            //for creating post
          await axios.post("/posts", newPost);
          window.location.reload();
        } catch (err) {}
      };

    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img src={user.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="" className="shareProfileImg" />
                    <input placeholder={"What's in your mind " +user.username+"?" } className="shareInput" ref={desc}/>
                </div>
                <hr className="shareHr" />
                {file && (
                    <div className="shareImgContainer">
                        <span className="shareCancelImg"><Cancel onClick={ () => setFile(null)} /></span>
                        <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
                         
                    </div>
                )}
                <form className="shareBottom" onSubmit={submitHandler}>
                    <div className="shareOptions">
                        <label htmlFor="file" className="shareOption">
                            <PermMedia className="shareIcon" htmlColor="tomato"/>
                            <span className="shareOptionText">Photo or Video</span>
                            <input
                                style={{ display: "none" }}
                                type="file"
                                id="file"
                                accept=".png,.jpeg,.jpg"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </label>
                        <div className="shareOption">
                            <Label className="shareIcon" htmlColor="blue"/>
                            <span className="shareOptionText">Tag</span>
                        </div>
                        <div className="shareOption">
                            <Room className="shareIcon" htmlColor="green"/>
                            <span className="shareOptionText">Location</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotions className="shareIcon" htmlColor="goldenrod"/>
                            <span className="shareOptionText">Feelings</span>
                        </div>
                    </div>
                    <button className="shareButton" type="submit">Share</button>
                </form>
            </div>            
        </div>
    )
}
