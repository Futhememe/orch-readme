import { z } from 'zod'

export const createProjectSchema = z.object({
  name: z.string().min(1, { message: 'Required' }),
  path: z.string().min(1, { message: 'Required' })
})

export type ICreateProjectSchema = z.infer<typeof createProjectSchema>
