const express =require("express");
const app = express()

// midllewares
app.use(express.json())

app.listen(8000,()=>{
    cconsole.log("Server running")
})