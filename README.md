### 非关系型数据库
MongoDB是非关系型数据库
关系型数据库 就是建立在关系模型基础上的数据库
> MongoDB是一个基于分布式文件存储的数据库，由C++语言编写。目的是为WEB应用提供扩展的高性能的数据存储解决方案。MongoDB是一个介于关系型数据库和非关系型数据库之间的产品，是非关系型数据库当中功能最丰富，最像关系数据库的。他支持的数据结构非常松散，是类似json的bson格式，因此可以存储比较复杂的数据类型。Mongo最大的特点是他支持的查询语言非常强大，其语法有点类似于面向对象的查询语言，几乎可以实现类似关系数据库单表查询的绝大部分功能，而且还支持对数据建立

 - 实质：非关系型数据库是传统关系型数据库的功能阉割版 通过减少用不到或者很少用的功能来大幅度提高产品性能
 - 价格：目前非关系型数据库都是免费的
 - 功能：实际开发中 很多业务需求 其实并不需要完整的关系型数据库功能 非关系型数据库的功能就足以使用
 
### 存储结构
关系型数据库的数据结构都是 顶层是库 库下面是表 表下面是数据  但是MongoDB有不同 库下面是集合 集合下面是文件 
其实 数据表就是集合  数据行就是文件

### 基础Shell命令
- ```show dbs```:显示已有数据库 默认有local admin(config) 这是MongoDB的默认数据库
- ```use admin```:进入数据 可以理解为使用数据库
- ``` show collections ```:显示数据库中的集合(关系型中叫表)
- ```db```:显示当前位置 也就是当前使用的数据库名称

### 数据操作的基础命令
- ```use db(建立数据库)```:use不仅可以进入一个数据库 倘若库不存在 还可以建立一个库 但是在没有集合前 它是默认为空
- ```db.集合.insert```:新建数据集合和插入文件(数据) 集合不存在的时候 就新建一个集合 并向里边插入数据 示例 ```db.user.insert({name:'admin'})```
- ```db.集合.find()```:查询所有数据,这条命令会列出集合下的所有数据 示例``` db.user.find()```
- ```db.集合.findOne()```:查询第一个文件数据 需注意MongoDB的组合单词都是使用首字母小写的驼峰式写法
- ```db.集合.update({查询},{修改})```:修改文件数据 第一个是查询条件 第二个是要修改成的值 
- ```db.集合.remove(条件)```:删除文件数据
- ```db.集合.drop()```删除整个集合
- ```db.dropDatabase()```删除整个集合

### js操作MongoDB
```
var data = {
    name:'11',
    time:Date.parse(new Date())
}
//声明数据
var db = connect('user')
//链接数据库
db.user.insert(data)
//插入数据
```
### 修改 Update
#### $set修改器
用来修改一个指定的键值(key) 
```
db.workmate.update({name:'user'},$set:{age:'11',sex:'1'})
```
#### 修改嵌套内容(内嵌文档)
例如一个数据是 
```
{
    name:'allen',
    age:62,
    children:{
        child1:'bob',
        child2:'clid',
        child3:'deff'
    }
}
```
修改内嵌的属性 同样使用```$set```
```
db.workmate.update({'name':'allen'},{$set:{'children.child3':'frank'}})
```
#### $unset用于将key删除
它的作用是删除一个key值和键 
```
db.workmate.update({'name':'allen'},{$unset:{'age':''}})
```
#### $inc对数字进行计算
对value进行操作 但是修改的必须是数字 对字符串不起效果 
```
db.workmate.update({'name':'allen'},{$inc:{'age':-2}})
```
#### multi选项 
对每一项数据进行修改
```
db.workmate.update({},{$set:{interest:[]}},{multi:true})
```
multi 有 true 和 false 两个值 true代表全部修改 false代表只能修改一个(默认值)
#### upsert 选项
upsert是在找不到值得情况下 直接插入这条数据

```
db.workmate.update({name:'xiaoWang'},{$set:{age:20}},{upsert:true})
```
upsert 也有两个值 true代表没有就添加 false代表没有不添加(默认值)
不添加本属性去update 没有任何效果

### update数组修改器
数组修改器可以修改内嵌文档 也就是对象形式的数据

#### $push追加数组/内嵌文档值

$push的功能是追加数组中的值 但是 我们也经常用它操作内嵌的文档 也就是{}对象的值
```
db.workmate.update({'name':'xiaowang'},{$push:{interest:'draw'}})
```
$push修饰符也可以为内嵌文档增加值 例如
```
db.workmate.update({'name':'allen'},{$push:{'child.children4':'steve'}})
```
#### $ne查找是否存在
```$ne```功能 就是检查一个值是否存在 如果不存在再执行操作 存在就不执行 
没有则修改 有则不修改
例如
```
db.workmate.update({'name':'allen',interest:{$ne:'play games'},{$push:{interest:'Game'}})
```
#### $addToSet升级版的$ne
$ne的升级版本(查找是否存在 不存在就push上去) 操作起来更为直观方便 
```
db.workmate.update({name:'xiaoWang'},{$addToSet:{interest:'readBook'})
```
查看小王(xiaoWang)兴趣(interest)有没有阅读(readBook)这项 没有则加入

#### $each批量追加 
传入一个数组 一次增加多个值 相当于批量操作 性能比循环要好 
```
var newInterest = ['Sing','Dance','Code']
db.workmate.update({name:'xiaoWang',{$addToSet:{interest:{$each:newInterest}}})
```
#### $pop删除数组值
$pop只删除一次 并不是删除所有数组中的值 有两个选项 1和-1
- 1 从数组末端进行删除
- -1 从数组开端进行删除
```
db.workmate.update({name:'xiaoWang'},{$pop:{interest:1}})
```
删除小王的最后一个爱好

#### 数组定位修改
有时候只知道修改数组的第几位 但是不知道是什么 这时候 我们使用interest.int的形式
定位是按照数组 从0开始计数
```
db.workmate.upate({name:'xiaoWang'},{$set:{'interest.2':'xxx'}})
```
### 修改:状态返回与安全
在实际工作中 我们使用update的时候不多 在修改的时候更多使用findAndMofify 它返回一些必要的参数 可以对修改多很多控制力  控制力的加强也就是对安全的强化能力的加强

#### 应答式写入
在操作完成之后 数据库会给与相应的回应
应答式写入会直接返回结果 结果里面的包含项会有很多 这样我们可以更好的进行程序的控制和安全机制的处理

#### db.runCommand()
它是数据库运行命令的执行器 执行命令首选就要使用它  因为它在Shell和驱动程序间提供了一致的接口 几乎操作数据的所有操作 都可以使用runCommand来执行

```
db.workmate.update({sex:1},{$set:{money:1000}},false,true)

var resultMessage = db.runCommand({getLastError:1})

printjson(resultMessage)

```
可以看到返回结果 
```
{
	"connectionId" : 7,
	"updatedExisting" : true,
	"n" : 2,
	"syncMillis" : 0,
	"writtenTo" : null,
	"err" : null,
	"ok" : 1
}
```
- false: ```update```的false是upsert的简写  代表没有此条数据时不增加
- true:true是multi的简写 代表修改所有
- getLastError:1  表示返回功能错误
- printjson 表示以json对象的格式输出到控制台

db.listCommands()： 查看所有的Command命令

查看与数据库是否链接成功  可以使用Command命令
```
db.runCommand({ping:1})
```
返回 ok:1 代表链接成功

#### findAndModify
从字面意思理解 findAndModify是查找并修改的意思
配置它可以在修改后返回修改结果

```
var myModify = {
    findAndModify:'workmate',
    query:{name:'xiaoWang'},
    update:{$set:{age:18}},
    new:true   //更新完 需要查看结果 若false 则不进行查看
}
var ResultMessage = db.runCommand(myModify)

printjson(ResultMessage)
```
findAndModify的性能没有直接使用db.collections的性能好 但考虑到安全性 实际工作中使用它

findAndModify的属性值
- query：需要查询的条件/文档
- sort：进行排序
- remove：```[boolean]``` 是否删除查找到的文档 true 删
- new:```[boolean] ``` 返回更新前的文档还是更新后的文档
- field:需要返回的字段
- upsert:没有这个值是否增加


### 查询 find的不等修饰符 

#### 简单查找
```
db.workmate.find({'skill.skillOne':'HTML+CSS'})
```
#### 筛选字段
返回数据项过多 这是可以对键名进行筛选
```
db.workmate.find({'skill.skillOne':'HTML+CSS'},{name:true,skill.skillOne:true})
```
这些操作都是在做一些等于操作 其实不止等于查询 还有更多的查询条件

#### 不等修饰符
- 小于($lt) less-than
- 小于等于($lte) less-than-equal 
- 大于($gt) greater-than
- 大于等于($gte) greater-than-equal
- 不等于($ne) not-equal
查找年龄大于25小于30的人员
```
db.workmate.find(
    {age:{$lte:30,$gte:25}},
    {name:true,age:true,skill.skillOne:true}
)
```
#### 日期查找
MongoDB也提供了方便的日期查找方法 
查找注册日期大于2018年1月10日的数据
```
var startDate = new Date('2018/01/10')
db.workmate.find(
{regeditTime:{$gt:startDate}},
{name:true,age:true}
)
```

### 多条件查询
有时候需要查询的值不只是一个简单的条件 需要多个条件进行查询
#### $in修饰符
in修饰符可以轻松解决一键多值得查询情况
例如查询同事中年龄是25岁和33岁的
```
db.workmate.find({age:{$in:[25,33]}},{name:1,skill.skillOne:1,age:1})
```
与$in相对的修饰符是$nin 即查询符合查询条件以外的

#### $or修饰符
or用来查询多个键值的情况 比如查询大于30岁或者会做php的信息 
主要区别是两个Key值
```
db.workmate.find({$or:[{age:{$gte:30}},{skill.skillThree:'PHP'}]}),{name:1,'skill.skillThree':1,age:1}
```
or就是或的意思 对应的还有$nor
#### $and修饰符
$and用来查找几个key都满足的情况 比如 查询大于30岁的且会PHP的  必须全部满足
```
db.workmate.find({
    $and:[
        {'age':{$gt:30}},
        {'skill.skillThree':'PHP'}
    ]
},{age:1,name:1,'skill.skillThree':1})
```
#### $not修饰符
用来查询条件之外的值 需要注意的是$not修饰符不能应用在条件语句中 只能在外边进行查询使用
查找年龄大于20 小于30的人员信息
```
db.workmate.find({
    age:{
        $not:{
            $lte:30,
            $gte:20
        }
    }
},{
    name:1,'skill.skillOne':1,age:1
})
```

### find数组查询
#### 基本数组查询
最简单的数组查询
```
db.workmate.find(
    {interest:['画画','聚会','看电影']},
    {name:1,interest:1,age:1}
)
```
模糊匹配某一项 
```
db.workmate.find(
    {interest:'画画'}，
    {name:1,age:1,interest:1}
)
```
#### $all数组多项查询 
查询出喜欢看电影和看书的人员信息 也就是对数组中的对象进行查询 这时候 用一个新的查询修饰符$all
```
db.workmate.find({interest:{$all:['看电影','看书']}},{name:1,interest:1,age:1})
```
#### $in 数组的或查询 
用$all修饰符是需要满足所有条件 $in主要满足数组中的一项就可以被查出来
```
db.workmate.find(
{interest:{$in:['看电影','看书']}},
{age:1,name:1,interest:1}
)
```

#### $size 数组个数查询
$size修饰符 根据数组的数量查询出信息 比如我们需要查找兴趣数量为5个的 人员信息 这时候就可以使用$size
```
db.workmate.find(
{interest:{$size:5}},
{name:1,age:1}
)
```
#### $slice 显示选项
有时候并不需要显示出数组中的所有值 只需要显示前两项  
```
db.workmate.find({},{name:1,interest:{$slice:2},age:1})
```

### find的参数使用方法
find的参数
- query:查询条件 MongoDB默认的第一个参数
- fields:(返回内容)查询出来后显示的结果样式 true和false控制是否显示
- limit:返回数量 后面跟数字 控制每次查询返回的结果数量
- skip:跳过多少个显示 和limit结合可以实现分页
- sort:排序方式 从小到大 使用1  从大到小 用-1

#### 分页demo
我们可以对数据进行分页  每页显示两个 并按照年龄大小 从小到大进行排序

```
db.workmate.find({},{name:1,age:1}.limit(0).skip(2).sort({age:1}))
```
#### $where修饰符
强大的修饰符 可以使用js的方法进行复杂查询
```
db.workmate.find({$where:'this.age>30'},{name:true,age:true,_id:false})
```

### 在js中使用
#### hasNext循环结果
```
var db =  connet('company')
//链接数据库
var result = db.workmate.find()
//声明查询结果
while(result.hasNext()){
    printjson(result.next())
}
```
#### forEach循环
同样可以使用forEach循环来循环输出结果
```
var db = connect('company')
var result = db.workmate.find()
result.forEach(function(item){
    printjson(item)
})
```


### 索引
#### 随机生成百万条数据
#### 普通查询性能
普通查询 随机查找一个用户名 计算出查询和打印时间
```
var startTime = new Data().getTime()
var db = connect('user')
var result = db.randomInfo.find({username:'oxqvb926'})
result.forEach(rs=>{
    printjson(rs)
})
var runTime = new Date().getTime()-startTime
print('[SUCCESS] This run time is:'+runTime+'ms')

```
#### 建立索引
试着为用户名(username)建立索引 
```
db.randomInfo.ensureIndex({username:1})
```
查看现有索引
```
db.randomInfo.getIndexes()
```
### 复合索引
使用指南
- 数据不超万条时 不需要使用索引 性能提升并不明显 大大增加了内存和硬盘的消耗
- 查询数据超过表数据量30%时 不要使用索引字段查询  实际证明会比不使用索引更慢 因为它大量检索了索引表和原表
- 数字索引 比字符串索引快
- 把经常查询的数据做成一个内嵌数据(对象型的数据) 然后集体进行索引

#### 复合索引
复合索引 就是两条以上的索引 
```
db.randomInfo.ensureIndex({randNum0:1})
```
这样就建立了```randNum0```和```username```两个索引

可以针对两个索引同时查询
```
db.randomInfo.find({username:'xxx',randNum0:xxxx})
```
#### 指定索引(hint)
```
var rs = db.randomInfo.find({username:'xxx',randNum0:xxxx}).hint({randNum0:1})
```
### 全文索引
#### 全文索引查找 
- $text:表示要在全文索引中查东西
- $search:后面跟查找的内容

```
db.info.find({$text:{$search:'programmer'}})
```

### 用户管理
#### 创建用户
使用```db.createUser```来完成创建用户
```
db.createUser({
    user:'jspang',
    pwd:'123456',
    customData:{
        name:'xxx',
        email:'xxxx@xx.com',
        age:19
    },
    roles:['read']
})
```
1. 数据库用户角色：read readWrite
2. 数据库管理角色：dbAdmin dbOwner userAdmin 
3. 集群管理工具：clusterAdmin clusterManager ClusterMOnitor hostManager
4. 备份恢复角色：backup restore
5. 所有数据库角色：readyAnyDatabase readyWriteAnyDatabase userAdminAnyDatabase dbAdminAnyDatabase
6. 超级用户角色:root
7. 内部角色:__system

#### 查找用户信息
```
db.system.users.find()
```
#### 删除用户
```
db.system.users.remove({username:xxx})
```
#### 鉴权 
验证用户的用户名和密码是否正确 也算是一种登陆操作 
```
db.auth('username','password')
```
正确1 错误 0

#### 启动鉴权

重启MongoDB服务器 设置必须使用鉴权登陆
```
mongod --auth
```
#### 登陆
配置鉴权后 用户如果想登陆 可以使用mongo的形式 不过必须配置用户名和密码
```
mongod -u username -p password 127.0.0.1:27017/admin
```
