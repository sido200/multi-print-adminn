import { BASE_API_URL } from "../config/api"

export const fixLink = (link) => {
  if(link.startsWith("blob")) return link
  return BASE_API_URL.replace("/api/v1", "/images/") + link.split("/")[link.split("/").length - 1]

}