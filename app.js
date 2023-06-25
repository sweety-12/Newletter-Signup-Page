const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
// const { post } = require("request");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data ={
        members: [{
               email_address :email,
                status: "subscribed",
                merge_fields: {
                    FNAME :firstName,
                    LNAME : lastName }
            }]
    };

    const jsonData = JSON.stringify(data);
    const url = "https://us10.api.mailchimp.com/3.0/lists/80ac6e4554/members";
    const options = {
        method: "POST",
        auth : "sweety1:1fd329d322f6104ad9de8945a1f417df-us10"
    }

    const request = https.request(url, options, function(response){

        if(response.statusCode === 200)
        {
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }
       response.on("data", function(data){
        console.log(JSON.parse(data));
       })
    })

    request.write(jsonData);
    request.end();

});

app.post("/failure", function(req, res){
    res.redirect("/");
})


app.listen( 3000, function(){
    console.log("Hey , I am running on port 3000");
});

// process.env.PORT 









//API KEY 
//ae7b6a7fbc48455359f2e0b56f009a3a-us10
//1fd329d322f6104ad9de8945a1f417df-us10

//list id
//80ac6e4554
//80ac6e4554