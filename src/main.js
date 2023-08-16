import fastifyHttpProxy from '@fastify/http-proxy';
import Fastify from 'fastify';
const server = Fastify({
    logger: true
});

server.register(fastifyHttpProxy, {
    upstream: "unix+http:///run/kvmd/kvmd.sock",
    prefix: "/api",
    websocket: true,
});

server.get("/", function (request, reply) {
    reply.send({ hello: 'world' })
})

server.listen({ port: process.env.PORT || 80 }, function (err, address) {
    if (err) {
        server.log.error(err);
        process.exit(1)
    }
})