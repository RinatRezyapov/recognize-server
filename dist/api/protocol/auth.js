"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProtocolCommand_1 = require("./ProtocolCommand");
class SignInCommand extends ProtocolCommand_1.default {
    constructor(email, password, token) {
        super('Auth', 'SignIn', { email, password, token });
    }
}
exports.SignInCommand = SignInCommand;
//# sourceMappingURL=auth.js.map