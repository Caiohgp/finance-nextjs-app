export function getStartDate(range: string | undefined): Date {
  const now = new Date()

  switch (range) {
    case "today":
      return new Date(now.getFullYear(), now.getMonth(), now.getDate())

    case "week":
      return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7)

    case "month":
      return new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())

    case "semester":
      return new Date(now.getFullYear(), now.getMonth() - 6, now.getDate())

    case "year":
      return new Date(now.getFullYear() - 1, now.getMonth(), now.getDate())

    default:
      return new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())
  }
}