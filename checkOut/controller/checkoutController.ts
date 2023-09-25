import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { publishConnection } from "../utils/connection";
import axios from "axios";

const prisma = new PrismaClient();

const URL: string = "http://localhost:3300";

export const createCheckOutWithPaystack = async (req: any, res: Response) => {
  try {
    const { abegID } = req.params;
    const { email, note, name, amount } = req.body;

    const beg = await prisma.crowdCheckOut.create({
      data: {
        abegID,
        email,
        note,
        name,
        amount,
      },
    });

    // publishConnection("beg", beg);

    return res.status(201).json({
      message: "Your checkout was been created successfully",
      data: beg,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error",
      data: error,
    });
  }
};

export const createCheckOutWithWallet = async (req: any, res: Response) => {
  try {
    const { id } = req.user;
    const { begID } = req.params;
    const { email, note, name, amount } = req.body;

    const options = {
      method: "GET",
      url: `${URL}/api/${id}/single-account`,
    };

    const wallet = await axios.request(options);

    if (wallet.data.data.profile[0].walletBalance > amount) {
      const check = await prisma.crowdCheckOut.create({
        data: {
          userID: id,
          abegID: begID,
          email,
          note,
          name,
          amount,
        },
      });

      publishConnection("check", check);

      return res.status(201).json({
        message: "Your checkout was been created successfully",
        data: check,
      });
    } else {
      return res.status(404).json({
        message: "Insufficient fund",
      });
    }

    return res.status(200).json({
      message: "data",
      data: wallet.data.data.profile[0].walletBalance,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error",
      data: error,
    });
  }
};

// export const createCheckOutWithWallet = async (req: any, res: Response) => {
//   try {
//     const { abegID } = req.user;
//     const { email, note, name, amount } = req.body;

//     const beg = await prisma.crowdCheckOut.create({
//       data: {
//         abegID,
//         email,
//         note,
//         name,
//         amount,
//       },
//     });

//     // publishConnection("beg", beg);

//     return res.status(201).json({
//       message: "Your checkout was been created successfully",
//       data: beg,
//     });
//   } catch (error) {
//     return res.status(404).json({
//       message: "Error",
//       data: error,
//     });
//   }
// };

// export const viewAbeg = async (req: Request, res: Response) => {
//   try {
//     const { abegID } = req.params;

//     const beg = await prisma.crowdAbeg.findUnique({
//       where: { id: abegID },
//     });
//     return res.status(200).json({
//       message: "abegged",
//       data: beg,
//     });
//   } catch (error) {
//     return res.status(404).json({
//       message: "Error",
//     });
//   }
// };

// export const updateBegInfo = async (req: Request, res: Response) => {
//   try {
//     const { begID } = req.params;
//     const { motivation, detailDescription } = req.body;

//     const beg = await prisma.crowdAbeg.update({
//       where: { id: begID },
//       data: {
//         motivation,
//         detailDescription,
//       },
//     });
//     return res.status(201).json({
//       message: "beg",
//       data: beg,
//     });
//   } catch (error) {
//     return res.status(404).json({
//       message: "Error",
//     });
//   }
// };

// export const daleteBeg = async (req: Request, res: Response) => {
//   try {
//     const { begID } = req.params;

//     await prisma.crowdAbeg.delete({
//       where: { id: begID },
//     });
//     return res.status(201).json({
//       message: "beg deleted",
//     });
//   } catch (error) {
//     return res.status(404).json({
//       message: "Error",
//     });
//   }
// };

// const axios = require('axios');
