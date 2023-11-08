import { Router } from "express";

export interface RouterModel {
    register(): Router;
}