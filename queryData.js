var startTime = new Date().getTime()

var db = connect('user')

var  result = db.workmate.find({username:'oxqvb926'})

result.forEach(rs=>{
  printjson(rs)
})

var runTime = new Date().getTime() - startTime

print(`[SUCCESS] This run time is ${runTime} ms`)