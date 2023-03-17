"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Define routes
router.get('/activity', (req, res) => {
    res.send('This should send you a random formatted activity!');
    throw new Error("Not implemented yet");
});
router.post('/user', (req, res) => {
    res.send('This should let you set the current user profile!');
    throw new Error("Not implemented yet");
});
module.exports = router;
