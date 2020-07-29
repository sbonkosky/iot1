#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build
WORKDIR /src
COPY iot1/iot1.csproj iot1/
RUN dotnet restore "iot1/iot1.csproj"
COPY . .
WORKDIR "/src/iot1"
RUN dotnet build "iot1.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "iot1.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "iot1.dll"]
