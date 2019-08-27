exports.processEvents = async (event) => {
  let eventBody = event.payload.body;
  let eventHeaders = event.payload.headers;
  let queryParameters = event.payload.queryParameters;

  if (eventBody.type === "unsubscribe") {

    // Return an object with any combination of the following keys
    let returnValue = {
      events: [
      {
          type: 'track',
          event: "Unsubscribed",
          email_id: eventBody.data.id,
          list_id: eventBody.data.list_id,
          campaign_id: eventBody.data.campaign_id,
          context: {
            ip: eventBody.data.ip_opt,
            traits : {
              email: eventBody.data.email
            }
          }
      }],
      objects: [{
        collection: 'Unsubscribes',
        id: eventBody.data.id,
        properties: {
        }
      }]
    }

    // Return the Javascript object with a key of events, objects or both
    return returnValue;

  } else {
    return null;
  }
}
