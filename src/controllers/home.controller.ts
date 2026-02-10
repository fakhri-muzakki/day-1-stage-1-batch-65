import { type Request, type Response } from 'express';

const renderHome = async (req: Request, res: Response) => {
  const username = req.session.user?.username;

  res.render('pages/home', {
    layout: 'layouts/main',
    title: 'Home',
    username,
  });
};

const homeController = { renderHome };
export default homeController;
