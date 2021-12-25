/* eslint-disable consistent-return */
const API = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps';
const ID = '0KbvDeTm2dSbq5EIp5fq';

export const getLike = async () => {
  try {
    const response = await fetch(`${API}/${ID}/likes`, {
      method: 'GET',

      headers: {
        'Content-type': 'application/json; charset=-8',
      },
    });

    return await response.json();
  } catch (err) {
    // console.log(err);
  }
};

export const postLike = async (id) => {
  try {
    await fetch(`${API}/${ID}/likes`, {
      method: 'POST',
      body: JSON.stringify({
        item_id: `${id}`,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  } catch (err) {
    // console.log(err);
  }
};
