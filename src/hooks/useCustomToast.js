import { useToast } from "native-base";
import { CustomToast } from "../components/Toast";

export function useCustomToast() {
  const toast = useToast();

  return function showToast(title, description, status) {
    toast.show({
      render: ({ id }) => (
        <CustomToast
          id={id}
          title={title}
          description={description}
          status={status}
          toast={toast}
        />
      ),
    });
  };
}
