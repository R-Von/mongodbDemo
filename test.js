var num = 1
var obj = {
  num:2,
  getNum:function(){
    var num = 3
    window.num = 4
    return function(){
      return this.num
    }
  }
}


obj.getNum()()
//4

var a = 0, b = {a:1,b:2}
function foo(a,b,c){
  a = 10
  b.a = 7
  c = 8
}

foo(a,b,a.b)
console.log(a)
console.log(b)

//0 {a:7,b:2}
