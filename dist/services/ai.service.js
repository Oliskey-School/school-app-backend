"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIService = void 0;
const generative_ai_1 = require("@google/generative-ai");
const GEMINI_MODEL_NAME = "gemini-2.5-flash"; // Or compatible
class AIService {
    constructor(apiKey) {
        if (!apiKey) {
            throw new Error("AI Service requires an API Key");
        }
        this.genAI = new generative_ai_1.GoogleGenerativeAI(apiKey);
        this.model = this.genAI.getGenerativeModel({ model: GEMINI_MODEL_NAME });
    }
    generateContent(prompt, systemInstruction) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const generationConfig = {
                    temperature: 0.2,
                    maxOutputTokens: 1000,
                    responseMimeType: "application/json"
                };
                // Note: systemInstruction is supported in newer SDK versions. 
                // If strictly needed as a separate param, we use model.startChat or specific headers.
                // But getGenerativeModel config supports it.
                const model = this.genAI.getGenerativeModel({
                    model: GEMINI_MODEL_NAME,
                    systemInstruction: systemInstruction
                });
                const result = yield model.generateContent({
                    contents: [{ role: 'user', parts: [{ text: prompt }] }],
                    generationConfig
                });
                const response = yield result.response;
                return response.text();
            }
            catch (error) {
                console.error("AI Service Generation Error:", error);
                throw new Error(`AI Generation Failed: ${error.message}`);
            }
        });
    }
}
exports.AIService = AIService;
