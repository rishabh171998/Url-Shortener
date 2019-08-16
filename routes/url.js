//Have POST Route 
//Links get shorten here
const express=require('express');
const router=express.Router();
const validUrl=require('valid-url');
const shortId=require('shortid');
const config=require('config');
const Url=require('../models/url');

//@route POST /api/url/shorten
//@desc  create short url

router.post('/shorten', async (req,res)=>
{
    const {longUrl}=req.body;
    const baseUrl=config.get('baseUrl');
    if(!validUrl.isUri(baseUrl))
    {
        return res.status(401).send('Invalid Base URI');

    }

    //create url code
    const urlcode=shortId.generate();



    //check longUrl
    if(validUrl.isUri(longUrl))
    {

        try{
            let url= await Url.findOne({longUrl})//Long URL already exist in database then return it as it is
            if(url)
            {
                res.json(url); 
            }
            else{
                const shortUrl=baseUrl + '/' +urlcode;
                url =new Url(
                    {
                        urlcode,
                        longUrl,
                        shortUrl,
                        date:new Date()
                    }
                );
                  await url.save();
                    res.send(url);
            }
        }
        catch(err)
        {
            console.log(err);
            res.status(400).send('Server error');
        }
    }
    else{
        res.status(401).json('Invalid Long URL');
    }

})


module.exports=router;