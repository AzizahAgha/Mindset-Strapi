const axios = require("axios");
var  vidData="";

module.exports = {

    async afterCreate(event) {

        const { data, result} = event;

        console.log("result",result);
        const video={
            "name":"123testest"
        }

          var Client_Identifier = "4c2fc19d8265a6096e92658a9f2969bc272ec54b";
          var Client_Secret = "3k2JlOr2f/m5upQor8IpkcT01fUxMPKvVGjjBhmMHJSGo4OPQQfpIqfFnuLKmt+g6BHht89s53M+G8z5IB9YGcwAUbWN+O1kq304VehdIEg5M3x7jx5isNZQK9IDgawS";
       
          axios.post(
            "https://api.vimeo.com/oauth/authorize/client",
            { grant_type: "client_credentials" },
            {
              auth: {
                username: Client_Identifier,
                password: Client_Secret
              }
            }
           
          ).then(function(response){
            console.log("token",response.data.access_token);
            axios.get("https://api.vimeo.com/users/213193340/albums/10879753/videos"
            ,
            {
              headers: {
                Authorization: `Bearer ${response.data.access_token}`
              }
            }
          ).then(function(res){
            console.log("result",result.id);
            console.log("res.data.data",res.data.data);
                strapi.service('api::course.course').update(result.id ,{
                  data: {
          
                      video:res.data.data,   
                  },
              })        
        
              
            }) .catch(error => {
              console.log("errrrorrr",error.message)
           })
        });

    },
  }

