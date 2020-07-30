#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 AS base
WORKDIR /app

# these can be specified in environment section in docker-compose as well
ENV ASPNETCORE_HTTPS_PORT=443
ENV ASPNETCORE_URLS=https://+:443;http://+:80
ENV ASPNETCORE_Kestrel__Certificates__Default__Password=localhost
ENV ASPNETCORE_Kestrel__Certificates__Default__Path=/root/.aspnet/https/aspnetapp.pfx

VOLUME ["/root/.aspnet/https"]
VOLUME ["/root/.microsoft/usersecrets"]

FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build
WORKDIR /src
COPY iot1.csproj iot1/
RUN dotnet restore "iot1/iot1.csproj"
COPY . ./iot1
WORKDIR "/src/iot1"
RUN dotnet build "iot1.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "iot1.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "iot1.dll"]
