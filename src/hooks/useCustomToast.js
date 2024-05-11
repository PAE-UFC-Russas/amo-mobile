import { useToast } from "native-base";
import { CustomToast } from "../components/Toast";

export function useCustomToast() {
  const toast = useToast();

  return function showToast(title, description, status) {
    toast.show({
      render: () => (
        <CustomToast title={title} description={description} status={status} />
      ),
    });
  };
}
