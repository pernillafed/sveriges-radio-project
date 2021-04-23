const fetch = require('node-fetch');
const json = 'format=json';
const showAll = 'pagination=false';

const getAllCategories = async (req, res) => {
    let categories = await fetch(`http://api.sr.se/api/v2/programcategories?${json}&${showAll}`);
    categories = await categories.json();
    res.json(categories.programcategories);
};

const getCategoryById = async (req, res) => {
    let category = await fetch(`http://api.sr.se/api/v2/programcategories/${req.params.categoryId}?${json}`);
    category = await category.json();
    res.json(category);
};

const getProgramsByCategory = async (req, res) => {
    let programsInCategory = await fetch(`http://api.sr.se/api/v2/programs/index?programcategoryid=${req.params.categoryId}&${json}&${showAll}`);
    programsInCategory = await programsInCategory.json();
    res.json(programsInCategory);
};

module.exports = {
    getAllCategories,
    getCategoryById,
    getProgramsByCategory
};