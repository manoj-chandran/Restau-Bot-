
import { Telegraf } from "telegraf";

const helpMsg =`
/start -- To start the bot
/fortune -- to receive some fortunes 
/help  -- Command Reference 
/fooditem -- To list the number of food items.
/restaurants -- To list the number of restaurants.
/hmr <foodname> -- To show the hmr details 
/chittinadu <foodname> -To Show the chittinadu food datails
/restaurantNa <restaurant> <foodname> - To order the food .
`

const fooditem =`
HMR: 
    1. chicken-biriyani
    2. chappathi 
    3. bun-parota
Chittinadu:
    1. egg-biriyani
    2. chicken-fried-rice
    3. gobi-noodles
foodcourt:
    1.Parota
    2.Chappathi
    3.Gobi-noodles
     
`
// ${axios.get('https://script.googleusercontent.com/macros/echo?user_content_key=dujVW20C-t0KgjP7cPt0QE-CQyE9MC4YAKgoaxBuWCk8pVPTqtcLKIzuiYL5At696S1KpWGrhTSbIPFCa8pZMXwm84LAWjaum5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnOAEI1TipRmirKhH_2OaKu0qDzH6QUal99AS0e7OitSp6fN09pjOAx9nznnOq1Yh2ah7gXNb_XGMkl0QSpIj_b7x2nNMOLeTPA&lib=MsOKQEK32Nn_yJD5zTH4WG5GvrR6Rl4Ky')
//      .then(res =>{
//         console.log(res.data)
//         for (var i =1; i<4; i++){
//             // if(res.data[i].FoodName=='Parota'){
//             //     console.log(res.data[i].Price)
//             // }

//             console.log(res.data[i].FoodName)
//         }  
//      })}


import Axios from "axios"; 
import axios from "axios";

import fs from 'fs'

const bot = new Telegraf('5631190247:AAHLXjn1igfli9wgwSoJIRN58oHrR8-aXfY');


bot.start((ctx)=>{
    ctx.reply("Hello I am a Echo Bot from White Coats . ")
    ctx.reply(helpMsg);
})

bot.help((ctx)=>{
    ctx.reply(helpMsg);
})

bot.command("echo", (ctx)=>{

    let inp = ctx.message.text;
    // console.log(ctx.message)
    let inpArray = inp.split(" ")

    let Msg = "";

    if(inpArray.length == 1){
        Msg ="You said just Echo. "
    }
    else{
        inpArray.shift()
        Msg = inpArray.join(" ")
    }
    ctx.reply(Msg)

    console.log(inpArray)
})


//fortune 

bot.command('fortune', (ctx)=>{
    Axios.get('http://yerkee.com/api/fortune')
    .then(res =>{
        
        ctx.reply(res.data.fortune)
    }).catch(e => {
        console.log(e)
    })
})

bot.command('cat', async (ctx)=>{
    let inp = ctx.message.text;
    // console.log(ctx.message)
    let inpArray = inp.split(" ")

    if(inpArray.length == 1){
        try{
            let result  = await Axios.get('https://aws.random.cat/meow')
            ctx.replyWithPhoto(result.data.file)

        }catch(e){
            console.log(e)
        }
        
    }
    else{
        inpArray.shift()
        inp = inpArray.join(" ")
        ctx.replyWithPhoto(`https://cataas.com/cat/says/${inp}`)
        
    }
})

bot.command('dogbreed', (ctx)=>{
    let rawdata = fs.readFileSync("./dogsname.json","utf-8")
    let data = JSON.parse(rawdata)

    let message = "Dog Breeds \n"

    data.forEach(item => {
        message += `${item} \n`
    })
    ctx.reply(message)
})

//food items

bot.command('fooditem',(ctx)=>{
    ctx.reply(fooditem)
})

bot.command('restaurants', (ctx)=>{
    let rawdata = fs.readFileSync("./list.json","utf-8")
    let data = JSON.parse(rawdata)
    console.log(data)

    let message = "Restaurants :\n"

    data.forEach(item => {
        message += `${item} \n`
    })
    ctx.reply(message)
})

bot.command("restaurantNa", (ctx)=>{
    let inp = ctx.message.text.split(" ")

    if(inp.length != 3){
        ctx.reply("Must give a Restaurant name as a second argument, food as third argument.")
        return;
    }
    let restaurantNa = inp[1]

    let food = inp[2]

    if (restaurantNa =="hmr"){
        if (food=="chicken-biriyani"){
            ctx.replyWithPhoto("https://i.ibb.co/1mJDTtw/Whats-App-Image-2023-03-31-at-11-07-27-AM-1.jpg")
            ctx.reply("price: 230 \n")
            ctx.reply("Pay: https://rzp.io/l/l0VZu4mz3")
        }
        if (food=="chappathi"){
            ctx.replyWithPhoto("https://i.ibb.co/B3dmRm7/Whats-App-Image-2023-03-31-at-11-07-28-AM.jpg")
            ctx.reply("price: 30 \n")
            ctx.reply("Pay: https://rzp.io/l/l0VZu4mz3 ")
        }
        if (food=="bun-parota"){
            ctx.replyWithPhoto("https://i.ibb.co/gvsDf4P/Whats-App-Image-2023-03-31-at-11-07-30-AM.jpg")
            ctx.reply("price: 45 \n")
            ctx.reply("Pay: https://rzp.io/l/l0VZu4mz3")
        }
    }
    if (restaurantNa =="chittinadu"){
        if (food=="egg-biriyani"){
            ctx.replyWithPhoto("https://i.ibb.co/9bJ1qj5/Whats-App-Image-2023-03-31-at-11-07-30-AM-1.jpg")
            ctx.reply("price: 130 \n")
            ctx.reply("Pay: https://rzp.io/l/Bn1ir94I3m")
        }
        if (food=="chicken-fried-rice"){
            ctx.replyWithPhoto("https://i.ibb.co/xGZTq7X/Whats-App-Image-2023-03-31-at-11-07-32-AM.jpg")
            ctx.reply("price: 155 \n")
            ctx.reply("Pay: https://rzp.io/l/Bn1ir94I3m")
        }
        if (food=="gobi-noodels"){
            ctx.replyWithPhoto("https://i.ibb.co/0Bn91XC/Whats-App-Image-2023-03-31-at-11-07-31-AM.jpg")
            ctx.reply("price: 105 \n")
            ctx.reply("Pay: https://rzp.io/l/Bn1ir94I3m")
        }
    }

})




bot.command("foodcourt", (ctx)=>{
    let inp = ctx.message.text.split(" ")

    if(inp.length != 2){
        ctx.reply("Must give food name as a second argument .")
        return;
    }

    let food = inp[1]
    axios.get('https://script.googleusercontent.com/macros/echo?user_content_key=dujVW20C-t0KgjP7cPt0QE-CQyE9MC4YAKgoaxBuWCk8pVPTqtcLKIzuiYL5At696S1KpWGrhTSbIPFCa8pZMXwm84LAWjaum5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnOAEI1TipRmirKhH_2OaKu0qDzH6QUal99AS0e7OitSp6fN09pjOAx9nznnOq1Yh2ah7gXNb_XGMkl0QSpIj_b7x2nNMOLeTPA&lib=MsOKQEK32Nn_yJD5zTH4WG5GvrR6Rl4Ky')
     .then(res =>{
        console.log(res.data.length)
        for (var i =1; i<4; i++){
            if(res.data[i].FoodName==food){
                console.log(res.data[i])
                ctx.replyWithPhoto(`https://i.ibb.co/gvsDf4P/${food}.jpg`)
                // res.data[i].Image
                ctx.reply(`price: ${res.data[i].Price} \n`)
                ctx.reply("Pay: https://rzp.io/l/3b4fKP92Xc")
            }
        } 
     })

    

})

// logger 
function logger(ctx){
    console.log(ctx.from.username + "said: "+ ctx.message.text)
}

// bot.launch()
// exports.handler = (event, context, callback)=>{
//     const tmp = JSON.parse(event.body)
//     bot.handleUpdate(tmp)
//     return callback(null,{
//         statusCode:200,
//         body:''
//     })
// }

bot.launch()




//bot.use((ctx), next =>{
    //     console.log();
    //     if(ctx.updateSubTypes[0] == "text"){
    //         console.log(ctx.from.username + "said: "+ ctx.message.text)
    
    //     }
    //     else{
    //         console.log(ctx.from.username + "sent " + ctx.updateSubTypes[0])
    //     }
    //     next();