import {AsyncLocalStorage} from 'async_hooks'

import {NextFunction, Request, Response} from 'express'
import {generate} from 'short-uuid'


export const asyncLocalStorage = new AsyncLocalStorage<Map<string, string>>()

export function requestIdCreaterMiddleware(req: Request, res: Response, next: NextFunction) {

    asyncLocalStorage.run(new Map([['requestId', generate()]]), () => next())
}