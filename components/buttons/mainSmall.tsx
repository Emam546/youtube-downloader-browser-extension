import classNames from "classnames";
import { ComponentProps } from "react";

export function MainSmallButton({
  className,
  onClick,
  ...props
}: ComponentProps<"button">) {
  return (
    <button
      {...props}
      type="button"
      className={classNames(
        "yt-downloader-extension-button",
        className,
        "flex m-0 bg-primary text-white text-xl font-bold rounded-full cursor-pointer aspect-square border-none",
      )}
      onClick={function (event) {
        event.preventDefault();
        event.stopPropagation();
        onClick?.(event);
      }}
      aria-label="Download this video with the app"
    >
      <LogoIcon
        alt="Downloader App"
        className="select-none min-w-2 aspect-square w-full p-0 m-0"
      />
    </button>
  );
}
