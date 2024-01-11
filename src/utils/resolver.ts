import { z } from 'zod'

export const msgCodeLoginFormSchema = z.object({
  tel: z
    .string()
    .startsWith('1')
    .min(11, {
      message: 'Make sure the input format is correct.'
    })
    .max(11, {
      message: 'Make sure the input format is correct.'
    }),
  msg: z
    .string()
    .min(4, {
      message: 'Make sure the input format is correct.'
    })
    .max(4, {
      message: 'Make sure the input format is correct.'
    }),
  autoLogin: z.boolean().default(false)
})
