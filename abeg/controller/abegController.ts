import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { publishConnection } from "../utils/connection";

const prisma = new PrismaClient();

export const createAbeg = async (req: any, res: Response) => {
  try {
    const { id } = req.user;
    const { title, motivation, detailDescription, amountNeeded } = req.body;

    const beg = await prisma.crowdAbeg.create({
      data: {
        title,
        userID: id,
        motivation,
        detailDescription,
        amountNeeded,
        amountRaised: 0,
        givers: [],
        love: [],
        picture: "",
        pictureID: "",
      },
    });

    publishConnection("beg", beg);

    return res.status(201).json({
      message: "Your plead has been created successfully",
      data: beg,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error",
      data: error,
    });
  }
};

export const viewAbeg = async (req: Request, res: Response) => {
  try {
    const { abegID } = req.params;

    const beg = await prisma.crowdAbeg.findUnique({
      where: { id: abegID },
    });
    return res.status(200).json({
      message: "abegged",
      data: beg,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error",
    });
  }
};

export const updateBegInfo = async (req: Request, res: Response) => {
  try {
    const { begID } = req.params;
    const { motivation, detailDescription } = req.body;

    const beg = await prisma.crowdAbeg.update({
      where: { id: begID },
      data: {
        motivation,
        detailDescription,
      },
    });
    return res.status(201).json({
      message: "beg",
      data: beg,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error",
    });
  }
};

export const daleteBeg = async (req: Request, res: Response) => {
  try {
    const { begID } = req.params;

    await prisma.crowdAbeg.delete({
      where: { id: begID },
    });
    return res.status(201).json({
      message: "beg deleted",
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error",
    });
  }
};
