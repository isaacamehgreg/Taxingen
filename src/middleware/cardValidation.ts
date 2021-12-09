import Joi from "joi";
import {validationError} from "../utils/exceptions";
import {NextFunction, Request, Response} from "express";

export const createCardValidation = async (req: Request, res: Response, next: NextFunction) => {
    const {
       name,
        rate,
        image
    } = req.body;

    const format = Joi.object().keys({
        name: Joi.string().required(),
        rate: Joi.number().required(),
        image: Joi.string().required(),
    });

    format.validateAsync({
        name,
        rate,
        image
    }, {stripUnknown: true}).then(async () => {
        next();
    }).catch(err => {
        return res.status(validationError().status).json(validationError(err.details[0].message).response);
    });
}

export const updateCardValidation =  async (req: Request, res: Response, next: NextFunction) => {
    const {
        cardId,
        name,
        rate,
        image
    } = req.body;

    const format = Joi.object().keys({
        cardId: Joi.number().required(),
        name: Joi.string(),
        rate: Joi.number(),
        image: Joi.string(),
    });

    format.validateAsync({
        cardId,
        name,
        rate,
        image
    }, {stripUnknown: true}).then(async () => {
        next();
    }).catch(err => {
        return res.status(validationError().status).json(validationError(err.details[0].message).response);
    });
}
