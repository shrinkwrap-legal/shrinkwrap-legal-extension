import { Button } from "react-bootstrap";
import {PropsWithChildren} from "react";
import React from "react";


export type LoadingButtonProps = {
    isLoading?: boolean;
    onClick?: () => void;
}
export function LoadingButton({ isLoading, onClick, children }: PropsWithChildren<LoadingButtonProps>) {
    return <Button onClick={onClick} disabled={isLoading}>{isLoading ? 'Loading...' : children}</Button>

}