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

// Base soothing nature aesthetic - consistent across all days, aligned with Pollinations identity
const SOOTHING_BASE_STYLE = 'Soothing watercolor-inspired nature composition with flowing organic elements, soft gradients, serene ecosystem harmony. Gentle visual documentation of interconnected growth and evolution.';
const SOOTHING_COLORS = ['soft sage green', 'warm cream', 'sky blue', 'gentle gold', 'muted terracotta'];
const SOOTHING_ELEMENTS = ['flowing vines', 'blooming flowers', 'interconnected roots', 'gentle light rays', 'organic growth patterns', 'ecosystem balance'];

export const themes: Record<DayOfWeek, Theme> = {
    monday: {
        name: 'Momentum Monday',
        imageStyle: SOOTHING_BASE_STYLE,
        captionTone: 'Inspirational, energetic, motivating developers to build',
        visualElements: [...SOOTHING_ELEMENTS, 'morning growth', 'fresh beginnings'],
        colorPalette: SOOTHING_COLORS,
        promptPrefix: 'Soothing nature illustration capturing this week\'s momentum and growth:',
        captionHooks: [
            'Week sprouts: check out what\'s growing',
            'Fresh growth energy in these updates',
            'Monday blooms: incredible cultivations this week',
            'Seeds planted: see what took root',
        ],
    },

    tuesday: {
        name: 'Technical Tuesday',
        imageStyle: SOOTHING_BASE_STYLE,
        captionTone: 'Technical depth, builder-focused, nature-informed systems',
        visualElements: [...SOOTHING_ELEMENTS, 'neural networks', 'data flows in nature'],
        colorPalette: SOOTHING_COLORS,
        promptPrefix: 'Soothing nature-inspired illustration showing the technical architecture and systems evolved:',
        captionHooks: [
            'Roots deepen: technical foundations strengthened',
            'System harmony: infrastructure cultivated this week',
            'Architecture blooms: capability expansion detailed',
            'Technical terroir: engineering excellence documented',
        ],
    },

    wednesday: {
        name: 'Creative Wednesday',
        imageStyle: SOOTHING_BASE_STYLE,
        captionTone: 'Creative, imaginative, experimental yet soothing vibes',
        visualElements: [...SOOTHING_ELEMENTS, 'creative mutations', 'experimental blooms'],
        colorPalette: SOOTHING_COLORS,
        promptPrefix: 'Soothing nature composition celebrating creative experiments and innovative evolution:',
        captionHooks: [
            'Mid-week metamorphosis: inventive updates flourish',
            'Creative pollination: new ideas cross-breed',
            'Experimental gardens: breakthrough features planted',
            'Artistic cultivation: vision taking form',
        ],
    },

    thursday: {
        name: 'Ecosystem Thursday',
        imageStyle: SOOTHING_BASE_STYLE,
        captionTone: 'Integration-focused, community building, interconnected systems',
        visualElements: [...SOOTHING_ELEMENTS, 'symbiotic relationships', 'interconnected networks', 'pollination cycles'],
        colorPalette: SOOTHING_COLORS,
        promptPrefix: 'Soothing nature illustration of interconnected ecosystem showing integrated systems and community pollination:',
        captionHooks: [
            'Ecosystem thrives: everything connects this week',
            'Pollination in progress: ideas cross-breed beautifully',
            'Community gardens: shared growth documented',
            'Symbiosis perfected: collaborative wins this week',
        ],
    },

    friday: {
        name: 'Feature Friday',
        imageStyle: SOOTHING_BASE_STYLE,
        captionTone: 'Celebratory yet serene, joyful achievements in nature context',
        visualElements: [...SOOTHING_ELEMENTS, 'flourishing abundance', 'peak bloom moments'],
        colorPalette: SOOTHING_COLORS,
        promptPrefix: 'Soothing nature masterpiece celebrating the week\'s flourishing features and fruitful achievements:',
        captionHooks: [
            'Week in full bloom: harvest of features shipped',
            'Peak pollination: cross-breed successes documented',
            'Fruition Friday: seeds grown into mighty trees',
            'Abundance harvested: see what flourished',
        ],
    },

    saturday: {
        name: 'Builders Saturday',
        imageStyle: SOOTHING_BASE_STYLE,
        captionTone: 'Community-focused, hands-on cultivation, gardener energy',
        visualElements: [...SOOTHING_ELEMENTS, 'careful cultivation', 'gardener\'s work', 'tended gardens'],
        colorPalette: SOOTHING_COLORS,
        promptPrefix: 'Soothing garden aesthetic celebrating the builders and gardeners tending the ecosystem:',
        captionHooks: [
            'Cultivated by gardeners: community growth this week',
            'Garden tended: careful builders shaped these updates',
            'Horticultural mastery: patient innovation blooms',
            'Ecosystem stewards: community care documented',
        ],
    },

    sunday: {
        name: 'Sunday Synthesis',
        imageStyle: SOOTHING_BASE_STYLE,
        captionTone: 'Reflective, integrative, complete ecosystem perspective',
        visualElements: [...SOOTHING_ELEMENTS, 'complete cycles', 'holistic balance', 'full spectrum growth'],
        colorPalette: SOOTHING_COLORS,
        promptPrefix: 'Soothing nature canvas depicting the complete week - all changes integrated into one harmonious ecosystem:',
        captionHooks: [
            'Week complete: ecosystem in balance and harmony',
            'Full spectrum growth: integrated view of all changes',
            'Synthesis Sunday: all updates woven together',
            'Harvest review: complete growth cycle documented',
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

export function buildThemedImagePrompt(prSummary: string, prObjects?: any[]): string {
    const theme = getCurrentTheme();
    const elementsStr = theme.visualElements.slice(0, 5).join(', ');
    const colorsStr = theme.colorPalette.join(', ');
    
    // Build a detailed description of what changed
    let changeDescription = '';
    if (prObjects && prObjects.length > 0) {
        const categories: Record<string, string[]> = {
            'feature': [],
            'fix': [],
            'docs': [],
            'perf': [],
            'other': []
        };
        
        prObjects.forEach(pr => {
            const title = pr.title.toLowerCase();
            if (title.includes('feat') || title.includes('add')) categories['feature'].push(pr.title);
            else if (title.includes('fix') || title.includes('bug')) categories['fix'].push(pr.title);
            else if (title.includes('docs')) categories['docs'].push(pr.title);
            else if (title.includes('perf') || title.includes('optim')) categories['perf'].push(pr.title);
            else categories['other'].push(pr.title);
        });
        
        changeDescription = `\nCHANGES MADE:`;
        if (categories['feature'].length > 0) changeDescription += `\nNew Features: ${categories['feature'].slice(0, 2).join(', ')}`;
        if (categories['fix'].length > 0) changeDescription += `\nBug Fixes: ${categories['fix'].slice(0, 2).join(', ')}`;

        if (categories['perf'].length > 0) changeDescription += `\nPerformance: ${categories['perf'].slice(0, 2).join(', ')}`;
        if (categories['docs'].length > 0) changeDescription += `\nDocumentation: ${categories['docs'].join(', ')}`;
    }

    return `${theme.promptPrefix}

WHAT ACTUALLY CHANGED (these are REAL updates):
${prSummary}${changeDescription}

VISUALIZATION REQUIREMENTS:
- Create an image that SHOWS the actual improvements and growth made
- Each change becomes a visual layer: new features as new blooms, fixes as strengthened roots, performance improvements as flowing energy
- Show BEFORE and AFTER conceptually (foundation strengthened → improvements flowing)
- Make it clear this represents TECHNICAL PROGRESS and PRODUCT EVOLUTION

COMPOSITION:
- Watercolor with flowing movement showing growth and improvement
- Central focus: ecosystem thriving with changes applied
- Flow from left to right: foundation → active changes → flourishing results
- All changes visible as integrated improvements in one harmonious scene

Visual palette: ${elementsStr}
Colors: ${colorsStr}
Style: ${theme.imageStyle}

Generate ONE concise image prompt (2-3 sentences max) that visually represents these SPECIFIC changes. ONLY output the image prompt.`;
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

