import { Request, Response } from 'express';

const renderHome = async (req: Request, res: Response) => {
  res.render('pages/home', {
    layout: 'layouts/main',
    title: 'Home',
    username: 'Fakhri',
    isLogin: true,
    projects: ['Express', 'TypeScript', 'HBS'],
  });
};

const homeController = { renderHome };
export default homeController;
