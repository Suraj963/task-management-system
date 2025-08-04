export const getHeaders = async () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `${token}`,
  };
};
