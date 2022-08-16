const express = require('express');
const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors({
    credentials : true,
    origin : "http://localhost:3000"
}));

const dotenv = require('dotenv');
dotenv.config({ path: './config/Config.env' });
const PORT = process.env.PORT;

require('./db/Conn');

const userRouter = require('./routes/UserRoute');
app.use('/api/user', userRouter);

const blogRouter = require('./routes/BlogRoute');
app.use('/api/blog', blogRouter);

app.listen(PORT, (err) => {
    if (err) {
        console.log("Error ehile making connection");
    }
    console.log(`Server is running on port no ${PORT}`);
});