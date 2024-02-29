import { PrismaClient } from "@prisma/client";
import { Request, Response, response } from "express";

const prisma: PrismaClient = new PrismaClient()

const readRent = async (request: Request, response: Response) => {
    try {
        const datacar = await prisma.car.findMany();

        return response.status(200).json({
            status: true,
            message: `admin has been loaded`,
            datacar
        })
    } catch (error) {
        return response.status(500)
            .json({
                status: false,
                message: error
            })
    }
}

const addRent = async (request: Request, Response: Response) => {
    try {

        const carID: number = (request.body.carID);
        const nama_penyewa: string = (request.body.nama_penyewa);
        const tanggal: number = (request.body.tanggal);
        const lama_sewa: number  = (request.body.lama_sewa)

        const car = await prisma.car.findFirst({ where: {carID: carID}})
        //memanggil data dari database car
            if (!car){
                //(!)not car artinya bila tidak ada data tersebut akan memunculkan data dibawah
                return response.status(400).json({
                    status: false,
                    message: "data car not found"
                })
            }
            const total_bayar = car.harga_perhari*lama_sewa

        const admin = await prisma.rent.create({
            data: {
                carID,
                nama_penyewa,
                tanggal,
                lama_sewa,
                total_bayar
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

const updateRent = async (request: Request, response: Response) =>{
    try {
        const id = Number(request.params.id)
        const carID: number= (request.body.carID);
        const nama_penyewa: string = (request.body.nama_penyewa);
        const tanggal: number = (request.body.harga_tanggal);
        const lama_sewa: number =(request.body.lama_sewa)

        const car = await prisma.car.findFirst({ where: {carID: carID}})
        //memanggil data dari database car
            if (!car){
                //(!)not car artinya bila tidak ada data tersebut akan memunculkan data dibawah
                return response.status(400).json({
                    status: false,
                    message: "data car not found"
                })
            }
            const total_bayar = car.harga_perhari*lama_sewa


        const findcar_rent = await prisma.rent.findFirst({ where: { rentID: id } })
        if (!findcar_rent) return response.status(200).json({
            status: false,
            message: "car tidak ditemukan",
        })

        const updateRent = await prisma.rent.update({
            data: {
                carID, nama_penyewa, tanggal, lama_sewa, total_bayar
            },
            where: { rentID: id }
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

const deleteRent = async (request: Request, response: Response)=>{
    try {
        const id = Number(request.params.id)
        const findcar_rent = await prisma.rent.findFirst({ where: { rentID: id } })
        if (!findcar_rent) return response.status(200).json({
            status: false,
            message: "rent tidak ditemukan",
        })
        const deletecar = await prisma.rent.delete({
            where: { rentID: id }
        })
        return response.status(200).json({
            status: true,
            message: "rent is deleted",
        })

    } catch (error) {
        return response.status(500).json({
            status: false, message: error
        })
    }
}

export {deleteRent, updateRent, readRent, addRent}