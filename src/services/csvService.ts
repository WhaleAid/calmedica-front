import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setAuthCookies, clearAuthCookies, getAuthCookies } from '../utils/cookies';
import api from './api';

export const Csv = api.injectEndpoints({
    endpoints: (builder) => ({
        sendCsv: builder.mutation({
            query: (data) => ({
                url: 'csv/upload',
                method: 'POST',
                body: data,
            }),
        }),
        getJsonData: builder.query<any, void>({
            query: () => ({
                url: 'csv/get-data',
                method: 'GET',
            }),
        }),
    }),
    overrideExisting: true,
});

export const {
    useSendCsvMutation,
    useGetJsonDataQuery,
} = Csv;