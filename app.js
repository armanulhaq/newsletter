// Tells it will require express 
const express = require('express');
// Helps to parse data
//body parser helps you with accessing post request easily, for example req.body.email
const bodyParser = require('body-parser');

// It is the simplest way of making HTTP calls in node. js using this request module. 
const request  = require('request');

const https = require("https")

const app = express();


//This helps to incorporate all the css and images you want with the html
//For this to work you have to put them in a folder which is in this case 'public'
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

// When / route is accessed we send signup.html
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/signup.html')
});

app.post('/', function(req, res) {
    const f_name = req.body.f_name;
    const l_name = req.body.l_name;
    const email = req.body.email;
    
    //Creating data as recommended by Mailchimp
    const data = {
        members:  [  
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: f_name,
                    LNAME: l_name        
            }
        }
        ]
    };
    //converting it into JSON
    const jsonData = JSON.stringify(data);

    const url= "https://us12.api.mailchimp.com/3.0/lists/da0e6c8e75"
    
    const options = {
        method: "POST",
        auth: "arman:085dafc30ebb5633f1dba4d0c78123d9-us12"
    }

    const request = https.request(url, options, function(response) {
        
        if(response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failed.html");
        }
        
        response.on("data", function(data) {
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
});


app.listen(process.env.PORT || 3000,function() {
    console.log('Server 3000 started.');
})



//085dafc30ebb5633f1dba4d0c78123d9-us12

//da0e6c8e75