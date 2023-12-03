const express=require("express")
const Router=express.Router()
const axios = require('axios');
Router.get('/test',(req,res)=>{
res.json({message:"api working successfully"})
})


//to fetch the film list 
Router.post("/getfilms", async (req, res) => {
  const params = req.body.searchParams;//For Advance Filter
  const options = {
    method: 'GET',
    url: 'https://ott-details.p.rapidapi.com/advancedsearch',
    params,
    headers: {
      'X-RapidAPI-Key':'1d1213313amshcb9f3ab29d78f88p102c7cjsn4ada732e7081',
      'X-RapidAPI-Host': 'ott-details.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    console.log('response',response.data);
    let resp = response.data.results;
    const filteredMovies = resp.filter((movie) => {
      return  movie.imageurl?.length>0;
    });
    
    console.log('Filtered datas with no images',filteredMovies);
    
    if (response.data) {
      return res.json({ message: "Successfully fetched data", data: filteredMovies });
    } else {
      return res.status(500).json({ message: "Internal server error" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});



module.exports=Router;