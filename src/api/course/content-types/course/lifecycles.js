const axios = require("axios");
var  vidData=[];
var token="";

module.exports = {

  async beforeCreate(event) {

    const { data, where, select, populate } = event.params;

    const video={
        "name":"123testest"
    }

      var Client_Identifier = "5cb5cb67c1e13d84f8b105e8e2c0b4f18ca6a195";
      var Client_Secret = "LZ57KdGcZvVJnO8bakqN7spYUPHTykz++AJ5qYccM4tOX/dqLfpdOqgiirUQfUFXv/aNB3RIaQsPCimD+U+X00z+4dwNsJAHW6kyczz1rsaLBvr37NBcmwIdg6tDVfEe";
   
     await axios.post(
        "https://api.vimeo.com/oauth/authorize/client",
        { grant_type: "client_credentials" },
        {
          auth: {
            username: Client_Identifier,
            password: Client_Secret
          }
        }
       
      ).then(async function(response){
        token = await response.data.access_token;
        await axios.get(event.params.data.showcase_vimeo_url //"https://api.vimeo.com/users/213493461/albums/10888770/videos" 
        ,
        {
          headers: {
            Authorization: `Bearer ${response.data.access_token}`
          }
        }
      ).then(async function(res){
    
        vidData = await res.data.data;
          
        }) .catch(error => {
          console.log("errrrorrr",error.message)
       })
    });
    console.log(vidData.length);
    
    for(let i=0;i<vidData.length;i++) 
    {
      
      console.log("i",i);
     var downloadUri = `https://api.vimeo.com${vidData[i].uri}`;
     var downloadLink = "";
       axios.get(downloadUri
        ,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      ).then(async function(res){
         downloadLink = await res.data.data;
      console.log("res.data",res);
        })

        vidData[i].download_link = "\""+ downloadLink + "\"";
        console.log("vidData", vidData[i]);
    }
    event.params.data.video = vidData;
},

  }

