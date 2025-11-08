import { useQuery } from "@tanstack/react-query";
import { getSoldsById } from "../../../services/pay";

export function useHistory(userId: string) {
    const historyQuery= useQuery({
        queryKey: ["histories", userId],
        queryFn: () => getSoldsById({userId}),
        enabled: !!userId
    });
    return {
        history: historyQuery.data,
        isLoading: historyQuery.isLoading
    }
}