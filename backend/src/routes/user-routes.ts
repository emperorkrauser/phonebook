import { Request, Response, Router } from 'express';
import { UserController } from '../controllers';

export function UserRouter(AppRouter: Router) {
  AppRouter.route('/user').get(async (req: Request, res: Response) => {
    const result = await UserController.browse();
    res.send(result);
  });

  AppRouter.route('/user/:uuid').get(async (req: Request, res: Response) => {
    const { uuid } = req.params;
    const result = await UserController.browseOne(uuid as string);
    res.send(result);
  });

  AppRouter.route('/user').post(async (req: Request, res: Response) => {
    const { data } = req.body;
    const result = await UserController.add(data);
    res.send(result);
  });

  AppRouter.route('/user/:uuid').put(async (req: Request, res: Response) => {
    const { uuid } = req.params;
    const { data } = req.body;
    const result = await UserController.update(uuid as string, data);
    res.send(result);
  });

  AppRouter.route('/user/:uuid').delete(async (req: Request, res: Response) => {
    const { uuid } = req.params;
    const result = await UserController.delete(uuid);
    res.send(result);
  });
}
