import { Request, Response, Router } from 'express';
import { UserController } from '../controllers';

export function UserRouter(AppRouter: Router) {
  AppRouter.route('/user').get(async (req: Request, res: Response) => {
    try {
      const result = await UserController.browse();
      res.status(200).json({
        data: result,
        message: 'User list fetched successfully.',
      });
    } catch (error) {
      res.status(500).json({
        message: 'Internal server error.',
        error,
      });
    }
  });

  AppRouter.route('/user/:uuid').get(async (req: Request, res: Response) => {
    const { uuid } = req.params;
    try {
      const result = await UserController.browseOne(uuid as string);
      res.status(200).json({
        data: result,
        message: 'User fetched successfully.',
      });
    } catch (error) {
      res.status(500).json({
        message: 'Internal server error.',
        error,
      });
    }
  });

  AppRouter.route('/user').post(async (req: Request, res: Response) => {
    const { data } = req.body;
    try {
      const result = await UserController.add(data);
      res.status(200).json({
        data: result,
        message: 'User added successfully.',
      });
    } catch (error) {
      res.status(500).json({
        message: 'Internal server error.',
        error,
      });
    }
  });

  AppRouter.route('/user/:uuid').put(async (req: Request, res: Response) => {
    const { uuid } = req.params;
    const { data } = req.body;
    try {
      const result = await UserController.update(uuid as string, data);
      res.status(200).json({
        data: result,
        message: 'User updated successfully.',
      });
    } catch (error) {
      res.status(500).json({
        message: 'Internal server error.',
        error,
      });
    }
  });

  AppRouter.route('/user/:uuid').delete(async (req: Request, res: Response) => {
    const { uuid } = req.params;
    try {
      const result = await UserController.delete(uuid);
      res.status(200).json({
        data: result,
        message: 'User deleted successfully.',
      });
    } catch (error) {
      res.status(500).json({
        message: 'Internal server error.',
        error,
      });
    }
  });
}
