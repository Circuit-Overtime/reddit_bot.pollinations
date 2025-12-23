import {LINK, TITLE} from './link.js';
import { Devvit } from '@devvit/public-api';

Devvit.configure({
<<<<<<< HEAD
  http: {
    domains: ['gen.pollinations.ai', 'api.github.com'],
  },
});


Devvit.addSettings([
  {
    type: 'string',
    name: 'gh_token',
    label: 'GitHub Token',
    isSecret: true,
    scope: SettingScope.App, 
  },
  {
    type: 'string',
    name: 'p_key',
    label: 'Polli Key',
    isSecret: true,
    scope: SettingScope.App,
  },
])

Devvit.addMenuItem({
  label: 'Post Pollinations Image',
  location: 'subreddit',
  forUserType: 'moderator',
  onPress: async (_, context) => {
=======
  redditAPI: true,
  media: true,
});

Devvit.addTrigger({
  event: 'AppUpgrade',
  onEvent: async (event, context) => {
>>>>>>> aae439bf521c71f7e853e48cc3083318f201c05d
    try {
      const imageAsset = await context.media.upload({
        url: LINK,
        type: 'image',
      });

      await new Promise((resolve) => setTimeout(resolve, 5000));

      const post = await context.reddit.submitPost({
        subredditName: 'pollinations_ai',
        title: TITLE,
        kind: 'image',
        imageUrls: [imageAsset.mediaUrl],
      });

      console.log(`Posted image with ID: ${post.id}`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      
      if (errorMessage.includes('being created asynchronously')) {
        console.log('✅ Image is being posted asynchronously and will appear soon');
      } else {
        console.error('❌ Error posting image:', error);
      }
    }
  },
});

export default Devvit;
