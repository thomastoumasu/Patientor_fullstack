# use existing image as basis
FROM node:20
# FROM --platform=linux/amd64 node:20
# or with environment variable
# export DOCKER_DEFAULT_PLATFORM=linux/amd64
# to unset
# unset DOCKER_DEFAULT_PLATFORM

# create work dir to avoid destroying existing files on the container
WORKDIR /usr/src/app

# copy code to the image. files marked in .dockerignore will not be copied.
COPY --chown=node:node . .

# install files within the image
RUN sh bin/bash/build_step.sh

# set user with low permissions
USER node

EXPOSE 3001

# specify what will be executed when container built from the image is started
CMD npm run start