const express = require("express");
const Post = require("../models/Post");
const User = require("../models/User");

//create a post
exports.postCreatePost = async(req,res, next) => {
    const newPost = new Post(req.body);
    try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    }catch(err){
        res.status(500).json(err);
    }
}

//update a post
exports.putUpdatePost = async(req,res, next) => {
    try{
        const post = await Post.findById(req.params.id); 
        if(post.userId === req.body.userId){
            await post.updateOne({$set: req.body});
            res.status(200).json("The post has been updated");
        }else{
            res.status(403).json("You can only update your post");
        }        
    } catch (err) {
        res.status(500).json(err);
    }
}

//delete a post
exports.deleteDeletePost = async(req,res, next) => {
    try{
        const post = await Post.findById(req.params.id); 
        if(post.userId === req.body.userId){
            await post.deleteOne();
            res.status(200).json("The post has been deleted");
        }else{
            res.status(403).json("You can only delete your post");
        }        
    } catch (err) {
        res.status(500).json(err);
    }
}

//like/dislike a post
exports.putLikePost = async(req,res, next) => {
    try{
        const post = await Post.findById(req.params.id); 
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push : {likes : req.body.userId}});
            res.status(200).json("The post has been liked");
        }else{
            await post.updateOne({$pull : {likes : req.body.userId}});
            res.status(200).json("The post has been disliked");
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

//get a post
exports.getGetPost = async(req,res,next) => {
    try{
        const post = await Post.findById(req.params.id); 
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
}

//get timeline posts
exports.getTimelinePost = async(req,res,next) => {
    try{
        const currentUser = await User.findById(req.params.userId);
        // console.log(currentUser);
        const userPosts = await Post.find({userId:currentUser._id});
        // console.log(userPosts);
        const friendPosts = await Promise.all(
            currentUser.followings.map(friendId => {
                return Post.find({userId:friendId});
            })
        );
        res.status(200).json(userPosts.concat(...friendPosts));
    } catch (err) {
        res.status(500).json(err);
    }
}

//get user's posts
exports.getUserProfilePost = async(req,res,next) => {
    try{
        const user = await User.findOne({username : req.params.username})
        const userPosts = await Post.find({userId : user._id});
        // console.log(userPosts);
        res.status(200).json(userPosts);
    } catch (err) {
        res.status(500).json(err);
    }
}