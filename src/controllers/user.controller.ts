import { type Request, type Response } from 'express';

const renderUsers = async (req: Request, res: Response) => {
  res.render('pages/users', {
    layout: 'layouts/main',
    title: 'Home',
  });
};

const userController = { renderUsers };
export default userController;
