# base image
FROM node:10.15.3

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /usr/src/app/package.json
COPY src/ /usr/src/app/src/
COPY public/ /usr/src/app/public/
RUN npm install
RUN npm install -g serve
RUN npm run build
RUN rm -rf node_modules
# RUN npm install react-scripts@3.0.0 -g

# start app
CMD ["serve", "-s", "build"]
