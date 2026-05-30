export function getInitials(fullName: string): string {
    const [first, last] = fullName.trim().split(' ');
    return `${first?.[0] ?? ''}${last?.[0] ?? ''}`.toUpperCase();
}
