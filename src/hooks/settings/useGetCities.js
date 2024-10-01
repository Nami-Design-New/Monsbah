import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./../../utils/axiosInstance";

function useGetCities(countryId, enabled) {
  const lang = useSelector((state) => state.language.lang);

  const { isLoading, data, error } = useQuery({
    queryKey: ["cities", countryId, lang],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get(
          `/client/cities?country_id=${countryId}`
        );
        if (res.status === 200) {
          return res.data?.data;
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    retry: false,
    enabled: enabled,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false
  });

  return { isLoading, data, error };
}

export default useGetCities;
