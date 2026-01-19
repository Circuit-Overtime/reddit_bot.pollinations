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

export const themes: Record<DayOfWeek, Theme> = {
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

export function getCurrentDayOfWeek(): DayOfWeek {
    const day = new Date().getDay();
    const days: DayOfWeek[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return days[day];
}

export function getThemeForDay(day: DayOfWeek): Theme {
    return themes[day];
}

export function getCurrentTheme(): Theme {
    const day = getCurrentDayOfWeek();
    return themes[day];
}

export function getRandomCaptionHook(): string {
    const theme = getCurrentTheme();
    const randomIndex = Math.floor(Math.random() * theme.captionHooks.length);
    return theme.captionHooks[randomIndex];
}

export function buildThemedImagePrompt(basePRList: string): string {
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

export function buildThemedCaption(generatedTitle: string): string {
    const theme = getCurrentTheme();
    const hook = getRandomCaptionHook();
    
    return `${hook}\n\n${generatedTitle}`;
}

export function getAllThemes(): Theme[] {
    return Object.values(themes);
}

export function getThemeSummary(): string {
    const theme = getCurrentTheme();
    return `
🎨 Theme: ${theme.name}
📍 Style: ${theme.imageStyle}
💭 Tone: ${theme.captionTone}
🌈 Colors: ${theme.colorPalette.join(', ')}
✨ Elements: ${theme.visualElements.join(', ')}
    `.trim();
}
