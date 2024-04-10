const express = require("express")
const cors = require("cors");
const UserRouter = require("./routes/users.routes");
const sequelize = require("./db");
const { PostRouter } = require("./routes/posts.routes");
const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors())
app.use(express.json())

app.use("/users",UserRouter);
app.use("/posts",PostRouter);
app.get("/",(req,res)=>{
    res.send("Hello Shashank")
})

app.listen(PORT,async()=>{
    try {
        await sequelize.authenticate();
        console.log("connected to Database")
        console.log(`Server is running on port ${PORT}`)
    } catch (error) {
        console.log(error)
    }
    
})