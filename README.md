# Queue Microservice
A simple microservice built with Node.js and Fastify to manage queues identified by an ID. Queues can be created, data can be written to them, and they can be read (dequeued).

## Endpoints
### POST /queue
Add data to a queue identified by an ID.

Request Body
| Field 	| Type       	| Description                                                                                        	|
|-------	|------------	|----------------------------------------------------------------------------------------------------	|
| id    	| string/number 	| ID of the queue. You can separate different microservices with unique id for using it's own queue. 	|
| data  	| any        	| Data to be added to queue                                                                          	|

Response Body
| Field   	| Type          	| Description                            	|
|---------	|---------------	|----------------------------------------	|
| success 	| boolean       	| Indicates if request succeeded         	|
| id      	| string/number 	| ID of the queue                        	|
| written 	| any           	| Data written to queue                  	|
| length  	| number        	| Number of items in queue after queuing 	|


### GET /pop
Read and remove data from a queue identified by an ID.

Request Query Parameters
| Field 	| Type       	| Description                                                                                        	|
|-------	|------------	|----------	|
| id    	| string/number 	| ID of the queue. 	|

Response Body
| Field   	| Type          	| Description                            	|
|---------	|---------------	|----------------------------------------	|
| success 	| boolean       	| Indicates if request succeeded         	|
| id      	| string/number 	| ID of the queue                        	|
| data 	    | any           	| Data that was popped from queue         	|
| length  	| number        	| Number of items in queue after popping 	|


GET /len
Get the number of items in a queue identified by an ID.

Request Query Parameters
| Field 	| Type       	| Description                                                                                        	|
|-------	|------------	|----------	|
| id    	| string/number 	| ID of the queue. 	|

Response Body
| Field   	| Type          	| Description                            	|
|---------	|---------------	|----------------------------------------	|
| success 	| boolean       	| Indicates if request succeeded         	|
| id      	| string/number 	| ID of the queue                        	|
| length  	| number        	| Number of items left in queue          	|


GET /ping
Ping a queue identified by an ID, resetting its timeout.

Request Query Parameters
| Field 	| Type       	| Description                                                                                        	|
|-------	|------------	|----------	|
| id    	| string/number 	| ID of the queue. 	|

Response Body
| Field   	| Type          	| Description                            	|
|---------	|---------------	|----------------------------------------	|
| success 	| boolean       	| Indicates if request succeeded         	|
| id      	| string/number 	| ID of the queue                        	|


## Queues
Queues are stored in memory using a simple queue implementation. Queues are automatically deleted after 24 hours of inactivity.

## Usage
### Native JS
- Clone the repository
- Install dependencies using npm install
- Start the microservice using `node server.js`
- Use the endpoints listed above to manage queues.

### Docker
- Build the image using `docker build -t simple-q .`
- Run the container `docker run -d -p 6969:6969 --name simple-q simple-q`