const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

//Azure subscription key to access Cognitive Service API
var subscriptionKey = process.env.SubscriptionKey;

//Endpoint to use text translation Web API
var endpoint = process.env.Endpoint_Text_Translator;

// Add your location, also known as region. The default is global.
// This is required if using a Cognitive Services resource.
var location = process.env.location;

//Translate the source text to target language
exports.translateText = (req, res, next) => {     
    var textToTranslate = req.body.text;
    var translateFromLanguage= req.body.from;
    var translateToLanguage = req.body.to;

    //Axios HTTP request
    axios({
        baseURL: endpoint,
        url: '/translate',
        method: 'post',
        headers: {
            'Ocp-Apim-Subscription-Key': subscriptionKey,
            'Ocp-Apim-Subscription-Region': location,
            'Content-type': 'application/json',
            'X-ClientTraceId': uuidv4().toString()
        },
        params: {
            'api-version': '3.0',
            'from': translateFromLanguage,
            'to': translateToLanguage
        },
        data: [{
            'text': textToTranslate
        }],
        responseType: 'json'
    }).then(response => {
        //var responseData = response.data[0].translations[0]
        var responseData = JSON.stringify(response.data[0].translations[0], null, 4);
        res.status = 200;
        return res.send(responseData)
        
    })
    .catch(err => {
            res.send(err);
    });
};

//Get all the languages supported for translation
exports.languages = (req, res, next) => {
    //Axios HTTP request
    axios({
        baseURL: endpoint,
        url: '/languages',
        method: 'get',
        headers: {
            'Ocp-Apim-Subscription-Key': subscriptionKey,
            'Ocp-Apim-Subscription-Region': location,
            'Content-type': 'application/json',
            'X-ClientTraceId': uuidv4().toString()
        },
        params: {
            'api-version': '3.0',
        },
        responseType: 'json'
    }).then(response => {
        var responseData = JSON.stringify(response.data.translation, null, 4);
        res.status = 200;
        return res.send(responseData);
    })
    .catch(err => {
        res.send(err.response.data);
    });
};