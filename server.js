import { createServer, IncomingMessage } from 'node:http';
import { EventEmitter } from "node:events";

const hostname = '127.0.0.1';
const port = 3000;

const server = createServer(async (request, response) => {

    const body = await parseBody(request);
    console.log(`Body: ${body}`)

    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
    response.end(body);
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
/**
 *
 *
 * @author Drazi Crendraven
 * @param {IncomingMessage} request
 * @returns {Promise<string>}
 */
async function parseBody(request) {
    let bodyChunks = [];

    let body = ""

    const bodyPromise = new Promise((resolve, reject) => {
        request.on('data', (chunk) => {
            bodyChunks.push(chunk);
        })
        request.on('end', () => {
            body = bodyChunks.toString()
            resolve(body)
        });
        request.on("error", (err) => { reject(err) })
    })
    return bodyPromise
}
