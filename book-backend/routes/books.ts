import { PrismaClient } from "@prisma/client";
import express from "express";
const router = express.Router();

router.get("/", async (req, res, next) => {
    const prisma = new PrismaClient();
    const allBooks = await prisma.book.findMany();
    res.json(allBooks);
});

router.post("/", async (req, res, next) => {
    const prisma = new PrismaClient();
    const data = { data: req.body };
    const newBook = await prisma.book.create(data);
    res.json(newBook);
});

export default router;