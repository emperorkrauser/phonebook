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
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET as string;
const refreshTokens: string[] = [];

export function AuthRouter(AuthRouter: Router) {
  AuthRouter.route('/login').post(async (req: Request, res: Response) => {
    const { error, value } = AuthSchemaValidation.validate(req.body);
    const { email, password } = value;
    try {
      if (error) {
        return res.status(400).json({
          message: 'Unable to login.',
          status: error,
        });
      }

      const user = await UserController.browseByEmail(email);
      if (!user) {
        return res.status(400).json({
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
        expiresIn: '8h',
      });

      const refreshToken = jwt.sign(
        { id: user?._id, email: user?.email },
        refreshTokenSecret,
        {
          expiresIn: '7d',
        }
      );
      refreshTokens.push(refreshToken);

      res.status(200).json({
        data: { ...user, password: null },
        message: 'Login successful.',
        token,
        refreshToken,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Internal server error.',
        status: error,
      });
    }
  });

  AuthRouter.route('/token').post((req: Request, res: Response) => {
    const { token } = req.body;
    if (!token) {
      return res.status(401).json({ message: 'Refresh token is required' });
    }
    if (!refreshTokens.includes(token)) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    jwt.verify(token, refreshTokenSecret, (err: any, user: any) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid refresh token' });
      }

      const newToken = jwt.sign({ id: user.id, email: user.email }, secretKey, {
        expiresIn: '1h',
      });

      res.status(200).json({
        message: 'Token refreshed successfully.',
        token: newToken,
      });
    });
  });

  AuthRouter.route('/register').post(async (req: Request, res: Response) => {
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

  AuthRouter.route('/logout').post((req: Request, res: Response) => {
    const { token } = req.body;
    const index = refreshTokens.indexOf(token);
    if (index > -1) {
      refreshTokens.splice(index, 1);
    }
    res.status(200).json({
      data: {
        isLogout: true,
      },
      message: 'Logged out successfully',
    });
  });
}
