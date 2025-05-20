// Imports.

export function capitalizeAndTrim(input: string): string {
    return input.trim().split(/\s+/).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
}
