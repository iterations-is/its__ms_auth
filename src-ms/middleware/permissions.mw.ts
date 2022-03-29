import axios, { AxiosResponse } from 'axios';
import { Request, Response, NextFunction } from 'express';

import { handleRestError } from '../utils';
import { API_INTERNAL_TOKEN, URI_MS_PROJECTS, URI_MS_USERS } from '../constants';
import { MessageDTO } from '../dto';

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
		const userId = res.locals.userId;

		// Global access is restricted
		if (accessGlobal !== null) {
			try {
				const userRole: AxiosResponse = await axios.get(`${URI_MS_USERS}/users/${userId}`, {
					headers: { Authorization: tokenHeader },
				});

				res.locals.role = userRole.data?.payload?.role?.name;

				if (!accessGlobal.includes(res.locals.role))
					return res.status(403).json({
						message: 'You do not have the required permissions',
						payload: {
							currentRole: res.locals.role,
						},
					} as MessageDTO);
			} catch (error) {
				const errorData = handleRestError(error);

				return res.status(errorData[0]).json(errorData[1]);
			}
		}

		// Project access is restricted
		if (accessProject !== null) {
			const projectId = req.params.projectId;

			try {
				const userProjectRole: AxiosResponse = await axios.get(
					`${URI_MS_PROJECTS}/projects/${projectId}/users/${userId}`,
					{
						headers: {
							Authorization: tokenHeader,
							'x-its-ms': API_INTERNAL_TOKEN,
						},
					}
				);

				let projectRole = userProjectRole?.data?.payload?.role;
				projectRole =
					projectRole !== 'Leader' && projectRole !== 'Visitor' ? 'Member' : projectRole;

				if (!accessProject.includes(projectRole)) {
					return res.status(403).json({
						message: 'You do not have the required project permissions',
					} as MessageDTO);
				}
			} catch (error) {
				const errorData = handleRestError(error);

				return res.status(errorData[0]).json(errorData[1]);
			}
		}

		return next();
	};
