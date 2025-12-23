FROM alpine:3.20

WORKDIR /app

RUN apk --no-cache add curl

COPY traffic-gen.sh /app/traffic-gen.sh
RUN chmod +x /app/traffic-gen.sh

ENTRYPOINT [ "./traffic-gen.sh" ]
