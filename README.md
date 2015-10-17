# docker-logio

This is a fork for [docker-logio](https://github.com/gerchardon/docker-logio). It allows you to forward all your docker logs to [Log-Io](http://logio.org/). docker-logio forward all containers's logs to Log-Io. This fork allows you to filter the list of containers by name.

## Usage as a Container

### Docker Compose

```
cat >docker-compose.yml <<EOF
logs:
    image: quay.io/geniousphp/dockerlogio_logs
    links:
    - logio
    volumes:
    - /var/run/docker.sock:/var/run/docker.sock
    command: -h logio -n docker
    privileged: true
    environment:
    - MATCHBYNAME=filter #here you write your filter string 
logio:
    image: temal/logio-server
    ports:
    - "28777:28777"
    - "28778:28778"
EOF
docker-compose up
```

This is awesome when you start your developement stack with Docker-compose, you might want to show log of only those containers.
See LogIo http://localhost:28778

## License

MIT
