/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import mongoose from "mongoose";
export declare const User: mongoose.Model<{
    courses: mongoose.Types.ObjectId[];
    firstName?: string | null | undefined;
    lastName?: string | null | undefined;
    email?: string | null | undefined;
    password?: string | null | undefined;
    SocialHandle?: string | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    courses: mongoose.Types.ObjectId[];
    firstName?: string | null | undefined;
    lastName?: string | null | undefined;
    email?: string | null | undefined;
    password?: string | null | undefined;
    SocialHandle?: string | null | undefined;
}> & {
    courses: mongoose.Types.ObjectId[];
    firstName?: string | null | undefined;
    lastName?: string | null | undefined;
    email?: string | null | undefined;
    password?: string | null | undefined;
    SocialHandle?: string | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    courses: mongoose.Types.ObjectId[];
    firstName?: string | null | undefined;
    lastName?: string | null | undefined;
    email?: string | null | undefined;
    password?: string | null | undefined;
    SocialHandle?: string | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    courses: mongoose.Types.ObjectId[];
    firstName?: string | null | undefined;
    lastName?: string | null | undefined;
    email?: string | null | undefined;
    password?: string | null | undefined;
    SocialHandle?: string | null | undefined;
}>> & mongoose.FlatRecord<{
    courses: mongoose.Types.ObjectId[];
    firstName?: string | null | undefined;
    lastName?: string | null | undefined;
    email?: string | null | undefined;
    password?: string | null | undefined;
    SocialHandle?: string | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
}>>;
export declare const Course: mongoose.Model<{
    courseName?: string | null | undefined;
    courseNum?: number | null | undefined;
    courseCrn?: number | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    courseName?: string | null | undefined;
    courseNum?: number | null | undefined;
    courseCrn?: number | null | undefined;
}> & {
    courseName?: string | null | undefined;
    courseNum?: number | null | undefined;
    courseCrn?: number | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    courseName?: string | null | undefined;
    courseNum?: number | null | undefined;
    courseCrn?: number | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    courseName?: string | null | undefined;
    courseNum?: number | null | undefined;
    courseCrn?: number | null | undefined;
}>> & mongoose.FlatRecord<{
    courseName?: string | null | undefined;
    courseNum?: number | null | undefined;
    courseCrn?: number | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
}>>;
