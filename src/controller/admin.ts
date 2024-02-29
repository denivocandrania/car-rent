import { PrismaClient } from "@prisma/client";
import { Request, Response, response } from "express";
import md5 from "md5";
import { sign } from "jsonwebtoken";

const prisma: PrismaClient = new PrismaClient()

const addAdmin = async (request: Request, Response: Response) => {
    try {

        const firstName: string = (request.body.firstName);
        const email: string = (request.body.email);
        const password: string = (request.body.password);

        const admin = await prisma.admin.create({
            data: {
                firstName,
                email,
                password
            }
        });
       
        return response.status(200)
        .json({
            status: true,
            message: "data berhasil disimpan",
            admin
        });
        
    } catch (error) {
        return response.status(500)
        .json({
            status: false,
            message: error
        });
    }
}

const readAdmin = async (request: Request, response: Response) => {
    try {
        const dataAdmin = await prisma.admin.findMany();

        return response.status(200).json({
            status: true,
            message: `admin has been loaded`,
            dataAdmin
        })
    } catch (error) {
        return response.status(500)
            .json({
                status: false,
                message: error
            })
    }
}

const updateAdmin = async (request: Request, response: Response) => {
    try {
        const id = Number(request.params.id)
        const firstName: string = (request.body.firstName);
        const email: string = (request.body.email);
        const password: string = md5(request.body.password);

        const findcar_rent = await prisma.admin.findFirst({ where: { adminID: id } })
        if (!findcar_rent) return response.status(200).json({
            status: false,
            message: "admin tidak ditemukan",
        })

        const updateAdmin = await prisma.admin.update({
            data: {
                firstName, email, password
            },
            where: { adminID: id }
        })

        return response.status(200).json({
            status: true,
            message: "admin is updated",
        })

    }
    catch (error) {
        return response.status(500).json({
            status: false, message: error
        })
    }

}

const deleteAdmin = async (request: Request, response: Response) => {
    try {
        const id = Number(request.params.id)
        const findcar_rent = await prisma.admin.findFirst({ where: { adminID: id } })
        if (!findcar_rent) return response.status(200).json({
            status: false,
            message: "admin tidak ditemukan",
        })
        const deleteAdmin = await prisma.admin.delete({
            where: { adminID: id }
        })
        return response.status(200).json({
            status: true,
            message: "admin is deleted",
        })

    } catch (error) {
        return response.status(500).json({
            status: false, message: error
        })
    }
}

const login = async (request: Request, response: Response) => {
    try {
        const email = request.body.email
        const password = md5(request.body.password)
        const admin = await prisma.admin.findFirst(
            {
                where:{email: email, password: password}
            }

        )
        if (admin) {
            const payload = admin
            const secretkey = 'manasikhaji'
            const token = sign(payload,secretkey)
            return response.status(200).json({
                status: true, 
                message: "login mashokk",
                token: token
            })
        }

        else {
            return response.status(200).json({
                status: false,
                message: "gagal mashok"
            })
        }
        
    } catch (error) {
        return response.status(500).json({
            status: false, message: error
        })
    }
}

export {addAdmin, readAdmin, updateAdmin, deleteAdmin, login}


