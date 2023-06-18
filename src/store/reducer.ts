import { SET_USER } from "./constants"

export const initState:any = {
  user: null,
  isAuthenticated: false
}

export default function reducer(state: any, action: any) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated : action.payload.isAuthenticated
      }
  }
}


