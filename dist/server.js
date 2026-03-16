"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const env_1 = require("./config/env");
const start = () => {
    try {
        app_1.app.listen(env_1.config.port, () => {
            console.log(`🚀 Server running on port ${env_1.config.port} in ${env_1.config.env} mode`);
        });
    }
    catch (error) {
        console.error('Error starting server:', error);
        process.exit(1);
    }
};
start();
//# sourceMappingURL=server.js.map