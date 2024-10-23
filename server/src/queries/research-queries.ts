const createResearchQuery = `INSERT INTO public.research
(title, abstract, "content", results, sources, user_id, created_at, updated_at)
VALUES($1, $2, $3, $4, $5, $6, now(), now()) RETURNING id;`;

const getResearchByIdQuery = `
SELECT 
 r.id, 
    r.title, 
    r.content, 
    r.abstract,
    r.results,
    r.sources,
    r.created_at,
    json_build_object('username', u.username, 'email', u.email) AS user
FROM 
    public.research r
JOIN 
    public.users u ON r.user_id = u.id
WHERE 
    r.id = $1;
`;
const getAllResearchQuery = `SELECT * FROM public.research WHERE user_id = $1;`;
const getAllResearch = `
SELECT 
    r.id, 
    r.title, 
    r.content, 
    r.abstract,
    r.results,
    r.sources,
    r.created_at,
    json_build_object('username', u.username, 'email', u.email) AS user 
FROM 
    public.research r
JOIN 
    public.users u ON r.user_id = u.id;


`;


const deleteResearchQuery = `DELETE FROM public.research WHERE id = $1;`;
const updateResearchQuery = `UPDATE public.research SET
title = $1, abstract = $2, "content" = $3, results = $4, sources = $5, updated_at = now()
WHERE id = $6;`;

export {
    createResearchQuery,
    getResearchByIdQuery,
    getAllResearchQuery,
    deleteResearchQuery,
    updateResearchQuery,
    getAllResearch
}