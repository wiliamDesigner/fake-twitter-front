export const getUser = () => {
  if (typeof window === "undefined") return null;

  const data = localStorage.getItem("user_data");

  if (!data) return null;

  return JSON.parse(data);
};