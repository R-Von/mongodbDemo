var db = connect('user')
//链接数据库
var result = db.workmate.find()
//声明变量 赋值查询结果

printjson(result)


while(result.hasNext()){
  printjson(result.next())

}
