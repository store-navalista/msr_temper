import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CertificateResponse } from "./helpers/types";

type NewsItem = {
    id: number;
    title: string;
    content: string;
};

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
    tagTypes: ["Certificate", "User"],
    endpoints: (builder) => ({
        getNews: builder.query<NewsItem[], void>({
            query: () => "filter-news",
        }),
        getVerifiedCertificate: builder.query<CertificateResponse, string>({
            query: (utn) => `verify/${utn}`,
            providesTags: (result, error, utn) => [{ type: "Certificate", id: utn }],
        }),
        auth: builder.mutation<{ token: string }, { username: string; password: string }>({
            query: (credentials) => ({
                url: "auth",
                method: "POST",
                body: credentials,
            }),
        }),
    }),
});

export const { useGetNewsQuery, useGetVerifiedCertificateQuery, useAuthMutation, util } = api;
