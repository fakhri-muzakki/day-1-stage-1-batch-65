import { type Request, type Response } from 'express';

const renderContact = async (req: Request, res: Response) => {
  res.render('pages/contact', {
    layout: 'layouts/main',
    title: 'Contact',
    username: 'Fakhri',
    isLogin: true,
    projects: ['Express', 'TypeScript', 'HBS'],
  });
};

const contactController = { renderContact };
export default contactController;
