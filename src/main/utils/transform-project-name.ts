export function transformProjectName(input: string): string {
  return input
    .toLowerCase() // Convert to lowercase
    .replace(/[^\w\s]/g, '') // Remove non-word characters (except spaces)
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple consecutive hyphens with a single one
}
