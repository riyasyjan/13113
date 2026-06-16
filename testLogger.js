const Log = require("./logging-middleware/logger");

async function test() {
    await Log(
        "backend",
        "info",
        "handler",
        "Logger test successful"
    );
    
}
test();