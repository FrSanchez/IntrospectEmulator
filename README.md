# FakeIntrospect

Provides a response required for SFDC introspect when called from Pardot during a token introspect

Requires node 16 (maybe earlier, but this is the version I used to write the code)

## Installation

- clone this repository
- 
```bash
npm install
```
  
## Utilization
1. Update users.json to match your users
2. 
```bash
npm start
```
## As a docker container

```bash
docker build . -t fake-introspect
docker run -p 8080:8080 -d fake-introspect
```

## TODO
[ ] remove querystring 

