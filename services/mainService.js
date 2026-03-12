exports.update = function(id,data){

let list = storage.read()

const index = list.findIndex(i=>i.id == id)

list[index] = { id, ...data }

storage.write(list)

return list[index]

}

//PATCH

exports.update = function(id,data){

let list = storage.read()

const index = list.findIndex(i=>i.id == id)

list[index] = { id, ...data }

storage.write(list)

return list[index]

}