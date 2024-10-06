import { useMutation } from "@tanstack/react-query";
import { addAd as addAdApi } from "../../services/apiAddAd";

function useAddAd() {
  const { mutate: addAd, isLoading } = useMutation({
    mutationFn: (requestBody) => addAdApi(requestBody),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,

    onSuccess: () => {},
  });
  return { addAd, isLoading };
}

export default useAddAd;
