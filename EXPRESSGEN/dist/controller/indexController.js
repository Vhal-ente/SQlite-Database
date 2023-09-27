"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = void 0;
const indexController = (req, res, next) => {
    res.render('index', { title: 'Express' });
};
exports.indexController = indexController;
