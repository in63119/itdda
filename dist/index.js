"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var morgan_1 = __importDefault(require("morgan"));
var app = express_1.default();
app.use(cors_1.default());
app.use(morgan_1.default('dev'));
// using morgan in TS
app.use('/', function (req, res) {
    res.send('welcome to datda world!! hello!!');
});
app.listen(5000, function () {
    console.log('server on 5000');
});
