import userService from '@/services/user.service';
import { type Request, type Response } from 'express';
import bcrypt from 'bcrypt';
import path from 'path';

const renderLogin = async (req: Request, res: Response) => {
  return res.render('pages/auth/login', {
    layout: 'layouts/auth',
    title: 'Login',
  });
};

const renderRegiter = async (req: Request, res: Response) => {
  res.render('pages/auth/register', {
    layout: 'layouts/auth',
    title: 'Register',
  });
};

const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    // Cek apakah user sudah ada (get user by email)
    const user = await userService.getByEmail(email);
    if (user) {
      req.flash('error', 'User is already exis');
      return res.redirect('/register');
    }

    // hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // Tambahkan ke database
    await userService.createUser({
      username,
      email,
      password: hashPassword,
      role: 'user',
    });

    req.flash('success', 'Registrasi berhasil');
    return res.redirect('/login');
  } catch (error) {
    console.error('Login error:', error);

    req.flash('error', 'Something went wrong. Please try again.');
    return res.redirect('/login');
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await userService.getByEmail(email);
    if (!user) {
      req.flash('error', 'User not found');
      return res.redirect('/login');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      req.flash('error', 'Invalid email or password');
      return res.redirect('/login');
    }

    req.session.user = {
      id: user.id,
      username: user.username,
    };

    req.flash('success', 'Login successful');
    return res.redirect('/');
  } catch (error) {
    console.error('Login error:', error);

    req.flash('error', 'Something went wrong. Please try again.');
    return res.redirect('/login');
  }
};

const logout = (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Failed to destroy session:', err);

      req.flash('error', 'Failed to logout. Please try again.');
      return res.redirect('/dashboard');
    }

    res.clearCookie('my-app-session');
    return res.redirect('/login');
  });
};

const authController = { renderLogin, renderRegiter, register, login, logout };
export default authController;
