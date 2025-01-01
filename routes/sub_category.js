const express = require('express');
const SubCategory = require('../models/sub_category');

const subCategoryRouter = express.Router();

subCategoryRouter.post('/api/subcategory', async (req, res) => {
    try {
        const {categoryId, categoryName, image, subCategoryName } = req.body;
        const subCategory = new SubCategory({categoryId, categoryName, image, subCategoryName});
        await subCategory.save();
        res.json(subCategory);
        return res.status(201).send(subCategory);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});