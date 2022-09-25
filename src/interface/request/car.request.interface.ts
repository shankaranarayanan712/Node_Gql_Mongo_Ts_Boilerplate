export interface BookCarRequest {
    userId: string;
    carId: string;
    paymentTransactionId: string;
    startDate: string;
    endDate: string;
    status: string;
}

export interface FilterCarBookingRequest {
    userId?: string;
    carId?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
}
