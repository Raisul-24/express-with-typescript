"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
// parsers
app.use(express_1.default.json());
app.use(express_1.default.text());
// create router
const userRouter = express_1.default.Router();
const courseRouter = express_1.default.Router();
app.use('/api/v1/users', userRouter);
app.use('/api/v1/courses', courseRouter);
userRouter.post('/create-user', (req, res) => {
    const user = req.body;
    console.log(user);
    res.json({
        success: true,
        message: "User is created successfully",
        data: user,
    });
});
courseRouter.post('/create-course', (req, res) => {
    const course = req.body;
    console.log(course);
    res.json({
        success: true,
        message: "Course is created successfully",
        data: course,
    });
});
// middleware
const logger = (req, res, next) => {
    console.log(req.url, req.method, req.hostname);
    next();
};
// app.get('/', (req: Request, res: Response) => {
//   res.send('Hello World!!')
// });
// params
// app.get('/:userId', (req: Request, res: Response) => {
//    console.log(req.params.userId);
//   res.send('Hello World!!');
// });
// app.get('/:userId/:subId', (req: Request, res: Response) => {
//    console.log(req.params);
//   res.send('Hello World!!');
// });
// query
// app.get('/', (req: Request, res: Response) => {
//    console.log(req.query.email);
//   res.send('Hello World!!');
// });
app.get('/', logger, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send("something");
        // res.send(something) //for error check
    }
    catch (error) {
        console.log(error);
        next(error);
        // res.status(404).json({
        //    success: false,
        //    message: "Failed to get data",
        // })
    }
}));
app.post('/', logger, (req, res) => {
    console.log(req.body);
    res.json({
        message: "Successfully received data"
    });
});
app.all("*", (req, res) => {
    res.status(400).json({
        success: false,
        message: "Route isn't found"
    });
});
// global error handler
app.use((error, req, res, next) => {
    if (error) {
        res.status(404).json({
            success: false,
            message: "Something went wrong",
        });
    }
});
exports.default = app;
