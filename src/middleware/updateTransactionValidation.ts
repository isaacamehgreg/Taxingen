import {NextFunction, Request, Response} from "express";
import Joi from "joi";
import {validationError} from "../utils/exceptions";

const validateUpdateTransaction = async (req: Request, res: Response, next: NextFunction) => {
    const {
        transactionId,
        status
    } = req.body;

    const format = Joi.object().keys({
        transactionId: Joi.number().required(),
        status: Joi.string().required()
    });

    format.validateAsync({
        transactionId,
        status
    }, {stripUnknown: true}).then(async () => {

        if (transactionId == "") {
            throw 'TransactionId is required'
        }

        if (status == "") {
            throw 'Status is required'
        }

        next();

    }).catch(err => {
        return res.status(validationError().status).json(validationError(err.details[0].message).response);
    });
}

export {
    validateUpdateTransaction
}
