# iot1

dev-certs created on mac using:
dotnet dev-certs https -ep ~/.aspnet/https/aspnetapp.pfx -t -p localhost

ensure in Keychain-access the localhost in Login and System are removed before doing the above. You can clean first using:
dotnet dev-certs https --clean

build and run in docker using:
docker-compose up -d --build

access in broswer:
https://localhost:5001
