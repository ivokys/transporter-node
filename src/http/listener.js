import http from 'http'
import Listener from '../listener'
import Debug from 'debug'

const debug = Debug('transporter:http-listener')

export default class HTTPListener extends Listener {
    constructor(config = {}) {
        super()
        this._config = {
            port: 3001,
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            ...config,
        }
        this._server = http.createServer(this._handle)
    }

    _handle = async (req, res) => {
        debug(req.method, req.url)
        if (req.method == 'OPTIONS') {
            var headers = {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Credentials': false,
                'Access-Control-Max-Age': '86400',
                'Access-Control-Allow-Headers': 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept',
            }
            res.writeHead(200, headers)
            res.end()
            return
        }
        if (req.method != 'POST') {
            this._send(res, 500, {
                success: false,
                error: {
                    message: 'Expected POST request'
                }
            })
            return
        }
        const msg = await body(req)
        const result = await this._process(msg)
        this._send(res, result.error? 500:200, result)
    }

    _send = (res, code, data) => {
        res.writeHead(code, {
            'Content-Type': 'application/json',
            ...this._config.headers,
        })
        const result = JSON.stringify(data)
        debug('Sending', result)
        res.end(result)
    }

    _start() {
        debug ('Starting HTTP server on port', this._config.port)
        return new Promise(resolve => {
            this._server.listen(this._config.port, () => {
                debug('HTTP server start')
                resolve()
            })
        })
    }
}

function body(req) {
    return new Promise((resolve, reject) => {
        let b = ''
        req.on('data', data => b+=data)
        req.on('end', () => {
            try {
                const parsed = JSON.parse(b)
                debug('Received', parsed)
                resolve(parsed)
            } catch (e) {
                reject(e)
            }
        })
    })
}
