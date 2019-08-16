const mongoose=require('mongoose');

const dotenv=require('dotenv');
dotenv.config();
mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true});

var dbs = mongoose.connection;
dbs.on('error', console.error.bind(console, 'connection error:'));
dbs.once('open', ()=>
{
    console.log('Connected To DB');
});

module.exports=dbs;