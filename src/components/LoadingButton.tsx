import { Button } from "react-bootstrap";
import {PropsWithChildren} from "react";
import React from "react";


export type LoadingButtonProps = {
    isLoading?: boolean;
    onClick?: () => void;
}
export function LoadingButton({ isLoading, onClick, children }: PropsWithChildren<LoadingButtonProps>) {
    const onClickHandler = isLoading ? onClick : undefined;
    return <Button onClick={onClickHandler} disabled={isLoading}>{isLoading ? 'Loading...' : children}</Button>

}