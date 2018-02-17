FROM microsoft/aspnetcore-build:2.0 AS build-env

WORKDIR /app

ADD . /app

RUN dotnet restore BookTracker.sln

RUN dotnet publish -c Release -o ../out BookTracker.Web/*.csproj

# Build runtime image
FROM microsoft/aspnetcore:2.0
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "BookTracker.Web.dll"]