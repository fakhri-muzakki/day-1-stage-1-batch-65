import z from 'zod';

export const createProjectSchema = z.object({
  name: z.string().min(5).max(50),

  startDate: z.string().min(1),
  endDate: z.string().optional(),

  description: z.string().min(10),

  technologies: z
    .union([z.string(), z.array(z.string())])
    .transform((val) => (Array.isArray(val) ? val : [val])),

  image: z.string().min(1),
});

export type CreateProductInput = z.infer<typeof createProjectSchema>;

export const updateProjectSchema = z.object({
  name: z.string().min(5).max(50),

  startDate: z.string().min(1),
  endDate: z.string().optional(),

  description: z.string().min(10),

  technologies: z
    .union([z.string(), z.array(z.string())])
    .transform((val) => (Array.isArray(val) ? val : [val])),

  image: z.string(),
  existingImage: z.string().min(1),
});

export type UpdateProductInput = z.infer<typeof updateProjectSchema>;
