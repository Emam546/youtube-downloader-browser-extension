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
      id="yt-downloader-extension-button"
      type="button"
      className={classNames(
        className,
        "m-0 bg-primary text-white text-xl font-bold   rounded-full cursor-pointer aspect-square",
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
        className="select-none w-full block min-w-4"
      />
    </button>
  );
}
