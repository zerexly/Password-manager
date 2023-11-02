import { PrismaClient } from "@prisma/client";

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const data = req.body;
    const { accessid } :string|any= req.query;
    const prisma = new PrismaClient();
    console.log({data:data,accessid:accessid});
    // const modifyData = {
    //     ...data,
    //     data: JSON.parse(data.data)
    // }

    if (req.method === 'POST') {
        try {
            const d = prisma.user;
            const U = await d.findUnique(
                { where: { specialid: data.specialid } }
            );
            if (U) {
                //U.data.push({ website: data.website, password: data.password });
                const newData:any = [...U.data, { website: data.website, password: data.password }]
                await prisma.user.update({
                    where: { specialid: data.specialid },
                    data:{data:newData}
                })
                return res.status(200).json({message:"Data Updated"})
                
            } else {
                await prisma.user.create({
                    data: {
                        username: data.username,
                        specialid: data.specialid,
                        data: [{ website: data.website, password: data.password }]
                    }
                }).then(()=>{
                    return res.status(200).json({message:"Data Created"})
                })
            }
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Something went wrong' });
        } finally {
            await prisma.$disconnect();
        }
    } else if (req.method === "GET") {
        try {
            const d = prisma.user;
            const U = await d.findUnique(
                { where: { specialid: accessid } }
            );
            if (U) {
                res.status(200).json(U);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Something went wrong' });
        } finally {
            await prisma.$disconnect();
        }
    }
}