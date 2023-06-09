import * as yup from "yup";

export const schemaLogin = yup.object().shape({
    email: yup.string().email().required(),
    password : yup.string().required().min(3).max(8)
});

export const schemaCreateChannel = yup.object({
    channelName: yup.string().max(15).required(),
    type: yup.string().oneOf(["private","public"]).required(),
    members: yup
    .string()
    .matches(/^[\d,]*$/, "Must contain the member ids separated by a comma"),
})