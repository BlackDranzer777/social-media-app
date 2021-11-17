const express = require("express");
// const Post = require("../models/Post");
const Conversation = require("../models/Conversation");

exports.postConversation = async(req, res, next) => {
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId],
    });
    try{
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    }catch(err){
        res.status(500).json(err);
    }
} 

exports.getConversation = async(req,res,next) => {
    try {
        const conversation = await Conversation.find({
            members : {$in : [req.params.userId]},
        });
        res.status(200).json(conversation);
    } catch (error) {
        res.status(500).json(error);
    }
}

//get Conversations of two userId
exports.getConversationOfTwoId = async(req,res,next) => {
    try {
        const conversation = await Conversation.findOne({
            members : {$all : [req.params.firstUserId, req.params.secondUserId]},
        });
        res.status(200).json(conversation);
    } catch (error) {
        res.status(500).json(error);
    }
}