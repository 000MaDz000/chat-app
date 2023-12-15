import { HTMLAttributes, PropsWithChildren } from "react";

export default function FooterLinksItem(props: PropsWithChildren<{ titleText: string } & HTMLAttributes<HTMLDivElement>>) {
    return (
        <div {...props} className={"flex flex-col gap-2 text-center footer-links-group " + props.className}>
            <div>
                <h1 className="text-xl">{props.titleText}</h1>
            </div>
            <div className="flex flex-col">
                {props.children}
            </div>
        </div>
    )
}