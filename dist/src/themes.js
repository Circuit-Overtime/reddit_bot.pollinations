/**
 * Daily Theme Cycling Module
 * Provides different visual and caption styles for each day of the week
 * to prevent post monotony and increase engagement variety
 */
/**
 * Daily theme configurations
 * Each day has a unique visual style, caption tone, and engagement hooks
 */
export const themes = {
    monday: {
        name: 'Motivation Monday',
        imageStyle: 'Epic cinematic illustration with dramatic lighting, heroic composition',
        captionTone: 'Inspirational, energetic, motivating developers to build',
        visualElements: ['ascending mountains', 'breakthrough moments', 'lightning strikes', 'rising sun', 'breaking chains'],
        colorPalette: ['deep purple', 'gold', 'bright orange', 'electric blue'],
        promptPrefix: 'Epic cinematic comic book style artwork celebrating Monday momentum:',
        captionHooks: [
            'Week starts strong with these AI breakthroughs',
            'Fresh week energy: check out what shipped',
            'Monday fuel: incredible updates to power your builds',
            'Week unlocked: see what the team deployed',
        ],
    },
    tuesday: {
        name: 'Technical Tuesday',
        imageStyle: 'Detailed technical diagram meets abstract data visualization, futuristic aesthetic',
        captionTone: 'Technical depth, builder-focused, performance-oriented',
        visualElements: ['code streams', 'data flows', 'neural networks', 'circuit patterns', 'quantum particles'],
        colorPalette: ['neon green', 'cyan', 'dark blue', 'silver'],
        promptPrefix: 'Technical futuristic illustration with data visualization showing the week\'s updates:',
        captionHooks: [
            'Tech deep dive: here\'s what got optimized',
            'Performance gains unlocked this week',
            'Technical mastery: new capabilities shipped',
            'Code quality surge detected',
        ],
    },
    wednesday: {
        name: 'Creative Wednesday',
        imageStyle: 'Psychedelic surreal abstract art, dreamlike patterns, flowing organic shapes',
        captionTone: 'Creative, imaginative, experimental vibes',
        visualElements: ['morphing shapes', 'kaleidoscope patterns', 'flowing liquids', 'fractals', 'cosmic swirls'],
        colorPalette: ['magenta', 'lime green', 'electric pink', 'holographic gold'],
        promptPrefix: 'Surreal creative abstract artwork with psychedelic patterns representing innovation:',
        captionHooks: [
            'Mid-week creativity: check out these inventive updates',
            'Imagination unleashed: new features spark ideas',
            'Creative breakthroughs in the making',
            'Experimental updates changing the game',
        ],
    },
    thursday: {
        name: 'Throwback Thursday',
        imageStyle: 'Retro pixel art meets modern design, vaporwave aesthetic with nostalgic elements',
        captionTone: 'Nostalgia meets future, builders looking back and forward',
        visualElements: ['pixel art', 'vaporwave grids', 'retro computers', 'arcade vibes', 'analog meets digital'],
        colorPalette: ['hot pink', 'cyan', 'purple', 'gold'],
        promptPrefix: 'Retro vaporwave pixel art collage celebrating this week\'s building blocks:',
        captionHooks: [
            'Throwback to what\'s building the future',
            'Retro vibes, future tech: this week\'s remix',
            'From legacy to legend: updates that matter',
            'Leveling up: classic meets cutting-edge',
        ],
    },
    friday: {
        name: 'Feature Friday',
        imageStyle: 'Vibrant celebratory illustration with party energy, dynamic motion lines, confetti vibes',
        captionTone: 'Celebratory, playful, party-ready, FOMO inducing',
        visualElements: ['confetti explosions', 'celebration bubbles', 'fireworks', 'trophy moments', 'crowd energy'],
        colorPalette: ['brilliant red', 'golden yellow', 'electric pink', 'turquoise'],
        promptPrefix: 'Celebratory dynamic comic style illustration with party atmosphere featuring this week\'s wins:',
        captionHooks: [
            'TGIF: here\'s what shipped this week 🎉',
            'Feature drops that hit different',
            'Win of the week: new powers unlocked',
            'Friday flex: see what shipped',
        ],
    },
    saturday: {
        name: 'Builders Saturday',
        imageStyle: 'DIY maker aesthetic, workshop environment, hands-on craftsmanship, hackathon energy',
        captionTone: 'Community-focused, builder-powered, grassroots energy',
        visualElements: ['maker tools', 'workshop benches', 'building blocks', 'collaborative energy', 'prototype iterations'],
        colorPalette: ['warm rust', 'wood brown', 'forest green', 'cream'],
        promptPrefix: 'Workshop maker aesthetic illustration celebrating the builders and their creations:',
        captionHooks: [
            'Built by builders, for builders: this week\'s hackerspace finds',
            'Maker magic: community contributions that amaze',
            'Building blocks: what the community shipped',
            'Craft matters: quality updates this week',
        ],
    },
    sunday: {
        name: 'Sunday Spectrum',
        imageStyle: 'Holistic nature-themed comic flowchart, organic growth patterns, ecosystem harmony',
        captionTone: 'Reflective, integrative, ecosystem perspective',
        visualElements: ['flowering networks', 'ecosystem balance', 'growth spirals', 'natural harmony', 'interconnected nodes'],
        colorPalette: ['emerald green', 'golden orange', 'sky blue', 'purple'],
        promptPrefix: 'Nature-themed organic comic flowchart with ecosystem harmony showing integrated updates:',
        captionHooks: [
            'Week in review: see how it all connects',
            'Ecosystem perspective: what\'s growing strong',
            'Sunday synthesis: the week\'s integrated story',
            'Full spectrum: all the ways this week powered growth',
        ],
    },
};
/**
 * Get the current day of the week (0-6, where 0 is Sunday)
 */
export function getCurrentDayOfWeek() {
    const day = new Date().getDay();
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return days[day];
}
/**
 * Get theme for a specific day
 */
export function getThemeForDay(day) {
    return themes[day];
}
/**
 * Get current day's theme
 */
export function getCurrentTheme() {
    const day = getCurrentDayOfWeek();
    return themes[day];
}
/**
 * Get a random caption hook from the current theme
 */
export function getRandomCaptionHook() {
    const theme = getCurrentTheme();
    const randomIndex = Math.floor(Math.random() * theme.captionHooks.length);
    return theme.captionHooks[randomIndex];
}
/**
 * Build the image prompt with theme styling
 * Combines base PR list with theme-specific prompt prefix and visual elements
 */
export function buildThemedImagePrompt(basePRList, dateString) {
    const theme = getCurrentTheme();
    const elementsStr = theme.visualElements.slice(0, 4).join(', ');
    const colorsStr = theme.colorPalette.join(', ');
    return `${theme.promptPrefix}
${basePRList}
Visual elements: ${elementsStr}
Color palette: ${colorsStr}
Day theme: ${theme.name}
Style: ${theme.imageStyle}
Output SHORT image prompt (2-3 sentences). Strip all dates, counts, metrics. Dynamic energy and motion. ONLY output the image prompt.`;
}
/**
 * Build themed caption for Reddit post title
 * Incorporates theme tone and caption hooks
 */
export function buildThemedCaption(generatedTitle, dateString) {
    const theme = getCurrentTheme();
    const hook = getRandomCaptionHook();
    // Enhance the title with theme's caption tone context
    return `${hook}\n\n${generatedTitle}`;
}
/**
 * Get all themes (useful for documentation/UI purposes)
 */
export function getAllThemes() {
    return Object.values(themes);
}
/**
 * Export theme summary for current day
 */
export function getThemeSummary() {
    const theme = getCurrentTheme();
    return `
🎨 Theme: ${theme.name}
📍 Style: ${theme.imageStyle}
💭 Tone: ${theme.captionTone}
🌈 Colors: ${theme.colorPalette.join(', ')}
✨ Elements: ${theme.visualElements.join(', ')}
  `.trim();
}
