import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Obj {
	id: number;
	status: string;
	error: null;
	value: number;
}
type PostsResponse = Obj[];

export const countApi = createApi({
	reducerPath: "countApi",
	tagTypes: ["Objects"],
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:3001/",
	}),
	endpoints: build => ({
		getCount: build.query<PostsResponse, string>({
			query: (limit: string = "") => ({
				url: `obj?${limit && `_limit=${limit}`}`,
			}),
			providesTags: result =>
				result
					? [
							...result.map(({ id }) => ({ type: "Objects" as const, id })),
							{ type: "Objects", id: "LIST" },
					  ]
					: [{ type: "Objects", id: "LIST" }],
		}),
		addCountObj: build.mutation({
			query: body => ({
				url: "obj",
				method: "POST",
				body,
			}),
			invalidatesTags: [{ type: "Objects", id: "LIST" }],
		}),
		deleteCountObj: build.mutation({
			query: id => ({ 
        url: `obj/${id}`, 
        method: "DELETE" 
      }),
      invalidatesTags: [{ type: "Objects", id: "LIST" }],
		}),
	}),
});

export const { useGetCountQuery, useAddCountObjMutation, useDeleteCountObjMutation } = countApi;

//
