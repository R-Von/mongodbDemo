var db = connect('user')

var workmate3 = {
  name:'MinJie2',
  age:22,
  sex:2,
  job:'UI设计',
  skill:{
      skillOne:'PhotoShop',
      SkillTwo:'UI',
      SkillThree:'Word+Excel+PPT'
  },
  regeditTime:new Date()
}

db.workmate.update({name:'MinJie'},workmate3)


print('[update]:The data was updated successfully ')