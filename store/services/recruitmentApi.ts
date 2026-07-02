import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Job {
  id: string;
  title: string;
  department: string;
  office: string;
  candidatesApplied: number;
  avatars: string[];
  status: "ACTIVE" | "CLOSED" | "UNACTIVE";
  employmentType: string;
  quantity: number;
  closingDate: string;
  description: string;
  invitedMembers: Array<{ name: string; email: string; avatar: string }>;
  workflowStages: Array<{ name: string; isLocked: boolean }>;
  createdAt?: string;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  jobId?: string;
  job: string; // Resolves to job title
  cv: string | null;
  createdDate: string;
  stage: "Applied" | "Screening" | "1st Interview" | "2nd Interview" | "Hiring" | "Rejected" | string;
  overallRating?: string;
  evaluationText?: string;
  comments?: Array<{ author: string; time: string; text: string }>;
  activity?: Array<{ author: string; action: string; time: string; details?: string }>;
}

export interface Stage {
  id: string;
  name: string;
  isLocked: boolean;
  position: number;
}

export interface TagItem {
  id: string;
  name: string;
  candidateCount: number;
}

export interface ResourceItem {
  id: string;
  name: string;
  updatedAt: string;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  stage: string;
  lastModified: string;
  isLocked: boolean;
}

export const recruitmentApi = createApi({
  reducerPath: "recruitmentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api",
  }),
  tagTypes: ["Job", "Candidate", "RecruitmentStage", "RecruitmentTag", "RecruitmentResource", "RecruitmentEmailTemplate"],
  endpoints: (builder) => ({
    getJobs: builder.query<{ jobs: Job[] }, { companyId?: string; search?: string } | void>({
      query: (params) => ({
        url: "/recruitment/jobs",
        params: params || {},
      }),
      providesTags: ["Job"],
    }),
    getJobById: builder.query<{ job: Job & { candidates: Candidate[] } }, string>({
      query: (id) => `/recruitment/jobs/${id}`,
      providesTags: ["Job", "Candidate"],
    }),
    createJob: builder.mutation<{ job: Job }, Partial<Job> & { companyId?: string }>({
      query: (body) => ({
        url: "/recruitment/jobs",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Job"],
    }),
    updateJob: builder.mutation<{ job: Job }, Partial<Job> & { id: string }>({
      query: ({ id, ...body }) => ({
        url: `/recruitment/jobs/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Job"],
    }),
    deleteJob: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/recruitment/jobs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Job", "Candidate"],
    }),

    // Candidates
    getCandidates: builder.query<
      { candidates: Candidate[] },
      { companyId?: string; search?: string; status?: string } | void
    >({
      query: (params) => ({
        url: "/recruitment/candidates",
        params: params || {},
      }),
      providesTags: ["Candidate"],
    }),
    createCandidate: builder.mutation<{ candidate: Candidate }, Partial<Candidate> & { companyId?: string }>({
      query: (body) => ({
        url: "/recruitment/candidates",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Candidate", "Job"],
    }),
    updateCandidate: builder.mutation<{ candidate: Candidate }, Partial<Candidate> & { id: string }>({
      query: ({ id, ...body }) => ({
        url: `/recruitment/candidates/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Candidate", "Job"],
    }),
    deleteCandidate: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/recruitment/candidates/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Candidate", "Job"],
    }),

    // Stages Settings
    getStages: builder.query<{ stages: Stage[] }, { companyId?: string } | void>({
      query: (params) => ({
        url: "/recruitment/settings/stages",
        params: params || {},
      }),
      providesTags: ["RecruitmentStage"],
    }),
    createStage: builder.mutation<{ stage: Stage }, { name: string; companyId?: string }>({
      query: (body) => ({
        url: "/recruitment/settings/stages",
        method: "POST",
        body,
      }),
      invalidatesTags: ["RecruitmentStage"],
    }),
    reorderStages: builder.mutation<{ success: boolean }, { stageIds: string[] }>({
      query: (body) => ({
        url: "/recruitment/settings/stages/reorder",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["RecruitmentStage"],
    }),
    updateStage: builder.mutation<{ stage: Stage }, { id: string; name: string }>({
      query: ({ id, ...body }) => ({
        url: `/recruitment/settings/stages/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["RecruitmentStage"],
    }),
    deleteStage: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/recruitment/settings/stages/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["RecruitmentStage"],
    }),

    // Tags Settings
    getTags: builder.query<{ tags: TagItem[] }, { companyId?: string } | void>({
      query: (params) => ({
        url: "/recruitment/settings/tags",
        params: params || {},
      }),
      providesTags: ["RecruitmentTag"],
    }),
    createTag: builder.mutation<{ tag: TagItem }, { name: string; companyId?: string }>({
      query: (body) => ({
        url: "/recruitment/settings/tags",
        method: "POST",
        body,
      }),
      invalidatesTags: ["RecruitmentTag"],
    }),
    updateTag: builder.mutation<{ tag: TagItem }, { id: string; name: string }>({
      query: ({ id, ...body }) => ({
        url: `/recruitment/settings/tags/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["RecruitmentTag"],
    }),
    deleteTag: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/recruitment/settings/tags/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["RecruitmentTag"],
    }),

    // Resources Settings
    getResources: builder.query<{ resources: ResourceItem[] }, { companyId?: string } | void>({
      query: (params) => ({
        url: "/recruitment/settings/resources",
        params: params || {},
      }),
      providesTags: ["RecruitmentResource"],
    }),
    createResource: builder.mutation<{ resource: ResourceItem }, { name: string; companyId?: string }>({
      query: (body) => ({
        url: "/recruitment/settings/resources",
        method: "POST",
        body,
      }),
      invalidatesTags: ["RecruitmentResource"],
    }),
    updateResource: builder.mutation<{ resource: ResourceItem }, { id: string; name: string }>({
      query: ({ id, ...body }) => ({
        url: `/recruitment/settings/resources/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["RecruitmentResource"],
    }),
    deleteResource: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/recruitment/settings/resources/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["RecruitmentResource"],
    }),

    // Email Templates Settings
    getEmailTemplates: builder.query<{ templates: EmailTemplate[] }, { companyId?: string } | void>({
      query: (params) => ({
        url: "/recruitment/settings/templates",
        params: params || {},
      }),
      providesTags: ["RecruitmentEmailTemplate"],
    }),
    createEmailTemplate: builder.mutation<{ template: EmailTemplate }, Partial<EmailTemplate> & { companyId?: string }>({
      query: (body) => ({
        url: "/recruitment/settings/templates",
        method: "POST",
        body,
      }),
      invalidatesTags: ["RecruitmentEmailTemplate"],
    }),
    updateEmailTemplate: builder.mutation<{ template: EmailTemplate }, Partial<EmailTemplate> & { id: string }>({
      query: ({ id, ...body }) => ({
        url: `/recruitment/settings/templates/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["RecruitmentEmailTemplate"],
    }),
    deleteEmailTemplate: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/recruitment/settings/templates/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["RecruitmentEmailTemplate"],
    }),
  }),
});

export const {
  useGetJobsQuery,
  useGetJobByIdQuery,
  useCreateJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
  useGetCandidatesQuery,
  useCreateCandidateMutation,
  useUpdateCandidateMutation,
  useDeleteCandidateMutation,
  useGetStagesQuery,
  useCreateStageMutation,
  useReorderStagesMutation,
  useUpdateStageMutation,
  useDeleteStageMutation,
  useGetTagsQuery,
  useCreateTagMutation,
  useUpdateTagMutation,
  useDeleteTagMutation,
  useGetResourcesQuery,
  useCreateResourceMutation,
  useUpdateResourceMutation,
  useDeleteResourceMutation,
  useGetEmailTemplatesQuery,
  useCreateEmailTemplateMutation,
  useUpdateEmailTemplateMutation,
  useDeleteEmailTemplateMutation,
} = recruitmentApi;
