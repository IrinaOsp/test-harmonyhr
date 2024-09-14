import { MY_PROFILE_QUERY } from "@/apollo/myProfile";
import { useAuthStore } from "@/zustand/store";
import { useQuery } from "@apollo/client";

export default function MyInfo() {
  const token = useAuthStore((state) => state.accessToken);

  const data = useQuery(MY_PROFILE_QUERY, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  console.log(data.data);
  return <div>MainPage</div>;
}
