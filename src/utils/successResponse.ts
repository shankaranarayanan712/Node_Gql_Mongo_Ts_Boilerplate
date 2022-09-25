const messageResponse: { [key: string]: string } = {
  created: 'Record Created',
  updated: 'Record Updated',
  deleted: 'Record Deleted',
  fetch: 'Records fetch',
  notUpdated: 'Records not updated',
};
export function successResponse(response: any, recordStatus: string) {
  return {
    status: {
      code: 200,
      header: 'SUCCESS',
      description: messageResponse[recordStatus],
    },
    data: response,
  };
}
