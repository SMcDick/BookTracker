FROM microsoft/aspnetcore-build:2.0 AS build-env

# Use an official Python runtime as a parent image
#FROM python:2.7-slim

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
ADD . /app

RUN dotnet restore BookTracker.sln

RUN dotnet publish -c Release -o ../out BookTracker.Web/*.csproj

# Build runtime image
FROM microsoft/aspnetcore:2.0
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "BookTracker.Web.dll"]