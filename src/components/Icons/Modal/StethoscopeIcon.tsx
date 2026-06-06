export function StethoscopeIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <path d="M6 3v4a4 4 0 0 0 8 0V3"></path>
            <path d="M10 13v2a5 5 0 0 0 10 0v-1"></path>
            <circle cx="20" cy="11" r="2"></circle>
        </svg>
    );
}
