import axios, { Axios } from "axios";

 axios.get('https://script.googleusercontent.com/macros/echo?user_content_key=dujVW20C-t0KgjP7cPt0QE-CQyE9MC4YAKgoaxBuWCk8pVPTqtcLKIzuiYL5At696S1KpWGrhTSbIPFCa8pZMXwm84LAWjaum5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnOAEI1TipRmirKhH_2OaKu0qDzH6QUal99AS0e7OitSp6fN09pjOAx9nznnOq1Yh2ah7gXNb_XGMkl0QSpIj_b7x2nNMOLeTPA&lib=MsOKQEK32Nn_yJD5zTH4WG5GvrR6Rl4Ky')
     .then(res =>{
        console.log(res.data)
        for (var i =1; i<4; i++){
            if(res.data[i].FoodName=='Parota'){
                console.log(res.data[i].Price)
            }
        }  
     })


    //  let food ='parota'
    //  if(food ==apis.data){
    //     console.log('Works Fine')
    //  }