
"use server";

import { generateResume } from "@/ai/flows/generate-resume";
import { generatePortfolio } from "@/ai/flows/generate-portfolio";

export async function generateResumeAction(
    { profileData }: { profileData: string }
) {
    try {
        const response = await generateResume({ profileData });
        return {
            resume: response.resume,
            error: null,
        }
    } catch (error) {
        console.error(error);
        return {
            resume: null,
            error: "Failed to generate resume. Please try again later."
        }
    }
}

export async function generatePortfolioAction(
    { profileData }: { profileData: string }
) {
    try {
        const response = await generatePortfolio({ profileData });
        return {
            portfolio: response.portfolio,
            error: null,
        }
    } catch (error) {
        console.error(error);
        return {
            portfolio: null,
            error: "Failed to generate portfolio. Please try again later."
        }
    }
}
