import express, { request, response } from "express";
import { Food } from "../models/foodModel.js";

const router = express.Router();

//Send all food items

router.post('/', async (request, response) => {
    try {
        if (
            !request.body.name ||
            !request.body.priceInCents ||
            !request.body.image
        ) {
            return response.status(400).send({
                message: 'Required fields are missing!'
            })
        }

        const newFood = {
            name: request.body.name,
            priceInCents: request.body.priceInCents,
            image: request.body.image,
        };

        const food = await Food.create(newFood);

        return response.status(201).send(food);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//Get all food items
router.get('/', async (request, response) => {
    try {

        const food = await Food.find({});

        return response.status(200).json({
            data: food
        })

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
});

//Delete Particular food item

router.delete('/:id', async (request, response) => {
    try {

        const { id } = request.params;
        const result = await Food.findByIdAndDelete(id);

        if (!result) {
            return response.status(400).json({ message: 'Item not found' })
        }
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
})

//Update Particular food item


router.put('/:id', async (request, response) => {

    try {
        if (
            !request.body.name ||
            !request.body.priceInCents ||
            !request.body.image
        ) {
            return response.status(400).send({
                message: 'Required fields are missing!'
            })
        }

        const { id } = request.params;
        const result = await Food.findByIdAndUpdate(id,request.body,{
            new:true
        });

        if(!result){
            return response.status(400).json({ message: 'Food not found' })

        }

        return response.status(200).send({message:"Food updated"})




    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
});


    export default router;