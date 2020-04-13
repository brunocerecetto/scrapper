import express, { Request, Response } from 'express';
import { Container } from 'typedi';
import ScrapperService from '../../services/scrapper';
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

  index = async (req: Request, res: Response): Promise<void> => {
    const scrapperServiceInstance = Container.get(ScrapperService); // Service locator
    const movies = await scrapperServiceInstance.GetMovies();
    res.json(movies);
  };
}

export default HomeController;
