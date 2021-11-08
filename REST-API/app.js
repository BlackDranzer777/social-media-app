const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const multer = require('multer');
const path = require('path');

const userRoute = require('./routes/usersRoutes');
const authRoute = require('./routes/authRoutes');
const postRoute = require('./routes/postsRoutes');
const conversationRoute = require('./routes/conversationsRoutes');
const messageRoute = require('./routes/messagesRoutes');

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true}, () => {
    return console.log('connected to mongodb!');
});

app.use("/images", express.static(path.join(__dirname, "public/images")));

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        // console.log(req.body.name)
      cb(null, req.body.name);
    },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});


app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/messages', messageRoute)
app.use('/api/conversations', conversationRoute)

app.listen(3001,() => {
    console.log("Backend server is running!");
});

