const express=require("express")
const app=express()
const mainRoutes=require("../routes/main")

app.use(express.json())
app.use(express.static("frontend"))

app.use("/api",mainRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
  console.log(`Server started on port ${PORT}`)
})