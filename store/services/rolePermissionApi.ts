import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface RolePermission {
  id: string;
  section: string;
  accessType: string;
  roleId: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  isDefault: boolean;
  accessLevel: string;
  companyId?: string;
  permissions: RolePermission[];
  createdAt: string;
  updatedAt: string;
}

export interface RoleMember {
  id: string;
  name: string;
  email: string;
  role: string;
  roleId?: string | null;
}

export const rolePermissionApi = createApi({
  reducerPath: "rolePermissionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api",
  }),
  tagTypes: ["Role", "RoleMember"],
  endpoints: (builder) => ({
    getRoles: builder.query<{ roles: Role[] }, { companyId?: string } | void>({
      query: (params) => ({
        url: "/roles",
        params: params || undefined,
      }),
      providesTags: ["Role"],
    }),
    createRole: builder.mutation<{ role: Role }, { name: string; description: string; companyId?: string }>({
      query: (body) => ({
        url: "/roles",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Role"],
    }),
    updateRole: builder.mutation<{ role: Role }, { id: string; name?: string; accessLevel?: string; description?: string; permissions?: { section?: string; id?: string; accessType: string }[] }>({
      query: ({ id, ...body }) => ({
        url: `/roles/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Role"],
    }),
    deleteRole: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/roles/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Role"],
    }),
    getRoleMembers: builder.query<{ members: RoleMember[]; eligibleUsers: RoleMember[] }, string>({
      query: (roleId) => `/roles/${roleId}/members`,
      providesTags: ["RoleMember"],
    }),
    assignRoleMember: builder.mutation<{ success: boolean; user: RoleMember }, { roleId: string; userId: string }>({
      query: ({ roleId, userId }) => ({
        url: `/roles/${roleId}/members`,
        method: "POST",
        body: { userId },
      }),
      invalidatesTags: ["RoleMember", "Role"],
    }),
    unassignRoleMember: builder.mutation<{ success: boolean; message: string }, { roleId: string; userId: string }>({
      query: ({ roleId, userId }) => ({
        url: `/roles/${roleId}/members/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["RoleMember", "Role"],
    }),
  }),
});

export const {
  useGetRolesQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
  useGetRoleMembersQuery,
  useAssignRoleMemberMutation,
  useUnassignRoleMemberMutation,
} = rolePermissionApi;
