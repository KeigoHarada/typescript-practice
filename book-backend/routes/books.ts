import { PrismaClient } from "@prisma/client";
import express from "express";
const router = express.Router();

router.get("/books", async (req, res, next) => {
    const prisma = new PrismaClient();
    const allBooks = await prisma.book.findMany();
    res.json(allBooks);
});

router.post("/books", async (req, res, next) => {
    const prisma = new PrismaClient();
    const data = { data: req.body };
    console.log(data);
    const newBook = await prisma.book.create(
        data
    );
    res.json(newBook);
});

router.put("/books", async (req, res, next) => {
    const prisma = new PrismaClient();
    const data = { where: { id: req.body.id }, data: req.body };
    const updatedBook = await prisma.book.update(
        data
    );
    res.json(updatedBook);
});

router.delete("/books", async (req, res, next) => {
    const prisma = new PrismaClient();
    const deletedBook = await prisma.book.delete({
        where: {
            id: req.body.id,
        },
    });
    res.json(deletedBook);
});

export default router;