export abstract class Config {
  public static mongoUrl = `mongodb://${process.env.mongo_host_name}/${process.env.mongo_db_name}?retryWrites=true&w=majority`;
  // This below can be used to set up a separate db for Testing, having it here for a cleaner data
  public static testMongoURL = `mongodb://${process.env.mongo_host_name}/${process.env.test_mongo_db_name}?retryWrites=true&w=majority`;
}
