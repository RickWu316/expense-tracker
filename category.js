const categoryCN = ['家居物業', '交通出行', '休閒娛樂', '餐飲食品 ', '其他']

const categorys = ['home', 'shuttle', 'fun', 'food', 'other']
const categoryImage = {
    home: '<i class= "fas fa-home fa-3x"></i>',
    shuttle: '<i class="fas fa-shuttle-van fa-3x"></i>',
    fun: '<i class="fas fa-grin-beam fa-3x"></i>',
    food: '<i class="fas fa-utensils fa-3x"></i>',
    other: '<i class= "fas fa-pen fa-3x"></i> '
}

function categoryTransIcon(category) {

    let index = categorys.find(Element => category === Element)
    // console.log(index)
    return categoryImage[index]

}

function categoryTransCN(category) {
    let index = categorys.indexOf(category)
    // console.log(index)
    return categoryCN[index]

}

module.exports = { categoryTransIcon, categoryTransCN }
