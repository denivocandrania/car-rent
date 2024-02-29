import { PrismaClient } from "@prisma/client";
import { Request, Response, response } from "express";

const prisma: PrismaClient = new PrismaClient()

const addCar  = async (request: Request, Response: Response) =>{
    try {

        const nopol: string = (request.body.nopol);
        const merkMobil: string = (request.body.merkMobil);
        const harga_perhari: number = (request.body.harga_perhari)
        
        const car = await prisma.car.create({
            data: {
                nopol,
                merkMobil,
                harga_perhari
            }
        });
        
        return response.status(200)
        .json({
            status: true,
            message: "data berhasil disimpan",
            car
        });
    } catch (error) {
        return response.status(500)
        .json({
            status: false,
            message: error
        });
    }
}

const readCar = async (request: Request, response: Response) => {
    try {
        const dataCar = await prisma.car.findMany();

        return response.status(200).json({
            status: true,
            message: `admin has been loaded`,
            dataCar
        })
    } catch (error) {
        return response.status(500)
            .json({
                status: false,
                message: error
            })
    }
}

const updateCar = async (request: Request, response: Response) =>{
    try {
        const id = Number(request.params.id)
        const nopol: string = (request.body.nopol);
        const merkMobil: string = (request.body.merkMobil);
        const harga_perhari: number = (request.body.harga_perhari);

        const findcar_rent = await prisma.car.findFirst({ where: { carID: id } })
        if (!findcar_rent) return response.status(200).json({
            status: false,
            message: "car tidak ditemukan",
        })

        const updateCar = await prisma.car.update({
            data: {
                nopol, merkMobil, harga_perhari
            },
            where: { carID: id }
        })

        return response.status(200).json({
            status: true,
            message: "car is updated",
        })

    }
    catch (error) {
        return response.status(500).json({
            status: false, message: error
        })
    }

}

const deleteCar = async (request: Request, response: Response)=>{
    try {
        const id = Number(request.params.id)
        const findcar_rent = await prisma.car.findFirst({ where: { carID: id } })
        if (!findcar_rent) return response.status(200).json({
            status: false,
            message: "car tidak ditemukan",
        })
        const deletecar = await prisma.car.delete({
            where: { carID: id }
        })
        return response.status(200).json({
            status: true,
            message: "car is deleted",
        })

    } catch (error) {
        return response.status(500).json({
            status: false, message: error
        })
    }
}

export {readCar, addCar, updateCar, deleteCar}
