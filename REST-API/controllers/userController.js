const User = require('../models/User');
const bcrypt = require('bcrypt');


//Register
exports.postRegister = async(req, res, next) => {
    try{
        //generate hashed password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        
        //create new user
        const newUser = await new User({
            username : req.body.username,
            email : req.body.email,
            password : hashedPassword
        });

        //save user and response
        const user = await newUser.save();
        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
    }
    
};

//Login

exports.postLogin = async(req,res) => {
    try{
        const user = await User.findOne({ email: req.body.email });
        if(user){
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            (!validPassword && res.status(400).json("wrong password")) || res.status(200).json(user);
        }else{
            res.status(400).json("user not found");
        }
    }catch(err){
        res.status(500).json(err);
    }
};

//update user
exports.putUpdateUser = async(req,res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }catch(err){
                return res.status(500).json(err);
            }
        }
        try{
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set:req.body
            });
            res.status(200).json("Account has been updated");
        }catch(err){
            return res.status(500).json(err);
        }
    }
    else{
        return res.status(403).json("You can only update your account");
    }
};

//delete user
exports.deleteDeleteUser = async(req,res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin){
        try{
            const user = await User.deleteOne({_id: req.body.userId});
            res.status(200).json("Account has been deleted");
        }catch(err){
            return res.status(500).json(err);
        }
    }
    else{
        return res.status(403).json("You can only delete your account");
    }
};

//get a user
exports.getGetUser = async(req,res) => {
    const userId = await req.query.userId;
    const username = await req.query.username;
    // console.log("username : ",username);
    try{
        const user = userId 
        ? await User.findById(userId) 
        : await User.findOne({username : username});
        const {password, updatedAt, ...data} = user._doc //user._doc contains all the data of user object
        res.status(200).json(data);
    }catch(err){
        return res.status(500).json(err);
    }
};

//follow a user
exports.putFollowUser = async(req,res) => {
    // console.log("paramsId :",req.params.id);
    // console.log("userId :",req.body.userId)
    if(req.body.userId !== req.params.id){
        try{
            console.log("req.params.id: ",req.params.id)
            console.log("req.body.userId: ",req.body.userId)
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(!user.followers.includes(req.body.userId)){
                console.log("Inside if block")
                await user.updateOne({$push : {followers: req.body.userId}});
                await currentUser.updateOne({$push : {followings: req.params.id}});
                res.status(200).json('user has been followed');
                // console.log()
            }else{
                console.log("Inside else block")
                res.status(403).json('you already follow this user');
            }
        }catch(err){
            return res.status(500).json(err);
        }
    }
    else{
        return res.status(403).json("You can not follow yourself");
    }
};

//unfollow a user
exports.putUnfollowUser = async(req,res) => {
    if(req.body.userId !== req.params.id){
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(user.followers.includes(req.body.userId)){
                await user.updateOne({$pull : {followers: req.body.userId}});
                await currentUser.updateOne({$pull : {followings: req.params.id}});
                res.status(200).json("user has been unfollowed")
            }else{
                res.status(403).json("you don't follow this user");
            }
        }catch(err){
            return res.status(500).json(err);
        }
    }
    else{
        return res.status(403).json("You can not unfollow yourself");
    }
};


//get all friends of a user
exports.getGetFriends = async(req,res,next) => {
        try{
            const user = await User.findById(req.params.userId);
            const friends =  await Promise.all(
                user.followings.map(friendId => {
                    return User.findById(friendId)
                })
            );
            let friendList = [];
            friends.map(friend => {
                console.log("friend :",friend._id.toString())
                const { _id,username,profilePicture } = friend;
                const friendId = friend._id.toString();
                friendList.push({friendId,username,profilePicture });
            });
            // console.log("friendList: ",friendList)
            await res.status(200).json(friendList);
        }catch(err){
            res.status(500).json(err);
        }
}