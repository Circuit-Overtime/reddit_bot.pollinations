export async function postImageToSubreddit(
  context,
  subredditName,
  title,
  imageArrayBuffer
) {
  const upload = await context.reddit.uploadMedia({
    subredditName,
    mimeType: 'image/png',
    data: imageArrayBuffer, 
  });

  if (!upload || !upload.mediaId) {
    throw new Error('Reddit image upload failed');
  }

  // Submit image post
  const post = await context.reddit.submitPost({
    subredditName,
    title,
    mediaId: upload.mediaId,
  });

  console.log(`✓ Posted successfully to r/${subredditName}`);
  console.log(`  Title: ${title}`);
  console.log(`  Post URL: https://reddit.com${post.permalink}\n`);

  return post;
}
