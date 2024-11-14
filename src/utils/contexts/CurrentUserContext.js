import React from "react";

const CurrentUserContext = React.createContext({
    currentUser: 
    {
        user: "",
        avatar: ""
    },
})

export {CurrentUserContext}