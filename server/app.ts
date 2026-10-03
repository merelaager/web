import { createRequestHandler } from "@react-router/express";
import express, { type Express } from "express";

export const app: Express = express();

app.use(
  createRequestHandler({
    build: () => import("virtual:react-router/server-build"),
  })
);
