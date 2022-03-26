import axios, { AxiosResponse } from 'axios';
import { Request, Response, NextFunction } from 'express';

import { handleRestError } from '../utils';
import { URI_MS_PROJECTS } from '../constants';

/**
 * Middleware to check if the user has the required permissions
 * NOTE: Should be used after the authentication middleware
 *
 * @param accessGlobal - "null" if no restrictions, ["roleName", "roleName"] if user must have at least one of the roles
 * @param accessProject - "null" if no restrictions, ["roleName", "roleName"] if user must have at least one of the roles
 */
export const mwPermissions =
	(accessGlobal: string[] | null = null, accessProject: string[] | null = null) =>
	async (req: Request, res: Response, next: NextFunction) => {
		const tokenHeader = req?.headers?.authorization ?? '';
		const userRole = res.locals.role;

		// Global access is restricted
		if (accessGlobal !== null && !accessGlobal.includes(userRole)) {
			return res.status(403).json({ message: 'You do not have the required permissions' });
		}

		// Project access is restricted
		if (accessProject !== null) {
			const projectId = req.params.projectId;
			const userId = res.locals.userId;

			try {
				const userProjectRole: AxiosResponse = await axios.get(
					`${URI_MS_PROJECTS}/projects/${projectId}/users/${userId}`,
					{ headers: { Authorization: tokenHeader } }
				);

				const projectRole = userProjectRole?.data?.payload?.role;

				if (!accessProject.includes(projectRole)) {
					return res
						.status(403)
						.json({ message: 'You do not have the required project permissions' });
				}
			} catch (error) {
				const errorData = handleRestError(error);

				return res.status(errorData[0]).json(errorData[1]);
			}
		}

		return next();
	};
