const crypto = require('crypto');

module.exports = class Encrypt {
    static encrypt(password) {
        return (
            crypto
                .createHmac("sha256", "Sveriges radio webb")
                .update(password)
                .digest("hex")
            );
    }
};