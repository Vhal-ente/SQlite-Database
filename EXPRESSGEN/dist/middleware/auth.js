"use strict";
// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";
// import { UserInstance } from "../Model/userModel";
// import { any } from "joi";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = require("../Model/userModel");
const jwtSecret = process.env.JWT_SECRET;
async function auth(req, res, next) {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(401).json({ error: "Please sign in" });
    }
    const token = authorization.slice(7, authorization.length);
    try {
        const verified = jsonwebtoken_1.default.verify(token, jwtSecret);
        // check if user exist in the database 
        const user = await userModel_1.UserInstance.findOne({ where: { id: verified.id } });
        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }
        req.user = verified;
        next();
    }
    catch (error) {
        return res.status(401).json({ error: "Invalid Token, you can't access this route" });
    }
}
exports.auth = auth;
