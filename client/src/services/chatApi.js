import { apiRequest } from "./api";

export async function generateQuery(
  message,
  conversationId
) {
  return apiRequest("/chat", {
    method: "POST",

    body: JSON.stringify({
      message,
      conversation_id: conversationId,
    }),
  });
}

export async function executeQuery(queryId) {
  return apiRequest(
    `/queries/${queryId}/execute`,
    {
      method: "POST",
    }
  );
}