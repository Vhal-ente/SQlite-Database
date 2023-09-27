"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const indexController_1 = require("../controller/indexController");
const router = express_1.default.Router();
/* GET home page. */
router.get('/', indexController_1.indexController);
exports.default = router;
