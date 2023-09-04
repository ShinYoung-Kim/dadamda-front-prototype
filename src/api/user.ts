import { useQuery } from "@tanstack/react-query";
import { GET_USER_PROFILE_IMAGE } from "../secret";

const fetchUserProfileImage = async(token: string) => {
    const response = await fetch(GET_USER_PROFILE_IMAGE, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "X-AUTH-TOKEN": token,
        },
    }).then((response) => {
        return response.json().then(body => {
            if (response.ok) {
                return body;
            } else {
                throw new Error(body.resultCode);
            }
        })
    })
    
    return response;
}

export const useGetUserProfileImage = async(token: string) => {
    const userProfileImage = await fetchUserProfileImage(token);
    return userProfileImage;
}

export function getUserImageQuery(token : string) {
    return useQuery(
        ['userImage'],
        () => token && useGetUserProfileImage(token),
        {
            select(data) {
                return data.data.profileUrl;
            },
            refetchOnWindowFocus: false,
        }
    );
}
