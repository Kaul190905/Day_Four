const fs=require("fs")

exports.readData=function(path){
    if (!fs.existsSync(path)) return []
    const raw=fs.readFileSync(path)
    return JSON.parse(raw)
}

exports.writeData=function(path,data){
    fs.writeFileSync(path,JSON.stringify(data,null,2))
}