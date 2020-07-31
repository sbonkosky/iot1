# iot1

ensure in Keychain-access the localhost in Login and System are removed before doing the above. You can clean first using:
dotnet dev-certs https --clean

dev-certs created on mac using (includes t for trust):
dotnet dev-certs https -ep ~/.aspnet/https/aspnetapp.pfx -t -p localhost

build and run in docker using:
docker-compose up -d --build

access in broswer (port depends on compose file):
https://localhost:5001


WITHOUT COMPOSE
- need to specify ENV variables in dockerfile
ENV ASPNETCORE_URLS=https://+:443;http://+:80
ENV ASPNETCORE_Kestrel__Certificates__Default__Password=localhost
ENV ASPNETCORE_Kestrel__Certificates__Default__Path=/root/.aspnet/https/aspnetapp.pfx
VOLUME ["/root/.aspnet/https"]
VOLUME ["/root/.microsoft/usersecrets"]

and also docker run with volumes mounted (specified by -v option)

to build (using DOCKERFILE)
docker build -t iot1:latest .

to run (from DOCKERFILE):
docker run  -p 5001:443 -v '/Users/steven/.aspnet/https:/root/.aspnet/https:ro' -v '/Users/steven/.microsoft/usersecrets:/root/.microsoft/usersecrets:ro' -d iot1

NODEJS
followed this step by step
https://nodejs.org/de/docs/guides/nodejs-docker-webapp/

NODE_SSL
https://serverfault.com/questions/845766/generating-a-self-signed-cert-with-openssl-that-works-in-chrome-58
https://medium.com/@nitinpatel_20236/how-to-create-an-https-server-on-localhost-using-express-366435d61f28
https://stackoverflow.com/questions/42753566/nodejs-load-pfx-certificate-from-file

Need to make sure that the pfx created for the aspnet app is copied to niot1 directory

CORS added to node for cross-domain scripting stuff

(Below is if not using the pfx file)
In order to get chrome not to shows warning screen, had to create an openssl.cnf file in directory, then create a self signed cert with the command:

openssl req \
    -newkey rsa:2048 \
    -x509 \
    -nodes \
    -keyout server.key \
    -new \
    -out server.crt \
    -subj /C=US/CN=localhost \
    -reqexts SAN \
    -extensions SAN \
    -config <(cat /etc/ssl/openssl.cnf \
        <(printf '[SAN]\nsubjectAltName=DNS:localhost')) \
    -sha256 \
    -days 800

then get the decrypted keys

openssl rsa -in server.key -out server.pem
