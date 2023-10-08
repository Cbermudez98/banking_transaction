import { Request, Response } from "express";
import { HttpStatusCode } from "../utils/HttpStatus";
import { IResponseModel } from "../domain/ResponseModel";

export class ResponseHandler {
    static response(promise: Promise<IResponseModel>, req: Request, res: Response) {
        promise.then((response) => {
            res.status(response?.status || HttpStatusCode.RESPONSE_SUCCESS).send({ ...response.data });
        }).catch((error) => {
            res.status(error?.status || HttpStatusCode.INTERNAL_SERVER_ERROR).send({ error: error?.message || "Internal error" });
        });
    }
}