import { css } from "styled-components";

export const largeDesktop = (props:any) => {
    return css`
    @media (max-width:1440px) {
        ${props}
    }
    `
}
export const laptop = (props:any) => {
    return css`
    @media (max-width:1280px) {
        ${props}
    }
    `
}
export const tabletLandScape = (props:any) => {
    return css`
    @media (max-width:1024px) {
        ${props}
    }
    `
}
export const tablet = (props:any) => {
    return css`
    @media (max-width:768px) {
        ${props}
    }
    `
}
export const mobileLandScape = (props:any) => {
    return css`
    @media (max-width:480px) {
        ${props}
    }
    `
}
export const mobile = (props:any) => {
    return css`
    @media (max-width:350px) {
        ${props}
    }
    `
}