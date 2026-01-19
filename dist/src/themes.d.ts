/**
 * Daily Theme Cycling Module
 * Provides different visual and caption styles for each day of the week
 * to prevent post monotony and increase engagement variety
 */
export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
export interface Theme {
    name: string;
    imageStyle: string;
    captionTone: string;
    visualElements: string[];
    colorPalette: string[];
    promptPrefix: string;
    captionHooks: string[];
}
/**
 * Daily theme configurations
 * Each day has a unique visual style, caption tone, and engagement hooks
 */
export declare const themes: Record<DayOfWeek, Theme>;
/**
 * Get the current day of the week (0-6, where 0 is Sunday)
 */
export declare function getCurrentDayOfWeek(): DayOfWeek;
/**
 * Get theme for a specific day
 */
export declare function getThemeForDay(day: DayOfWeek): Theme;
/**
 * Get current day's theme
 */
export declare function getCurrentTheme(): Theme;
/**
 * Get a random caption hook from the current theme
 */
export declare function getRandomCaptionHook(): string;
/**
 * Build the image prompt with theme styling
 * Combines base PR list with theme-specific prompt prefix and visual elements
 */
export declare function buildThemedImagePrompt(basePRList: string, dateString: string): string;
/**
 * Build themed caption for Reddit post title
 * Incorporates theme tone and caption hooks
 */
export declare function buildThemedCaption(generatedTitle: string, dateString: string): string;
/**
 * Get all themes (useful for documentation/UI purposes)
 */
export declare function getAllThemes(): Theme[];
/**
 * Export theme summary for current day
 */
export declare function getThemeSummary(): string;
