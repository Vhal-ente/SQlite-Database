"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
/* GET home page. */
router.get('/', (req, res, next) => {
    res.render("Home");
});
router.get('/login', (req, res, next) => {
    res.render("Login");
});
router.get('/sign-out', (req, res, next) => {
    res.render("Register");
});
exports.default = router;
