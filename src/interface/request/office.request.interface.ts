export interface BookOfficeRequest {
    userId: string;
    officeId: string;
    paymentTransactionId: string;
    startDate: string;
    endDate: string;
    status: string;
}

export interface FilterOfficerBookingRequest {
    userId?: string;
    officeId?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
}

export interface GetBookingsOfUser {
    userId: string;
}