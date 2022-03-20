export function statusClass(requestStatus) {
  if (requestStatus === "In Review") {
    return "inReview";
  }
  if (requestStatus === "Approved") {
    return "approved";
  } else {
    return "declined";
  }
}
