const express=require("express")
const cors=require("cors")
const { askRouter } = require("./routes/ask.router")
const app=express()
app.use(cors())
app.use(express.json())
app.use("/ask",askRouter)
require("dotenv").config()
const port=process.env.port||8080
app.listen(port,()=>{
  console.log(`Server is running at port ${port}`)
})

