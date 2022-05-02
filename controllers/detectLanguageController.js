const axios = require('axios').default;
const { v4: uuidv4 } = require('uuid');

//Azure subscription key to access Cognitive Service API
var subscriptionKey = process.env.SubscriptionKey;

//endpoint to use text translation Web API
var endpoint = process.env.Endpoint_Text_Translator;

// Add your location, also known as region. The default is global.
// This is required if using a Cognitive Services resource.
var location = process.env.location;

//Detect the language of text sent
exports.detectLanguage = (req, res, next) => {
    var textToTranslate = req.body.text; 

    //Axios HTTP request
    axios({
        baseURL: endpoint,
        url: '/detect',
        method: 'post',
        headers: {
            'Ocp-Apim-Subscription-Key': subscriptionKey,
            'Ocp-Apim-Subscription-Region': location,
            'Content-type': 'application/json',
            'X-ClientTraceId': uuidv4().toString()
        },
        params: {
            'api-version': '3.0'
        },
        data: [{
            'text': textToTranslate
        }],
        responseType: 'json'
    }).then(function(response){
        var responseData = JSON.stringify(response.data, null, 4);
        res.status = 200;
        return res.send(responseData);
    })
    .catch(err => {
        res.send(err.response.data);
    });
};