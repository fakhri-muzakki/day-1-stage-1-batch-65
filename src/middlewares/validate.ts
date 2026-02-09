import { type ZodType } from 'zod';
import { type Request, type Response, type NextFunction } from 'express';
import projectService from '../services/project.service';
import technologyService from '../services/technology.service';

export const validateHbs =
  (schema: ZodType, dataType: 'body' | 'query' | 'params' = 'body') =>
  async (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[dataType]);

    console.log(req.body);

    if (!result.success) {
      const errors: Record<string, string> = {};

      result.error.issues.forEach((err) => {
        const field = err.path.join('.');
        errors[field] = err.message;
      });

      console.log(errors);

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

      const userID = '5553b625-1027-471b-b69b-d012050055fa';

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
    }

    req[dataType] = result.data;
    next();
  };
