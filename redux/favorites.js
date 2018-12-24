import * as ActionTypes from './ActionTypes';

export const favorites = (state = [], action) =>
{
    switch(action.type)
    {
        case ActionTypes.ADD_FAVORITE:
            if(state.some(el => el === action.payload)) // checks if already favorite
            {
                return state;
            }
            else
            {
                return state.concat(action.payload);
            }
        default:
            return state;
    }
}