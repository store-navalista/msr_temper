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
    tagTypes: ["Certificate"],
    endpoints: (builder) => ({
        getNews: builder.query<NewsItem[], void>({
            query: () => "filter-news",
        }),
        getVerifiedCertificate: builder.query<CertificateResponse, string>({
            query: (utn) => `verify/${utn}`,
            providesTags: (result, error, utn) => [{ type: "Certificate", id: utn }],
        }),
    }),
});

export const { useGetNewsQuery, useGetVerifiedCertificateQuery, util } = api;
