var userName = "admim"
var timeStamp = Date.parse(new Date())

var jsonDatabase = {
  'loginUser':userName,
  'loginTime':timeStamp
}
//声明数据
var db = connect('user')
//链接数据库 
db.user.insert(jsonDatabase) 
//插入数据
print('[demo]log print success')
//没有错误 显示成功


[
  {name:'user1'},
  {name:'user2'},
  {name:'user3'},
  {name:'user4'}
]