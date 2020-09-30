# stage1 as builder
FROM node:10-alpine as react-build
# copy the package.json to install dependencies
COPY package.json package-lock.json ./
# Install the dependencies and make the folder
RUN npm install --silent && mkdir /vpl-ui && mv ./node_modules ./vpl-ui/
WORKDIR /vpl-ui
COPY . ./
# Build the project and copy the files
RUN npm run build


FROM nginx:alpine
#!/bin/sh
COPY ./config/docker/vplui.conf /etc/nginx/conf.d/default.conf
# Copy from the stage 1
COPY --from=react-build /vpl-ui/dist /usr/share/nginx/html
EXPOSE 5000 5000
ENTRYPOINT ["nginx", "-g", "daemon off;"]
