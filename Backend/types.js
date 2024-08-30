const zod=require('zod');

const createProd=zod.object(
    {
        productid: zod.number(),
        productname: zod.string().max(10),
        productcode: zod.string(),
        releasedate: zod.date(),
        price: zod.number(), 
        rating: zod.number().min(1).max(5),
        imageurl: zod.string().url()
    }
);

const fetchProd=zod.object(
    {
     id:zod.number()
    }
);

module.exports={
    createProd,
    fetchProd
}