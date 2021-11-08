const express = require("express");
// const Post = require("../models/Post");
const Message = require("../models/Message");

exports.postMessage = async(req,res,next) => {
    const newMessage = new Message(req.body);
    try {
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.getMessage = async(req,res,next) => {
    try {
        console.log(req.params.conversationId);
        const messages = await Message.find({
            conversationId : req.params.conversationId,
        });
        res.status(200).json(messages); 
    } catch (error) {
        res.status(500).json(error);
    }
}