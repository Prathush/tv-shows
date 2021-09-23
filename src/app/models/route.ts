import { StepDetails } from "./step-details";

export enum Route {
    ERROR = 'error',
    SHOWS_LIST = 'shows_list',
    SHOW_DETAILS = 'show_details',
}

export const SHOWS_LIST_STEP: StepDetails = {
    id: Route.SHOWS_LIST,
    url: '/'
};
export const SHOW_DETAILS_STEP: StepDetails = {
    id: Route.SHOW_DETAILS,
    url: '/show-details'
};
export const ERROR_STEP: StepDetails = {
    id: Route.ERROR,
    url: '/error'
};