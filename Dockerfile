## This file is to create an image of the service and run it i.e create a container.
## This file is used by the docker build command for instructions on how to build the image
## Use docker run command to run the image i.e. create container.

FROM node:8

# Will create a new directory inside '/' i.e. /serviceRegistry and cd to it as well IN the docker image. Do not confuse with the pwd of local app where dockerfile exist and pwd inside docker image.
WORKDIR serviceRegistry

# Copy package.json first and not do 'Copy . .' because that will take time and npm run will try to run.

# /serviceRegistry is a absolute path, could also have done --> COPY package.json .
COPY package.json /serviceRegistry

RUN npm install

# Copying everything from the local folder where the Dockerfile exist to the docker's '/serviceRegistry'
COPY . /serviceRegistry


# Note the above 'COPY . /serviceRegistry' could be achieved using relative path '.', since we are already in the serviceRegistry as we did WORKDIR above and did not change path after that.
# COPY . .

CMD ["npm", "client"]
CMD [ "npm", "start"]


# Two things 1) EXPOSE and 2) using -p in the docker run cmd for publish.
# EXPOSE is used for inter dockers communication. Publishing is important when the service needs to be accessed from outside e.g localhost.

# It is not needed when doing -p because it will expose too. But still good to have for later when -p is not used for outside access and just want to allow container <-> container communication.

EXPOSE 9001

