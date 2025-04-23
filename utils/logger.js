exports.log = (message) => {
    console.log(`[LOG] ${new Date().toISOString()}: ${message}`);
};

exports.error = (message) => {
    console.error(`[ERROR] ${new Date().toISOString()}: ${message}`);
};
