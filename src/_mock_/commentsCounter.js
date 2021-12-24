import fetch from 'cross-fetch';

export default async (dataID) => {
  const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/XkZb08sfqWimSB3Sqtb3/comments?item_id=${dataID}`);
  const comment = await response.json();
  return comment;
};