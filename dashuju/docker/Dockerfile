FROM  registry.ssecloud.com/library/nginx:1.10
copy dw-front.tar.gz /usr/share/nginx/dw-front.tar.gz
WORKDIR /usr/share/nginx/
RUN tar -zxvf dw-front.tar.gz
RUN rm -rf dw-front.tar.gz
RUN chmod +x /usr/share/nginx/dw-front/docker/start-nginx.sh
ENTRYPOINT sh /usr/share/nginx/dw-front/docker/start-nginx.sh