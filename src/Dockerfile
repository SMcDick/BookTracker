FROM microsoft/aspnetcore-build:2.0
EXPOSE 80

WORKDIR /src
COPY . /app

RUN dotnet restore

WORKDIR /BookTracker.Web
RUN dotnet build

ENV ASPNETCORE_URLS http://*:80
#ENTRYPOINT ["dotnet", "BookTracker.Web.dll"]
ENTRYPOINT ["dotnet", "run"]