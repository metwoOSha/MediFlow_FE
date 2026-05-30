export function PersonIcon(props: React.SVGProps<SVGSVGElement>) {
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
            <circle cx="12" cy="8" r="4" />
            <path d="M9 9h.01M15 9h.01" />
            <path d="M9 11s1 1 3 1 3-1 3-1" />
            <path d="M5 21a7 7 0 0 1 14 0" />
        </svg>
    );
}
