"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProductSchema = void 0;
const zod_1 = require("zod");
exports.createProductSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z
            .string({
            required_error: "Title is required"
        })
            .min(3)
            .max(30),
        description: zod_1.z
            .string({
            required_error: "Description is required"
        })
            .min(3)
            .max(30)
    })
});
