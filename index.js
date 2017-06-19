'use strict';

const server = require('./lib/server');

class OfflineSNS {
    constructor(serverless, options) {
        this.serverless = serverless;
        this.options = options;
        this.provider = this.serverless.getProvider('aws');
        this.start = this.start.bind(this);

        this.hooks = {
            'offline:start:init': this.start.bind(this),
            'offline:start': this.start.bind(this),
            'offline:start:end': this.end.bind(this),
        };
    }

    start() {
        server.create(this.serverless, this.options);
        server.parseSLSConfig(this.serverless);
        return server.listen();
    }

    end() {
        server.close()
            .then(() => process.exit(this.exitCode));
    }
}

module.exports = OfflineSNS;
