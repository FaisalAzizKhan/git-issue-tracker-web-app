// src/app/Services/Urls/Urls.ts

export const BackendEndpoints = {
  // Auth
  Auth: {
    Login: "/auth/login",
    Signup: "/auth/sign-up",
    SendOtp: "/auth/send-otp-on-email",
    VerifyOtp: "/auth/verify-otp-on-email",
    // ResetPassword: "/admin/reset-password",
  },
  Plan: {
    Create: "/plan/create-new",
    Get: "/plan/get-all",
  },
  Booking: {
    Create: "/booking/create-with-travelers",
    Get: "/booking/get-all",
    GetSingle: (bookingId: string) => `/booking/get-single?bookin_id=${bookingId}`,
    GetSingleOfHistory: (bookingId: string) => `/booking-history/get-all?booking_id=${bookingId}`,
    GetSingleOfActivity: (bookingId: string) => `/booking-activity/get-all?booking_id=${bookingId}`,
    CreateUpdateTravellers: "/booking/create-with-travelers",
    CreateUpdatePlan:"/booking-plan/create-or-update",
    CreateUpdatePlanDay:"/booking-day/create-or-update",
    GetAllName:"/booking/get-all-only-name",
    CreateUpdateCheckList:"/booking-master-checklist/create-or-update",
    CreateUpdateDocument:"/booking-document/create-or-update"
  },
  User: {
    Create: "/users/create-or-update",
    Get: "/users/get-all",
  },
  Task:{
    Create:"/user-task/create-or-update",
    Get:""
  },
  Report:{
  Booking: (startDate: string, endDate: string) =>
      `/booking-reports/booking?start_date=${startDate}&end_date=${endDate}`
  }

};
