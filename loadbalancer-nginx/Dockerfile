FROM nginx:1.15.2

ADD nginx.conf /etc/nginx/nginx.conf
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
RUN chmod +x /wait

CMD ["nginx", "-g", "'daemon off;'"]