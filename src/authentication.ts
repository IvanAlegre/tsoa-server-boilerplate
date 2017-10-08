import { Request } from 'express'

export async function expressAuthentication (request: Request, securityName: string, scopes?: string[]): Promise<any> {
  const user = (request as any).user

  if (securityName === 'adminRequired') {
    if (user.isAdmin()) return user
    throw { status: 403, message: 'You don\'t have permissions' }
  }

  if (securityName === 'loginRequired') {
    if (user.isAuthenticated()) return user
    throw { status: 401, message: 'You have to be logged in' }
  }

  if (securityName === 'permissionRequired') {
    if (scopes.length !== 1) throw { status: 500, message: 'Only one perm can be provided' }
    if (user.hasPermission(scopes[0])) return user
    throw { status: 403, message: 'You don\'t have permissions' }
  }

  throw { status: 500, message: `Invalid securityName ${securityName} provided` }
}
