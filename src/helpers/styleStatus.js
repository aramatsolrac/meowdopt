export function styleStatus(requestStatus) {
  if (requestStatus === "Received") {
    return "received";
  }
  if (requestStatus === "In Review") {
    return "inReview";
  }
  if (requestStatus === "Approved") {
    return "approved";
  } else {
    return "declined";
  }
}
