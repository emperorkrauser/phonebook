import { Request, Response, Router } from 'express';
import {
  AuthSchemaValidation,
  RegisterSchemaValidation,
} from '../joi-validation';
import { UserController } from '../controllers';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const secretKey = process.env.SECRET_KEY as string;

export function AuthRouter(AppRouter: Router) {
  AppRouter.route('/login').get(async (req: Request, res: Response) => {
    const { error, value } = AuthSchemaValidation.validate(req.body);
    const { email, password } = value;

    try {
      if (error) {
        res.status(400).json({
          message: 'Unable to login.',
          status: error,
        });
      }

      const user = await UserController.browseByEmail(email);
      if (!user) {
        res.status(400).json({
          message: 'No user found.',
          status: error,
        });
      }

      const isPasswordValid = user?.password
        ? await bcrypt.compare(password, user.password)
        : false;
      if (!isPasswordValid) {
        return res.status(400).json({
          message: 'Invalid password.',
        });
      }

      if (!secretKey) {
        return res.status(500).json({
          message: 'Internal server error.',
        });
      }

      const token = jwt.sign({ id: user?._id, email: user?.email }, secretKey, {
        expiresIn: '1h',
      });

      res.status(200).json({
        data: user,
        message: 'Login successful.',
        token,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Internal server error.',
        status: error,
      });
    }
  });

  AppRouter.route('/register').post(async (req: Request, res: Response) => {
    const { error, value } = RegisterSchemaValidation.validate(req.body);
    const { email, password } = value;
    const saltRounds = 10;

    try {
      if (error) {
        res.status(400).json({
          message: 'Error in validating user details.',
          status: error,
        });
      }

      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const result = await UserController.browseByEmail(email);
      if (result) {
        res.status(400).json({
          message: 'Duplicate email found.',
          status: error,
        });
      }

      const addUserResponse = await UserController.add({
        ...value,
        password: hashedPassword,
      });

      if (!addUserResponse) {
        res.status(404).json({
          data: addUserResponse,
          message: 'Unable to register user.',
        });
      }
      res.status(200).json({
        data: addUserResponse,
        message: 'User registered successfully.',
      });
    } catch (error) {
      res.status(500).json({
        message: 'Internal server error.',
        status: error,
      });
    }
  });
}
