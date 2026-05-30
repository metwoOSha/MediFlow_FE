export function BrandIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="0"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <path d="M10 3h4v7h7v4h-7v7h-4v-7H3v-4h7z" />
        </svg>
    );
}
