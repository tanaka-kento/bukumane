import React from "react";
import { useCallback, useState } from "react";
import apiClient from "../utils/apiClient";

export const useFetchRentalBookData = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | undefined>();

    const fetchRentalBookData = useCallback(
        async (bookId: string | number): Promise<void> => {
            setLoading(true);
            apiClient
                .post("/api/fetchRentalBookData", {
                    bookId
                })
                .then(res => {
                    console.log(res);
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err.response);
                    setLoading(false);
                    setError(
                        new Error(
                            err.response.data?.message ??
                                "原因不明のエラーが発生しました"
                        )
                    );
                });
        },
        []
    );

    return { fetchRentalBookData, loading, error };
};
