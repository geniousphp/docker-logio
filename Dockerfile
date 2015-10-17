# docker logio harvester
FROM node:0.10-onbuild
MAINTAINER Elghazal Ahmed <geniousphp@gmail.com>


ENTRYPOINT ["/usr/src/app/index.js"]

ADD ./boot.sh /opt/boot.sh
RUN chmod +x /opt/boot.sh

CMD /opt/boot.sh