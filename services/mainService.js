const path = require("path")
const {readData,writeData}=require("../utils/fileStorage")
const idGen=require("../utils/idGenerator")
const cryptoService=require("./cryptoService")

const FILE=path.join(__dirname, "..", "data", "data.json")

exports.create=function(data){
    const list=readData(FILE)
    const item={
        id:idGen(),
        title:data.title,
        secret:cryptoService.encrypt(data.secret)
    }
    list.push(item)
    writeData(FILE,list)
    return item
}

exports.list=function(){
    const list = readData(FILE)
    return list.map(item => ({
        ...item,
        secret: cryptoService.decrypt(item.secret) || "DECRYPTION_FAILED"
    }))
}

exports.remove=function(id){
    const list=readData(FILE)
    const initialLength = list.length
    const newList=list.filter(i=>i.id!=id)
    if (newList.length === initialLength) return false
    writeData(FILE,newList)
    return true
}