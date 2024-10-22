import Joi from "joi";

const createResearchSchema = Joi.object({
    title: Joi.string().required(),
    abstract: Joi.string().required(),
    content: Joi.string().required(),
    results: Joi.string().required(),
    sources: Joi.string().required()
});

const updateResearchSchema = Joi.object({
    title: Joi.string(),
    abstract: Joi.string(),
    content: Joi.string(),
    results: Joi.string(),
    sources: Joi.string()
});

export {
    createResearchSchema,
    updateResearchSchema
}