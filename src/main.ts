import { Devvit, RunAs } from '@devvit/public-api';
import LINK from './link.ts';


Devvit.addMenuItem({
  label: 'Post Pollinations Image',
  location: 'subreddit',
  onPress: async (_, context) => {
    const externalUrl = LINK;

    try {
      // 1. Upload the external image to Reddit's servers first
      const imageAsset = await context.media.upload({
        url: externalUrl,
        type: 'image',
      });

      console.log('Image uploaded to Reddit:', imageAsset);

      // 2. Submit the post using the i.redd.it URL returned by the upload
      await context.reddit.submitPost({
        subredditName: context.subredditName ?? 'pollinations_ai',
        title: 'Pollinations AI – Generated Visual',
        kind: 'image',
        imageUrls: [imageAsset.mediaUrl],
      });


      context.ui.showToast('Image posted successfully!');
    } catch (error) {
      console.error('Upload failed:', error);
      context.ui.showToast('Failed to upload image to Reddit.');
    }
  },
});

export default Devvit;
