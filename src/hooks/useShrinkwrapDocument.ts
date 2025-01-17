
import {api} from "../api";
import {Message} from "../types/sidepanel.types";
import {useQuery} from "@tanstack/react-query";


export function useShrinkwrapDocument(message: Message | undefined) {
    return useQuery({
        queryKey: ['useShrinkwrapDocument'],
        queryFn: async () => {
            console.log('useShrinkwrapDocument', message);
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
        },
        enabled: false,
    },  );
}