FROM microsoft/aspnetcore-build:2.0
EXPOSE 80
WORKDIR /src
COPY *.sln ./
COPY BookTracker.Web/BookTracker.Web.csproj BookTracker.Web/
RUN dotnet restore
COPY . .
WORKDIR /src/BookTracker.Web
RUN dotnet build
ENV ASPNETCORE_URLS http://*:80
ENTRYPOINT ["dotnet", "BookTracker.Web.dll"]
