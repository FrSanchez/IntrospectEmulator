# FakeIntrospect

Provides a response required for SFDC introspect when called from Pardot during a token introspect

Requires node 16 (maybe earlier, but this is the version I used to write the code)

## Utilization

- Clone the repository locally. Then you can run as a node server, or a as a docker image. 
  
## Run as a node server

```bash
npm install
npm start
```
  
## As a docker container

```bash
docker build . -t fake-introspect
docker run -p 8080:8080 -d fake-introspect
```

## Testing

To test a succesful deployment, you can just call the server:

```bash
curl -X POST "http://localhost:8080/services/oauth2/introspect" -d "token=CustomToken3"
```

## TODO

[ ] remove querystring

