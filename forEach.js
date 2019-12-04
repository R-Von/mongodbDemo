var db = connect('user')

var result = db.workmate.find()

result.forEach(element => {
  printjson(element)
});