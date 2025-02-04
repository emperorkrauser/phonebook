import { Request, Response, Router } from 'express';
import { ContactController } from '../controllers';

export function ContactRouter(AppRouter: Router) {
  AppRouter.route('/contact').get(async (req: Request, res: Response) => {
    try {
      const result = await ContactController.browse();
      res.status(200).json({
        data: result,
        message: 'Contact list fetched successfully.',
      });
    } catch (error) {
      res.status(500).json({
        message: 'Internal server error.',
        error,
      });
    }
  });

  AppRouter.route('/contact/:uuid').get(async (req: Request, res: Response) => {
    const { uuid } = req.params;
    try {
      const result = await ContactController.browseOne(uuid as string);
      res.status(200).json({
        data: result,
        message: 'Contact fetched successfully.',
      });
    } catch (error) {
      res.status(500).json({
        message: 'Internal server error.',
        error,
      });
    }
  });

  AppRouter.route('/contact').post(async (req: Request, res: Response) => {
    const { data } = req.body;
    try {
      const result = await ContactController.add(data);
      res.status(200).json({
        data: result,
        message: 'Contact added successfully.',
      });
    } catch (error) {
      res.status(500).json({
        message: 'Internal server error.',
        error,
      });
    }
  });

  AppRouter.route('/contact/:uuid').put(async (req: Request, res: Response) => {
    const { uuid } = req.params;
    const { data } = req.body;
    try {
      const result = await ContactController.update(uuid as string, data);
      res.json(result);
    } catch (error) {
      res.status(500).json({
        message: 'Internal server error.',
        error,
      });
    }
  });

  AppRouter.route('/contact/:uuid').delete(
    async (req: Request, res: Response) => {
      const { uuid } = req.params;
      try {
        const result = await ContactController.delete(uuid);
        res.status(200).json({
          data: result,
          message: 'Contact deleted successfully.',
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
