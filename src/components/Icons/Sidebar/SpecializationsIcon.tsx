export function SpecializationsIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <path d="M3 12V5a2 2 0 0 1 2-2h7l9 9-9 9-9-9z" />
            <circle cx="8" cy="8" r="1.3" />
        </svg>
    );
}
