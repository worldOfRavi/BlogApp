import fs from 'fs';
import Post from '../model/postModel.js';
import jwt from 'jsonwebtoken';


// logic to create the blog
export const createPost = async(req,res)=>{
    try {
        const {originalname,path} = req.file;
        const parts = originalname.split(".");
        const ext = parts[1];
        // const ext = parts[parts.length-1];
        const newPath = path+"."+ext;
        fs.renameSync(path,newPath);

        // logic for fetching the author data
        const {token} = req.cookies;

       const user =  await jwt.verify(token,process.env.SECRET_KEY);
            
        const {title, summary, content} = req.body;
            const newPost = await Post.create({
            title,
            summary,
            content,
            cover:newPath,
            author:user.userId
            })
        res.status(201).json({newPost,message:"Blog posted successfully"})

        
        
    } catch (error) {
        res.status(500).json({message:"Error in post creation"})
    }
}


// logic to get all the blog data
export const getAllPost = async(req,res)=>{
    try {
        const posts = await Post.find()
        .populate('author',['username'])
        .sort({createdAt:-1})
        .limit(10);
        if(!posts){
            return res.status(404).json({message:"No any blog has been posted yet..."});
        }
        res.status(201).json({posts,message:"Available posts"});
    } catch (error) {
        res.status(500).json({message:"Error while fetching the posts"});
    }
}

// logic for getting post details
export const postDetails = async(req, res)=>{
    try {
        const id = req.params.id;
        const postDetails = await Post.findById(id).populate('author',['username']);
        res.status(201).json({postDetails})
    } catch (error) {
        res.status(500).json({message:"Error while fetching post details"})
    }
}

export const EditPost = async(req,res)=>{
    try {
        let newPath = null;
        if(req.file){
            const {originalname,path} = req.file;
            const parts = originalname.split(".");
            const ext = parts[1];
            newPath = path+"."+ext;
            fs.renameSync(path,newPath);
        }
        const id = req.params.id;
        const post = await Post.findById(id);
        if(!post){
            return res.status(404).json({message:"Post not found"});
        }
        const {token} = req.cookies;
        const user = await jwt.verify(token,process.env.SECRET_KEY);
        const {title, summary, content} = req.body;
        const updated = await Post.updateOne({_id:id, author:user.userId},{
            title,
            summary,
            content,
            cover:newPath ? newPath : post.cover,
        })
        if(!updated){
            return res.status(500).json({message:"Error while updating"}) 
        }
        res.status(200).json({message:"Your blog updated successfully"})
        
    } catch (error) {
        res.status(500).json({message:"Errro in post editing API"})
    }
}