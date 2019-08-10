# Stage 1 - the build process
FROM node:10.16.2 as build
WORKDIR /usr/app
ENV REACT_APP_API_URL=https://my.transfergo.com/api
COPY . ./
RUN npm install
RUN npm install react-scripts@3.0.1 -g
RUN npm rebuild node-sass
RUN npm run build

# Stage 2 - the production environment
FROM nginx:1.17.2-alpine
COPY --from=build /usr/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
