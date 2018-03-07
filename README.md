# Web Scrubbing (home assignment)

REST API for scrubbing a web page. Saved links are stored in a MongoDb database.

****base url: `/webScrubbing/api/v1`****

### Functionality

#### GET `/links`
Will return all saved links from DB (JSON array).    
parameters: none    
Possible response codes: 200, 500

#### POST `/link`   
Will scrub the given url (in request body) and save in DB. Returned object is the created resource (JSON object).

Parameters: (MUST)
1. body: the requested url.   
for example   
`{url: 'http://www.ynet.co.il }`    

2. header: idempotency key (any non-empty value).   
for example   
`idempotency_key = 123456`   
Possible response codes: 201, 400, 500
