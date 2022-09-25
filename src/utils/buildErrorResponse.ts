export function buildErrorResponse(error: any) {
  return {
    status: {
      code: error.code || 500,
      header: 'Error',
      description: error?.message,
    },
  };
}
