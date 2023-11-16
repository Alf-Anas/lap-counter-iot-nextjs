/* eslint-disable @next/next/no-img-element */

type Props = {
    alt: string;
    src: string;
    className?: string;
    style?: React.CSSProperties;
    width?: number | string;
    height?: number | string;
};

export default function MyImage({
    alt,
    src,
    className,
    style,
    width,
    height,
}: Props) {
    return (
        <img
            src={src}
            alt={alt}
            className={className}
            style={style}
            loading="lazy"
            width={width}
            height={height}
        />
    );
}
