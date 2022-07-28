import { Router } from "express";
import { bold, yellow } from "colorette";
import { recommendationController } from "../controllers/recommendationController.js";


const testsRouter = Router();
console.log(bold(yellow("You are now in TEST mode")),
    yellow("\nUse the endpoint"), yellow(bold("/test/...")), yellow("to operate"));
testsRouter.post("/reset", recommendationController.deleteAllRecommendation);

export default testsRouter;