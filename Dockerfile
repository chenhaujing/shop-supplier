FROM nginx:1.13.1
VOLUME /data
COPY ./dist/ /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/nginx.conf
