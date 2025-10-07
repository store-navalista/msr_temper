import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CertificateResponse } from "./helpers/types";

type NewsItem = {
    id: number;
    title: string;
    content: string;
};

export type AuthData = {
    message: string;
    status: number;
    data?: {
        companyId: string;
        userId: string;
        exp: number;
        iat: number;
    };
};

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api",
        credentials: "include",
    }),
    tagTypes: ["Certificate", "User"],
    endpoints: (builder) => ({
        getNews: builder.query<NewsItem[], void>({
            query: () => "filter-news",
        }),
        getVerifiedCertificate: builder.query<CertificateResponse, string>({
            query: (utn) => `verify/${utn}`,
            providesTags: (result, error, utn) => [{ type: "Certificate", id: utn }],
        }),
        generateSV: builder.query<Blob, string>({
            query: (vesselId) => ({
                url: `user/generate-survey-status/${vesselId}`,
                responseHandler: (response) => response.blob(),
            }),
        }),
        auth: builder.mutation<AuthData, { email: string; password: string }>({
            query: (credentials) => ({
                url: "auth",
                method: "POST",
                body: credentials,
            }),
            invalidatesTags: ["User"],
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: "auth/logout",
                method: "POST",
            }),
            invalidatesTags: ["User"],
        }),
        request: builder.mutation<Record<string, string>, FormData>({
            query: (formData) => ({
                url: "send-request",
                method: "POST",
                body: formData,
            }),
        }),
    }),
});

export const { useGetNewsQuery, useLazyGenerateSVQuery, useRequestMutation, useGetVerifiedCertificateQuery, useAuthMutation, useLogoutMutation, util } = api;
