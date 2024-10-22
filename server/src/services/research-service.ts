import client from "../database";
import { Exception } from "../exceptions/exception";
import { InternalServerError } from "../exceptions/internal-server-exception";
import { createResearchQuery, deleteResearchQuery, getAllResearchQuery, getResearchByIdQuery, updateResearchQuery } from "../queries/research-queries";


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

    public async create(research: Research, user_id: number) {
        try {
            await client.query("BEGIN");
            const newResearch = await client.query(createResearchQuery, [research.title, research.abstract, research.content, research.results, research.sources, user_id]);
            await client.query("COMMIT");
            return newResearch.rows[0];
        } catch (error) {
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
            const fields = Object.entries(research).map(([key, value]) => `${key} = '${value}'`);
            const updatedResearch = await client.query(updateResearchQuery, [...fields, id]);
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