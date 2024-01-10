const axios = require("axios");

module.exports = {
  async beforeCreate(ctx) {
    const { data } = ctx.params;

    try {
      const { data: authResponse } = await axios.post(
        "https://api.vimeo.com/oauth/authorize/client",
        { grant_type: "client_credentials" },
        {
          auth: {
            username: "5cb5cb67c1e13d84f8b105e8e2c0b4f18ca6a195",
            password:
              "LZ57KdGcZvVJnO8bakqN7spYUPHTykz++AJ5qYccM4tOX/dqLfpdOqgiirUQfUFXv/aNB3RIaQsPCimD+U+X00z+4dwNsJAHW6kyczz1rsaLBvr37NBcmwIdg6tDVfEe"
          }
        }
      );

      const token = authResponse.access_token;

      const { data: videoResponse } = await axios.get(
        data.showcase_vimeo_url,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const vidData = videoResponse.data;

      for (let i = 0; i < vidData.length; i++) {
        const downloadUri = `https://api.vimeo.com${vidData[i].uri}`;
        let downloadLink = "";

        const { data: downloadResponse } = await axios.get(downloadUri, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

      //  downloadLink = downloadResponse.download.link;
        vidData[i].download_link = downloadLink;
      }

      data.video = vidData;
    } catch (error) {
      console.error("Error:", error.message);
     
    }
  }
};
