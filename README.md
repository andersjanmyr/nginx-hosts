# nginx-hosts

List the hosts that are served by an nginx configuration file.

The configuration file can be changed with `ENV NGINX_FILE`

```
ENV NGINX_FILE /etc/nginx/conf.d/default.conf
```

Make sure to mount this directory with `-v /etc/nginx/conf.d:/etc/nginx/conf.d`

## Usage

The container must be run on the same hosts as the nginx config file.

```
docker run -d --name nginx-hosts \
  -p 80 \
  -v /etc/nginx/conf.d:/etc/nginx/conf.d \
  --env VIRTUAL_HOST=nginx-hosts.lifelog-dev.sonymobile.com \
  --env constraint:public==yes \
  andersjanmyr/nginx-hosts
```
