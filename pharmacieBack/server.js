const express = require('express');
const session = require('express-session'); 
require('./config/connexion');
const cors = require('cors');
const app = express();
const PORT =  8012;
const authMiddleware = require('./middlewares/auth'); 
const assuranceRoutes = require('./routes/assuranceRoute');
const adherantRoutes = require('./routes/adherantRoute');
const medicammntRoutes = require('./routes/medicamntRoute');
const userRoutes = require('./routes/userRoutes');
const ordonnanceRoutes = require('./routes/ordonnanceRoute');
const borderauRoutes = require('./routes/bordereauRoute');

app.use(cors());
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(
    session({
        secret: "my secret key",
        saveUninitialized: true,
        resave: false,
    })
);
app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
})
app.use(express.static('Upload'));
app.use((req , res , next)=>
{
console.log("Http method  - " + req.method + " url  -- " + req.url);
next();
}) ;
app.use('/assurances' ,authMiddleware(['admin', 'user']), assuranceRoutes);
app.use('/adherant',authMiddleware(['admin', 'user']), adherantRoutes);
app.use('/medicament',authMiddleware(['admin', 'user']), medicammntRoutes);
app.use('/user', userRoutes);
app.use('/ordonnance',authMiddleware(['admin', 'user']), ordonnanceRoutes);
app.use('/borderau',authMiddleware(['admin', 'user']), borderauRoutes);
app.listen(PORT, () =>{
    console.log(`server started at http://localhost:${PORT}`);
})