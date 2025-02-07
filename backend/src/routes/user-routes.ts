import { Request, Response, Router } from 'express';
import { UserController } from '../controllers';

export function UserRouter(AppRouter: Router) {
  AppRouter.route('/user').get(async (req: Request, res: Response) => {
    const data = req.query;
    try {
      const result = await UserController.browse(data);
      res.status(200).json({
        data: result,
        message: 'User list fetched successfully.',
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Internal server error.',
        error,
      });
    }
  });

  AppRouter.route('/user/q').get(async (req: Request, res: Response) => {
    const { email } = req.query;

    try {
      const result = await UserController.browseByEmail(email as string);
      if (!result) {
        return res.status(404).json({
          message: 'User not found.',
        });
      }
      return res.status(200).json({
        data: result,
        message: 'User fetched successfully by email.',
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Internal server error.',
        error,
      });
    }
  });

  AppRouter.route('/user/:uuid').get(async (req: Request, res: Response) => {
    const { uuid } = req.params;
    try {
      const result = await UserController.browseOne(uuid as string);
      if (!result) {
        return res.status(404).json({
          message: 'User not found.',
        });
      }
      return res.status(200).json({
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
    const data = req.body;
    try {
      const result = await UserController.add(data);
      if (!result) {
        return res.status(404).json({
          message: 'Unable to add user.',
        });
      }
      return res.status(200).json({
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

  AppRouter.route('/user/edit/:uuid').put(
    async (req: Request, res: Response) => {
      const { uuid } = req.params;
      const data = req.body;
      try {
        const result = await UserController.update(uuid as string, data);
        if (!result) {
          return res.status(404).json({
            message: 'Unable to update user.',
          });
        }
        return res.status(200).json({
          data: result,
          message: 'User updated successfully.',
        });
      } catch (error) {
        res.status(500).json({
          message: 'Internal server error.',
          error,
        });
      }
    }
  );

  AppRouter.route('/user/delete/:uuid').put(
    async (req: Request, res: Response) => {
      const { uuid } = req.params;
      try {
        const result = await UserController.delete(uuid);
        if (!result) {
          return res.status(404).json({
            message: 'Unable to delete user.',
          });
        }
        return res.status(200).json({
          data: result,
          message: 'User deleted successfully.',
        });
      } catch (error) {
        res.status(500).json({
          message: 'Internal server error.',
          error,
        });
      }
    }
  );
}
