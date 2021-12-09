import {NextFunction, Request, Response} from "express";
import Joi from "joi";
import {validationError} from "../utils/exceptions";

export const updateRoleValidation = async (req: Request, res: Response, next: NextFunction) => {
    const {
        userId,
        role
    } = req.body;

    const format = Joi.object().keys({
        role: Joi.string().valid('user','admin').required(),
        userId: Joi.string().required()
    });

    format.validateAsync({
        userId,
        role
    }, {stripUnknown: true}).then(async () => {
        next();
    }).catch(err => {
        return res.status(validationError().status).json(validationError(err.details[0].message).response);
    });
}
