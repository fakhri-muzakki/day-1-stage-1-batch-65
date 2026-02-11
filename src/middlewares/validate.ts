import { type ZodType } from 'zod';
import { type Request, type Response, type NextFunction } from 'express';
import projectService from '../services/project.service';
import technologyService from '../services/technology.service';

const getUserId = (req: Request): string => {
  if (!req.session.user) {
    throw new Error('User is not authenticated');
  }

  return req.session.user.id;
};

export const validateHbs =
  (schema: ZodType, dataType: 'body' | 'query' | 'params' = 'body') =>
  async (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[dataType]);

    if (!result.success) {
      const errors: Record<string, string> = {};

      result.error.issues.forEach((err) => {
        const field = err.path.join('.');
        errors[field] = err.message;
      });

      // console.log(req);
      console.log(req.body);

      if (
        !req.originalUrl.includes('register') &&
        !req.originalUrl.includes('login')
      ) {
        const technologies = await technologyService.get();
        const mappedTechnologies = technologies.map((tech) => ({
          ...tech,
          checked: req.body.technologies.includes(tech.id),
        }));

        if (req.originalUrl.includes('PUT')) {
          return res.render('pages/projects/editProject', {
            layout: 'layouts/main',
            errors: errors,
            technologies: mappedTechnologies,
            project: {
              ...req.body,
              start_date: req.body.startDate,
              end_date: req.body.endDate,
            },
          });
        }

        const userID = getUserId(req);

        const data = await projectService.getAllByUserId(userID);

        return res.render('pages/projects/projects', {
          layout: 'layouts/main',
          errors: errors,
          technologies: mappedTechnologies,
          projects: data,
          project: {
            ...req.body,
            start_date: req.body.startDate,
            end_date: req.body.endDate,
          },
        });
      } else if (req.originalUrl.includes('register')) {
        return res.render('pages/auth/register', {
          layout: 'layouts/auth',
          errors: errors,
          old: { ...req.body },
        });
      } else if (req.originalUrl.includes('login')) {
        return res.render('pages/auth/login', {
          layout: 'layouts/auth',
          errors: errors,
          old: { ...req.body },
        });
      }
    }

    req[dataType] = result.data;
    next();
  };
