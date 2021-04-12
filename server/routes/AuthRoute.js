import express from 'express';
import { validationResult } from 'express-validator';
import UserController from '../controller/AuthController';
import { verifyAuth } from '../middleware/authVerification';
import Validator from '../middleware/validator';

const router = express.Router();

router.post('/auth/signup',Validator.newAccountRules(),Validator.validateInput,UserController.UserController.signup);
router.post('/auth/signin',UserController.UserController.signin);
router.patch('/Auth/changePassword',verifyAuth,Validator.validateInput,UserController.UserController.changePassword);


export default router;

