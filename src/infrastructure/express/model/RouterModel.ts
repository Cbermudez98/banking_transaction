import { Router } from "express";

export interface RouterModel {
    register(route: Router): Router;
}