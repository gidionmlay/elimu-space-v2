/**
 * Utility function to format prices in Tanzanian Shilling format
 * @param price - The price in number format
 * @returns Formatted price string with TSh prefix and proper comma separation
 */
export const formatPrice = (price: number): string => {
  return `TSh ${price.toLocaleString("en-TZ")}`;
};

/**
 * Utility function to truncate text to a specified character limit
 * @param text - The text to truncate
 * @param maxLength - Maximum number of characters (default: 120)
 * @returns Truncated text with ellipsis if needed
 */
export const truncateText = (text: string, maxLength: number = 120): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

/**
 * Utility function to format duration for display
 * @param duration - Duration string from course data
 * @returns Formatted duration string
 */
export const formatDuration = (duration: string): string => {
  // Extract just the duration part (e.g., "4 weeks" from "4 weeks | 8 sessions")
  const match = duration.match(/(\d+\s+\w+)/);
  return match ? match[1] : duration;
};
