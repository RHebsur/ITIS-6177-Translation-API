# Translation API
Please refer the [documentation](https://github.com/RHebsur/ITIS-6177-Translation-API/blob/main/Translation_API_Documentation.pdf) to understand the API.
## Installation steps
### Pre-requisites
-	NodeJs - Javascript compiler
-	Express js - node.js network app framework
-	Azure Cognitive Services - To translate text and document.
-	npm - Nodejs package manager
-	dotenv - to keep secrets separate from source code and to share source code while allowing others to make their own

### Implementation
- Download/clone API code from [github](https://github.com/RHebsur/ITIS-6177-Translation-API)
- Use any Nodejs Editor such as Visual code access the code
- Update .env file and add values for the following keys

| Key | Description |
| ------ | ------ |
| Port |  Port number to launch application |
| Host | Host server to launch application |
| SourceUrl | Azure source container SAS URL |
| TargetUrl | Azure target container SAS URL |
| SubscriptionKey | Azure subscription key to access Cognitive Service API |
| Endpoint_Text_Translator | Endpoint to use text translation Web API |
| Endpoint_Doc_Translator | Endpoint to use document translation Web API |
| location | Location of the cognitive services resource |

- Run the following commands to start application
```sh
npm init
npm install
node app.js
```
