import express, { Request, Response } from 'express';
import { ControllerBase } from '../../interfaces/controllerBase.interface';

class HomeController implements ControllerBase {
  public path = '/';

  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes(): void {
    this.router.get('/', this.index);
  }

  index = (req: Request, res: Response): void => {
    const users = [
      {
        id: 1,
        name: 'Ali',
      },
      {
        id: 2,
        name: 'Can',
      },
      {
        id: 3,
        name: 'Ahmet',
      },
    ];

    res.send(users);
  };
}

export default HomeController;
