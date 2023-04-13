
import { Telegraf } from "telegraf";

const helpMsg =`
/start -- To start the bot
/fortune -- to receive some fortunes 
/help  -- Command Reference 
/dogbreed -- to receive the dog breeds list 
/dog <breed> -- To receive the image of the bot . 
`


import Axios from "axios"; 
import axios from "axios";

import fs from 'fs'

const bot = new Telegraf('5631190247:AAHLXjn1igfli9wgwSoJIRN58oHrR8-aXfY');


bot.start((ctx)=>{
    ctx.reply("Hello I am a Echo Bot from fresh Spar ")
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

bot.command("dog", (ctx)=>{
    let inp = ctx.message.text.split(" ")

    if(inp.length != 2){
        ctx.reply("Must give a dog name as a second argument ")
        return;
    }
    let breedInp = inp[1]

    let rawdata = fs.readFileSync("./dogsname.json","utf-8")
    let data = JSON.parse(rawdata)

    if(data.includes(breedInp)){
        axios.get(`https://dog.ceo/api/breed/${breedInp}/images/random`)
        .then(res =>{
            console.log(res.data)
            ctx.replyWithPhoto(res.data.message)
        }).catch(e=>{
            console.log(e)
        })
} else{
    let suggestion = data.filter(item=>{
        return item.startsWith(breedInp)
    })
    let message = `Did you mean: \n`;
    suggestion.forEach(item => {
        message += `-${item} \n`;
    })
    if(suggestion.length == 0){
        ctx.reply("Unable to find the breed")
    }else{
        ctx.reply(message)
    }
}
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