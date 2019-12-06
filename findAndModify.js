var db = connect('user')

var myModify = {
  findAndModify : 'workmate',
  query : {name : 'JSPang' }, 
  update:{$set:{age:18}},
  new:true   
}

var ResultMessage = db.runCommand(myModify)

printjson(ResultMessage)
