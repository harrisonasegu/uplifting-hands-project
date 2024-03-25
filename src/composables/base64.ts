import { Buffer } from 'buffer/'

export const useToBase64 = (str: string) => Buffer.from(str).toString('base64')

export const useFromBase64 = (str: string) => Buffer.from(str, 'base64').toString()
