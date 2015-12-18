FROM node:4-onbuild

EXPOSE 80

ENV PORT 80
ENV NGINX_FILE /etc/nginx/conf.d/default.conf
