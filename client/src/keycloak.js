
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const keycloak_js_1 = __importDefault(require("keycloak-js"));
const keycloak = new keycloak_js_1.default({
    url: 'http://localhost:8080/auth',
    realm: 'JPRealm',
    clientId: 'Administrator',
});
exports.default = keycloak;
