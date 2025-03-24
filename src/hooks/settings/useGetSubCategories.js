import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axiosInstance";

function useGetSubCategories(category, enabled, page) {
  const lang = useSelector((state) => state.language.lang);

  const { isLoading, data, error } = useQuery({
    queryKey: ["sub-categories", category, lang],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get(
          `${
            page === "companies" ? "company" : localStorage.getItem("userType")
          }/sub-categories${category ? `?category_id=${category}` : ""}`
        );
        if (res.status === 200) {
          return res.data?.data?.data;
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    enabled: enabled,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return { isLoading, data, error };
}

export default useGetSubCategories;
