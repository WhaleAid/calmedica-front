import { Suspense } from "react";

export default function AuthenticationLayout(props: { children: React.ReactNode }) {
    return (
        <Suspense>
            <div>
                {props.children}
            </div>
        </Suspense>
    )
}