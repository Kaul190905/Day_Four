const service=require("../services/mainService")

exports.create=(req,res)=>{
    const { title, secret } = req.body
    
    if (!title || !secret) {
        return res.status(400).json({ error: "Title and Secret are required" })
    }
    
    try {
        const item=service.create(req.body)
        res.status(201).json(item)
    } catch (err) {
        res.status(500).json({ error: "Failed to create entry" })
    }
}

exports.list=(req,res)=>{
    try {
        const data=service.list()
        res.json(data)
    } catch (err) {
        res.status(500).json({ error: "Failed to list entries" })
    }
}

exports.remove=(req,res)=>{
    try {
        service.remove(req.params.id)
        res.json({message:"deleted"})
    } catch (err) {
        res.status(500).json({ error: "Failed to delete entry" })
    }
}
exports.update=function(req,res){
res.send("PUT working")
}

exports.modify=function(req,res){
res.send("PATCH working")
}