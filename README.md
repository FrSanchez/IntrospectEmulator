# FakeIntrospect

Provides a response required for SFDC introspect when called from Pardot during a token introspect

Requires node 16 (maybe earlier, but this is the version I used to write the code)

## Utilization

- Clone the repository locally. Then you can run as a node server, or a as a docker image. 
- For the configuration needed locally to use the server, look at [this quip doc](https://salesforce.quip.com/e16wAOD5ZsZz)
  
## Run as a node server

```bash
npm install
npm start
```
  
## As a docker container

```bash
docker build . -t fake-introspect
# docker run -p 8080:8080 -d fake-introspect
# the following can be used to run it inside garden
docker tag <image_ID> docker.dev.pardot.com/base/pardot/fake-introspect/app:latest
```

## Testing

To test a succesful deployment, you can just call the server:

```bash
curl -X POST "http://localhost:8080/services/oauth2/introspect" -d "token=CustomToken3"
```

## To run as a garden service
- Copy garden.yml file into PARDOT_GIT_CLONE/introspect/garden.yml
- add FAKE_INTROSPECT_ENABLED=true to your garden.local.env
- baker-start

## TODO

- [ ] remove querystring
- [ ] run inside baker
- [ ] Add entry in .dev/lib/docker.sh:docker_images_array for auto-pulling

