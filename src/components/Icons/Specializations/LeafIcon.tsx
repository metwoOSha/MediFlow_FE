export function LeafIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <path d="M5.5 12.5l7-7a5 5 0 1 1 7 7l-7 7a5 5 0 0 1-7-7z" />
            <path d="M9 9l6 6" />
        </svg>
    );
}
