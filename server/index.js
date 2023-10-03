const express =require("express");
const app = express()
const mainRoutes= require("./routes/main.js")
// const userRoutes= require("./routes/user.js")

// midllewares
app.use(express.json())

app.use("/",mainRoutes)
// app.use("/user",userRoutes)


app.listen(8000,()=>{
    console.log("Server running")
})