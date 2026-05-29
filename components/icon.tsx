import ICON_URL from "@assets/icon.png";
import { ComponentProps } from "react";
export function LogoIcon(props: ComponentProps<"img">) {
  return <img src={ICON_URL} {...props} loading="lazy" />;
}
