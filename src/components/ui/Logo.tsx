type LogoProps = {
  className?: string;
  size?: number;
  title?: string;
};

export default function Logo({ className = "", size, title }: LogoProps) {
  return (
    <svg
      viewBox="0 0 256 256"
      className={className}
      width={size}
      height={size}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      <path d="M248,128h-35V43l-25,24.996l-60-60v35.147H43.147L68,67.996l-60,60h35.147v84.853L68,187.996l60,60v-35.147h84.853 L188,187.996L248,128z M128,175.801c-26.402,0-47.805-21.403-47.805-47.805S101.598,80.191,128,80.191s47.805,21.403,47.805,47.805 S154.402,175.801,128,175.801z M128,146.045c-9.968,0-18.049-8.081-18.049-18.049s8.081-18.049,18.049-18.049 s18.049,8.081,18.049,18.049S137.968,146.045,128,146.045z" />
    </svg>
  );
}
