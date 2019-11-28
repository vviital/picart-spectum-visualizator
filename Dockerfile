FROM node:10.16.0-jessie AS builder

WORKDIR /home/app

RUN npm i -g yarn

# Install all needed dependencies
COPY package.json .
COPY yarn.lock .
RUN yarn

# Build client
COPY src src
COPY public public
RUN yarn build

FROM nginx:stable

RUN apt update && apt install -y curl htop jq zsh

COPY --from=builder /home/app/build /var/www
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
