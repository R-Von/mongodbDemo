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
