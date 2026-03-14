// src/app/Services/Urls/Urls.ts

export const BackendEndpoints = {
  Auth: {
    Login: "/auth/login",
    Signup: "/auth/sign-up",
  },
  Issue: {
    GetAll: "/issue/get-all",
    CreateNewIssue: "/issue/create",
    CreateNewComment: "/issue-comment/create-new-comment",
    GetAllComments: "/issue-comment/get-all-by-issue-id",
  },
  Users: {
    GetAll: "/issue/get-all-users",
    GetUserInformation: "/users-info/get-users-details",
  },
};
