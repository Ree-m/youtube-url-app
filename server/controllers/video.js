const Video = require("../models/Video.js")


exports.addVideo=async(req,res)=>{
const {url}=req.body
  const newVideo = new Video({
    url: url,
  });
  try {
    const newVideoToSave = await newVideo.save();
    return res.status(200).json(newVideoToSave);
  } catch (error) {
      console.log(error);
      res.status(500).json(`Server Error:${error}`);
    
  }
}

exports.getAllVideos=async(req,res)=>{
    try{
        const videos = await Video.find().sort({createdAt:"desc"})
        return res.status(200).json(videos)
        
    }catch(error){
        console.log(error);
        res.status(500).json(`Server Error:${error}`);
  
    }
}