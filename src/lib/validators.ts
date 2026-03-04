import { z } from 'zod';

export const reportFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  companyName: z.string().max(100).optional().default(''),
  email: z.string().email('Please enter a valid email'),
  linkedinUrl: z
    .string()
    .url('Must be a valid URL')
    .regex(/linkedin\.com/i, 'Must be a LinkedIn URL')
    .optional()
    .or(z.literal('')),
  twitterUrl: z
    .string()
    .url('Must be a valid URL')
    .regex(/x\.com|twitter\.com/i, 'Must be a Twitter/X URL')
    .optional()
    .or(z.literal('')),
  instagramUrl: z
    .string()
    .url('Must be a valid URL')
    .regex(/instagram\.com/i, 'Must be an Instagram URL')
    .optional()
    .or(z.literal('')),
  websiteUrl: z
    .string()
    .url('Must be a valid URL')
    .optional()
    .or(z.literal('')),
});

export type ValidatedFormData = z.infer<typeof reportFormSchema>;
