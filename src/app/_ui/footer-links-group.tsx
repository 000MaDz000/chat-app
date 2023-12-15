import { HTMLAttributes, PropsWithChildren } from "react";

type FooterLinksItemProps = PropsWithChildren<{ titleText: string } & HTMLAttributes<HTMLDivElement>>;
export default function FooterLinksItem(props: FooterLinksItemProps) {
    const divAttr: Partial<FooterLinksItemProps> = { ...props };
    delete divAttr.titleText;

    return (
        <div {...divAttr} className={"flex flex-col gap-2 text-center footer-links-group " + props.className}>
            <div>
                <h1 className="text-xl">{props.titleText}</h1>
            </div>
            <div className="flex flex-col">
                {props.children}
            </div>
        </div>
    )
}