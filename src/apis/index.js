/* eslint-disable consistent-return */
export const postComment = async (post) => {
  try {
    await fetch(
      'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/XkZb08sfqWimSB3Sqtb3/comments',
      {
        method: 'POST',
        body: JSON.stringify(post),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    );
  } catch (err) {
    // console.error(err);
  }
};

export const getComment = async (id) => {
  try {
    const response = await fetch(
      `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/ofEMqPseJBxt6GrJYVpl/comments?item_id=${id}`,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    );
    return await response.json();
  } catch (err) {
    // console.log(err)
  }
};
