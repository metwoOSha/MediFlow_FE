export function PatientsIcon(props: React.SVGProps<SVGSVGElement>) {
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
            <circle cx="9" cy="8" r="3.2" />
            <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
            <circle cx="17" cy="9" r="2.6" />
            <path d="M16 20a5 5 0 0 1 5.5-5" />
        </svg>
    );
}
