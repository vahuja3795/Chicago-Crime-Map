const axios = require('axios')
const express = require('express');
const path = require("path");
const jquery = require('jquery');
const najax = require('najax');
const secret = require('./secrets')
const map = require('./map');

const router = express()
const port = process.env.PORT || 3300;

const mapKey = process.env.GOOGLE_API_KEY
const dataToken = process.env.CHICAGO_API_TOKEN

router.use(express.static(__dirname));

router.set('view engine', 'ejs');


router.get('/', function(req, res) {
    /*
    let crimeData;
    najax({
        url: "https://data.cityofchicago.org/resource/ijzp-q8t2.json",
        type: "GET",
        data: {
          "$limit" : 50,
          "$$app_token" : dataToken
        }
    }).done(function(data) {
      crimeData = data
      res.render("index.ejs",{mapKey, crimeData, dataToken});
    });*/
    res.render("index.ejs",{mapKey,dataToken});
});


router.get('/mapDetails', async(req,res,next) => {
    try {
        const neighborhood = 'chelsea'
        const borough = 'manhattan'
        const city = 'new+york+city'
        const category = 'burgers'
        const {data} = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json?query=' +category +'+' + neighborhood +'+' + borough +'+' + city + '&type=restaurant&key=' + mapKey)
        
        res.json(data)
    } catch (err) {
        next(err);
    }
})

router.get('/crimeData', async(req,res) => {
    najax({
        url: "https://data.cityofchicago.org/resource/ijzp-q8t2.json",
        type: "GET",
        data: {
          "$limit" : 5000,
          "$$app_token" : dataToken
        }
    }).done(function(data) {
      let parseData = JSON.parse(data)
        
      res.json(parseData)
    });
})

router.listen(port, () => console.log('Server running on port ' + port))


module.exports = router
