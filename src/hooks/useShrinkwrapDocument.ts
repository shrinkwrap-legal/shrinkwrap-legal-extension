import {useQuery} from "react-query";
import {api} from "../api";
import {Message} from "../types/sidepanel.types";


export function useShrinkwrapDocument(message: Message | undefined) {
    return useQuery({
        queryKey: ['useShrinkwrapDocument'],
        queryFn: async () => {
            if(message) {
                const response =
                    await api.getShrinkwrapDocument({
                        docNumber: message.docNumber,
                        court: message.court,
                        ecli: message.ecli
                    });
                if (response.ok) {
                    return response.data;
                }
                throw response.error;
            }
        }
    }, );
}