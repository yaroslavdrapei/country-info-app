# Country Info App

## Requirements to start the application

- Git
- Docker
- Node.js

## Setup


### 1. Get the app from github

```bash
git clone https://github.com//yaroslavdrapei/country-info-app
```

### 2. Go inside the project folder and install all dependencies

```bash
npm i
```

### 3. Start the MongoDB Database using Docker

Run this command in your console:

```bash
docker run -d -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=securepassword mongo:latest  
```

### 4. Start the app

Run this command in your consode, it starts the application itself
```bash
npm run start:prod
```

### You may test the endpoints now!