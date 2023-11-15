import cors from "cors";
import express from "express";

export const corsPlugin = (app) => {
  app.use(cors());
};

export const bodyParserPlugin = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
};
