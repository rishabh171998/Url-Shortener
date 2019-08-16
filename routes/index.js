//All the Short URL Redirect to long URLS
const express=require('express');
const router=express.Router();

const Url=require('../models/url');


//@route GET /:code
//@desc  Redirect To Long URL

router.get('/:code',async (req,res)=>
{
try
{
const url=await Url.findOne({urlcode:req.params.code});
if(url)
{
return res.redirect(url.longUrl);


}
else
{
return res.status(404).json('No Url Found');
}

}
catch(err)
{
console.log(err);
res.status.json('Server error');
}
})

module.exports=router;