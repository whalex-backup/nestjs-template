#!/bin/zsh

# Turn on the local rabbitmq
# $ scripts
# docker-compose up rabbitmq -d --wait
# yarn build

USERNAME=nestjs-template
PASSWORD=nestjs-template

# Create exchange
curl -i -u $USERNAME:$PASSWORD -H "content-type:application/json" \
    -XPUT -d'{"type":"direct","durable":true}' \
    http://localhost:15672/api/exchanges/%2F/koo.direct

# Create queue
curl -i -u $USERNAME:$PASSWORD -H "content-type:application/json" \
    -XPUT -d'{"auto_delete":"false","durable":true,"arguments":{}}' \
    http://localhost:15672/api/queues/%2F/koo.queue.1

# Create queue2
curl -i -u $USERNAME:$PASSWORD -H "content-type:application/json" \
    -XPUT -d'{"auto_delete":"false","durable":true,"arguments":{}}' \
    http://localhost:15672/api/queues/%2F/koo.queue.2

# Connect routing key between exchange and queue
curl -i -u $USERNAME:$PASSWORD -H "content-type:application/json" \
    -POST -d'{"routing_key":"koo_routing_key", "arguments":{}}' \
    http://localhost:15672/api/bindings/%2F/e/koo.direct/q/koo.queue.1

# Connect routing key between exchange and queue
curl -i -u $USERNAME:$PASSWORD -H "content-type:application/json" \
    -POST -d'{"routing_key":"koo_routing_key", "arguments":{}}' \
    http://localhost:15672/api/bindings/%2F/e/koo.direct/q/koo.queue.2

# Get all connected channels
curl -i -u $USERNAME:$PASSWORD 'http://localhost:15672/api/channels?sort=message_stats.publish_details.rate&sort_reverse=true&columns=name,message_stats.publish_details.rate,message_stats.deliver_get_details.rate'

node dist/src/exec/rabbitmq-local-test.js

# Shuting down local rabbitmq
# $ scripts
# docker-compose down
