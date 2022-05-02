const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

//Azure subscription key to access Cognitive Service API
var subscriptionKey = process.env.SubscriptionKey;

//Endpoint from Azure Translate Cognitive service
var endpoint = process.env.Endpoint_Doc_Translator;

//Translate the document
exports.translateDocument= (req, res, next) => {     
    var route = '/batches';
    var languageToTranslate = req.body.language;
    console.log("language source: "+languageToTranslate)
    let data = JSON.stringify({"inputs": [
    {
        "source": {
            "sourceUrl": process.env.SourceUrl,
            "storageSource": "AzureBlob"
        },
        "targets": [
            {
                "targetUrl": process.env.TargetUrl,
                "storageSource": "AzureBlob",
                "language": languageToTranslate}]}]});
      
    let config = {
    method: 'post',
    baseURL: endpoint,
    url: route,
    headers: {
        'Ocp-Apim-Subscription-Key': subscriptionKey,
        'Content-Type': 'application/json'
    },
    data: data
    };

    axios(config)
    .then(function (response) {
        let result = { statusText: response.statusText, statusCode: response.status };
        console.log(JSON.stringify(result));
        return res.send(JSON.stringify(result))
    })
    .catch(function (error) {
        console.log(error);
        return res.send(error)
    });   
};

//Get all the supported file formats for document translation
exports.getFileFormats = (req, res, next) => {
    var route = '/documents/formats';
    let config = {
        method: 'get',
        url: endpoint + route,
        headers: {
            'Ocp-Apim-Subscription-Key': subscriptionKey
        }
    };

    axios(config)
    .then(function (response) {
        console.log("Response object: "+JSON.stringify(response.data));
        return res.send(JSON.stringify(response.data))
    })
    .catch(function (error) {
        console.log(error);
        res.send(error)
    });
}
