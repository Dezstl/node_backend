# node_backend
Project to create a RESTful backend using Node, Express and MongoDB

## Setup
To deploy to local enviroment.

#### Download
Required tools
 - Virtualbox https://www.virtualbox.org/wiki/Downloads
 - Vagrant https://www.vagrantup.com/downloads.html
#### Start Vagrant
```sh
$ cd node_backend
```
```sh
$ vagrant up
```
Initial run will take 15-30 minutes, depending on system being ran on.

If first run does not successfully install (ruby, mongodb, node.js, npm) run..
```sh
$ vagrant reload --provision
```

#### Vagrant ssh
```sh
$ vagrant ssh
```
```sh
$ cd /vagrant
```
#### Run Test
```sh
$ npm test
```
#### Run App

```sh
$ npm server.js
```
#### Local Endpoint

```sh
localhost:8000
```
 - port may be different if there is a conflict
 - check vagrant up/reloaded logs for port mapping

ex.
```sh
==> default: Fixed port collision for 8080 => 8000. Now on port 2200.
```

## API ENDPOINTS
version 1: /v1/

### Base
```javscript
GET '/'
Response: {message: "API IS UP, Version {#}}
```
```javscript
GET '/api'
Response: {message: "API IS UP, Version {#}}
```

### Auth
```javascript
POST /api/auth
Request: {username: "user", password: "abc"}
Success: {message: "sucess"), Code: 200
Faiure: {unauthorized}, Code: 401
```

### User
##### Get Users
```javascript
GET /api/user?status={active||inactive}&group={firstName||secondName||jobTitle||city||state}
Success no query: [
    {
        "_id": "560776b636afad41124e2655",
        "password": "$2a$10$LI34yFxGpw6AdErV2Kj/tOgDbB35NXCiYYjg8FdBbkSn6CMzLfHi6",
        "active": true,
        "state": "NY",
        "city": "New York",
        "lastName": "smith",
        "firstName": "john",
        "username": "jsmith",
        "__v": 0
  },
  { ..}
]
Success query: {
  "NY": [
    {
      "_id": "5607766b36afad41124e2654",
      "password": "$2a$10$BMcgNqiOpgsihZnSmE.Aj.w.e98NJ9HY2DlYora.gX/knF1YJkBcy",
      "active": true,
      "state": "NY",
      "city": "New York",
      "lastName": "account",
      "firstName": "admin",
      "username": "admin",
      "__v": 0
    },
  ], [...]
  "IL": [
    {
      "_id": "560776f936afad41124e2656",
      "password": "$2a$10$tikO8nyA7xAHZWGR5TtCte0JzJqodzVP7qdopSonxvM2Mp9jkGage",
      "active": true,
      "state": "IL",
      "city": "Chicago",
      "lastName": "smith",
      "firstName": "tim",
      "username": "tsmith",
      "__v": 0
    }
  ], [...]
}
Failure: {"message": "Entered invalid status value. Use 'active' or 'inactive'. "}, {"message": "Invalid status params"} CODE: 400
```
##### Create User
```javascript
POST /api/user
REQUEST: { "username": "jsmith", "firstName": "john", "lastName": "smith", "jobTitle": "Engineer", "city": "New York", "state": "NY", "active": true, "password": "password1" }
Success: { "message": "User Created" }
Failure: { "message": "{field} is required" }, { "message": "Username exist!" } CODE: 400
```
##### Update User
```javascript
PUT /api/user/:username
REQUEST: {"firstName": "john", "lastName": "smith", "jobTitle": "Engineer", "city": "New York", "state": "NY", "active": true, "password": "password1" } - none required
Success: { "message": "{username} has been created" }
Failure: { "message": "No User Found" } CODE: 400
```
##### Delete User
```javascript
DELETE /api/user/delete/:username
Success: { "message": "{username} has been removed" }
Failure: { "message": "No User Found" } CODE: 400
```

### ENVIROMENTS

##### Get Enviroment Status
```javascript
GET /api/status
RESPONSE: {
  "rubyVersion": "ruby 1.9.3p551 (2014-11-13 revision 48407) [x86_64-linux] ",
  "nodeVersion": "v0.10.40 ",
  "mongoVersion": "db version v2.6.11 2015-09-29T06:57:32.693+0000 git version: d00c1735675c457f75a12d530bee85421f0c5548 ",
  "mongoStatus": "mongod (pid 1855) is running... "
}
```
```javascript
GET /api/dir?path=
RESPONSE: [ "README.md", ..,  ..]
FAILURE: { "messge": "Invalid Path" }
```

## Todo
