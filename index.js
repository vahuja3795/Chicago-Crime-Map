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

/*
  Adding paths for the executable file to run properly
*/
path.join(__dirname,'views/index.ejs')
path.join(__dirname,'css/globals.css')
path.join(__dirname,'css/styleguide.css')
path.join(__dirname,'css/web-1920-1.css')
path.join(__dirname,'img/below-taskbar@1x.png')
path.join(__dirname,'img/flag-logo@1x.png')
path.join(__dirname,'img/top-taskbar@1x.png')
path.join(__dirname,'styles.css')

router.set('view engine', 'ejs');

/*
  Setting up the necessary files and frameworks that are needed to run the server so the webpage can load properly on the web browser.
  /mapDetails and /crimeData are test urls where the Google Map API and Chicago Crime Data API can be seen working
  (Requirement 3.3)
*/

router.get('/', function(req, res) {
    res.render(path.join(__dirname,'views/index.ejs'),{mapKey,dataToken});
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
