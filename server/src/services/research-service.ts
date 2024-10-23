import client from "../database";
import { Exception } from "../exceptions/exception";
import { InternalServerError } from "../exceptions/internal-server-exception";
import { createResearchQuery, deleteResearchQuery, getAllResearch, getAllResearchQuery, getResearchByIdQuery, updateResearchQuery } from "../queries/research-queries";

type Research = {
    title: string,
    abstract: string,
    content: string,
    results: string,
    sources: string,
    created_at: Date,
    updated_at: Date
}

export class ResearchService {

    public async create(research: Research, user_id: number, categories: number[], tags: number[]) {
        try {
            await client.query("BEGIN");

            // Araştırma ekleme
            const newResearch = await client.query(createResearchQuery, [research.title, research.abstract, research.content, research.results, research.sources, user_id]);
            const researchId = newResearch.rows[0].id;

            // Kategori ekleme
            if (categories.length > 0) {
                const categoryInsertQuery = `
                    INSERT INTO research_categories (research_id, category_id)
                    VALUES ${categories.map((_, i) => `($1, $${i + 2})`).join(", ")};
                `;
                await client.query(categoryInsertQuery, [researchId, ...categories]);
            }

            // Etiket ekleme
            if (tags.length > 0) {
                const tagInsertQuery = `
                    INSERT INTO research_tags (research_id, tag_id)
                    VALUES ${tags.map((_, i) => `($1, $${i + 2})`).join(", ")};
                `;
                await client.query(tagInsertQuery, [researchId, ...tags]);
            }

            await client.query("COMMIT");
            return newResearch.rows[0];
        } catch (error) {
            console.log(error);

            await client.query("ROLLBACK");
            if (error instanceof Exception) {
                throw error;
            } else {
                throw new InternalServerError("Something went wrong!");
            }
        }
    }

    public async list(user_id: number) {
        try {
            const result = await client.query(getAllResearchQuery, [user_id]);
            return result.rows;
        } catch (error) {
            if (error instanceof Exception) {
                throw error;
            } else {
                throw new InternalServerError("Something went wrong!");
            }
        }
    }

    public async listAll() {
        try {
            const result = await client.query(getAllResearch);
            return result.rows;
        } catch (error) {
            console.log(error);
            
            if (error instanceof Exception) {
                throw error;
            } else {
                throw new InternalServerError("Something went wrong!");
            }
        }
    }

    public async show(id: number) {
        try {
            const result = await client.query(getResearchByIdQuery, [id]);
            return result.rows[0];
        } catch (error) {
            if (error instanceof Exception) {
                throw error;
            } else {
                throw new InternalServerError("Something went wrong!");
            }
        }
    }

    public async delete(id: number) {
        try {
            await client.query("BEGIN");
            await client.query(deleteResearchQuery, [id]);
            await client.query("COMMIT");
        } catch (error) {
            await client.query("ROLLBACK");
            if (error instanceof Exception) {
                throw error;
            } else {
                throw new InternalServerError("Something went wrong!");
            }
        }
    }

    public async update(id: number, research: Research) {
        try {
            await client.query("BEGIN");

            // Daha güvenli güncelleme işlemi
            const fields = Object.entries(research).map(([key, value], index) => `${key} = $${index + 1}`);
            const values = Object.values(research);
            const updateQuery = `
                UPDATE research
                SET ${fields.join(", ")}
                WHERE id = $${fields.length + 1}
                RETURNING *;
            `;
            const updatedResearch = await client.query(updateQuery, [...values, id]);

            await client.query("COMMIT");
            return updatedResearch.rows[0];

        } catch (error) {
            await client.query("ROLLBACK");
            if (error instanceof Exception) {
                throw error;
            } else {
                throw new InternalServerError("Something went wrong!");
            }
        }
    }
}
