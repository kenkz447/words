import jwt from 'express-jwt'
import { appSecret } from '@/config'

export class JwtFactory {
	static create() {
		return jwt({ secret: appSecret })
	}
}