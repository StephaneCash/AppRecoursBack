const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const fileupload = require('express-fileupload');

require('dotenv').config({ path: './config/.env' })


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(
    fileupload({
        createParentPath: true,
    })
);

//Routes
const userRouter = require('./routes/userRouter');
app.use('/api/users', userRouter);

const coursRouter = require('./routes/coursRouter');
app.use('/api/cours', coursRouter);

const profRouter = require('./routes/profRouter');
app.use('/api/profs', profRouter);

const loginRouter = require('./routes/loginRouter');
app.use('/api/user/login', loginRouter);

const filiereRouter = require('./routes/filiereRouter');
app.use('/api/filieres', filiereRouter);

const recoursRouter = require('./routes/recours.routes');
app.use('/api/recours', recoursRouter);

app.listen(process.env.PORT, () => console.log('Le serveur démarre sur le port : ', process.env.PORT));