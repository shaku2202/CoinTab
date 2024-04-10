const express = require("express");
const { post } = require("../models/posts.model");
const PostRouter = express.Router();
const axios = require("axios")
const excel = require('exceljs');
const stream = require("stream");

PostRouter.post("/",async(req,res)=>{
    try {
        
        let posts = await post.bulkCreate(req.body);
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Error "});
    }
})
PostRouter.get("/",async(req,res)=>{
    try {
        let {userId} = req.query;
        let posts = await post.findAll({where: {userId}});
       
        let data = await axios(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        data = data.data
        if(posts.length != 0){
           return  res.status(200).json({status:"added",data})
        }
        
        return res.status(200).json({status:"not added",data});
    } catch (error) {
        console.log(error)
        res.status(500).json({Error:"Error while getting posts"})
    }
})

PostRouter.get('/download/:userId', async (req, res) => {
    const { userId } = req.params;
    
    try {
      const posts = await post.findAll({where:{userId: userId}});
  
      const workbook = new excel.Workbook();
      const worksheet = workbook.addWorksheet('Posts');
      worksheet.columns = [
        { header:  'UserId',key:'userId',width: 10},{header: "Postid",key:"id",width: 10},{ header: 'Title', key: 'title', width: 60 },
        { header: 'Body', key: 'body', width: 80 },
      ];

      posts.forEach((post) => {
        worksheet.addRow({userId:post.userId, id:post.id, title: post.title, body: post.body });
      });
  
      const bufferStream = new stream.PassThrough();
    workbook.xlsx.write(bufferStream).then(() => {
      bufferStream.end();
    });
      
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', `attachment; filename=posts_${userId}.xlsx`);
  
      bufferStream.pipe(res);
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: 'Error generating file' });
    }
  });
  
module.exports={
    PostRouter
}