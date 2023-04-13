
import fs from 'fs'

let rawdata = fs.readFileSync("./list.json","utf-8")
    let data = JSON.parse(rawdata)
    

    let message = "Restaurants :\n"

    data.forEach(item => {
        message += `${item} \n`
    })
   



    let resData = fs.readFileSync("./data.json","utf-8")
    let data1 = JSON.parse(resData)
    

    let message2 = " \n"

    data1.forEach(item => {
        message2 += `${item} \n`
    })


// console.log(message)

console.log(message2)