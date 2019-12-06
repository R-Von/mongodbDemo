// 生成随机数
function GetRandomNum(min,max){
  let range = max - min       //获得随机数区间
  let rand = Math.random()   //获得随机值
  return (min + Math.round(rand*range)) 
}

// console.log(GetRandomNum(10000,99999))

// 制作随机用户名

function GetRandomUserName(min,max){
  let tempStringArray = "123456789qwertyuiopasdfghjklzxcvbnm"
  let outPutText = ''
  // 循环 随机生产用户名的长度 这里需要生成随机数方法的配合
  for(let i = 0;i<GetRandomNum(min,max);i++){
    //抽取随机字母 拼装成需要的用户名
    outPutText = outPutText + tempStringArray[GetRandomNum(0,tempStringArray.length)]
  }
  return outPutText
}

// console.log(GetRandomUserName(7,16))
// 生成随机数和随机用户名 生产百万级数据
var db = connect('user')

db.randomInfo.drop()

var tempInfo = []
for(let i = 0;i<1000000;i++){
  tempInfo.push({
    username:GetRandomUserName(7,16),
    regeditTime:new Date(),
    randNum0:GetRandomNum(100000,999999),
    randNum1:GetRandomNum(100000,999999),
    randNum2:GetRandomNum(100000,999999),
    randNum3:GetRandomNum(100000,999999),
    randNum4:GetRandomNum(100000,999999),
    randNum5:GetRandomNum(100000,999999),
    randNum6:GetRandomNum(100000,999999),
    randNum7:GetRandomNum(100000,999999),
    randNum8:GetRandomNum(100000,999999),
    randNum8:GetRandomNum(100000,999999)
  })
}

db.randomInfo.insert(tempInfo)