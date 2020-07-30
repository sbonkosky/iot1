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

and also docker run with volumes mounted

to build (using DOCKERFILE)
docker build -t iot1:latest .

to run (from DOCKERFILE):
docker run  -p 5001:443 -v '/Users/steven/.aspnet/https:/root/.aspnet/https:ro' -v '/Users/steven/.microsoft/usersecrets:/root/.microsoft/usersecrets:ro' -d iot1