import { Request, Response, Router } from 'express';
import { ContactController } from '../controllers';

export function ContactRouter(AppRouter: Router) {
  AppRouter.route('/contact').get(async (req: Request, res: Response) => {
    const result = await ContactController.browse();
    res.send(result);
  });

  AppRouter.route('/contact/:uuid').get(async (req: Request, res: Response) => {
    const { uuid } = req.params;
    const result = await ContactController.browseOne(uuid as string);
    res.send(result);
  });

  AppRouter.route('/contact').post(async (req: Request, res: Response) => {
    const { data } = req.body;
    const result = await ContactController.add(data);
    res.send(result);
  });

  AppRouter.route('/contact/:uuid').put(async (req: Request, res: Response) => {
    const { uuid } = req.params;
    const { data } = req.body;
    const result = await ContactController.update(uuid as string, data);
    res.send(result);
  });

  AppRouter.route('/contact/:uuid').delete(
    async (req: Request, res: Response) => {
      const { uuid } = req.params;
      const result = await ContactController.delete(uuid);
      res.send(result);
    }
  );
}
