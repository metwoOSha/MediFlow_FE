export function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <rect x="3" y="5" width="18" height="16" rx="2.5"></rect>
            <path d="M3 10h18"></path>
            <path d="M8 3v4M16 3v4"></path>
        </svg>
    );
}
