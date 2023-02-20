import AsyncStorage from "@react-native-async-storage/async-storage";

// I persist data in format data, timeExp - data is data, timeExp is now time + timeToCache

// const persistData = async() =>{}

export const callbackPersist = async <T>(
  key: string,
  callback: () => Promise<T>,
  expireInMinutes = 0.1
): Promise<T> => {
  let data = null;
  // await AsyncStorage.removeItem(key);
  await AsyncStorage.getItem(key, async (_, value) => {
    if (!value) return (data = null);
    data = JSON.parse(value);
    // there is data in cache && cache is expired
    if (
      data !== null &&
      data["expireAt"] &&
      new Date(data.expireAt) < new Date()
    ) {
      //clear cache
      AsyncStorage.removeItem(key);

      //update res to be null
      data = null;
    } else {
      console.log("read data from cache  ", data);
    }
  });

  //update cache + set expire at date
  if (data === null) {
    //fetch data

    try {
      data = await callback();
      data.expireAt = getExpireDate(expireInMinutes);
      const objectToStore = JSON.stringify(data);
      console.log("cache new Date ", objectToStore);
      await AsyncStorage.setItem(key, objectToStore);
      console.log(data.expireAt);
      return data;
    } catch (error) {
      console.log("Error", error);
    }
  }
  return data as Promise<T>;
};

function getExpireDate(expireInMinutes: number): Date {
  const now = new Date();
  const expireTime = new Date(now);
  expireTime.setMinutes(now.getMinutes() + expireInMinutes);
  return expireTime;
}

// export async function getCachedUrlContent(
//   urlAsKey: string,
//   token: string,
//   expireInMinutes = 0.1,
//   signal?: AbortSignal
// ) {
//   let data = null;

//   await AsyncStorage.getItem(urlAsKey, async (err, value) => {
//     data = JSON.parse(value);
//     // there is data in cache && cache is expired
//     if (
//       data !== null &&
//       data["expireAt"] &&
//       new Date(data.expireAt) < new Date()
//     ) {
//       //clear cache
//       AsyncStorage.removeItem(urlAsKey);

//       //update res to be null
//       data = null;
//     } else {
//       console.log("read data from cache  ");
//     }
//   });

//   //update cache + set expire at date
//   if (data === null) {
//     console.log("cache new Date ");

//     //fetch data
//     data = await fetchContributors().then((apiRes) => {
//       //set expire at
//       apiRes.expireAt = getExpireDate(expireInMinutes);

//       //stringify object
//       const objectToStore = JSON.stringify(apiRes);

//       //store object
//       AsyncStorage.setItem(urlAsKey, objectToStore);

//       console.log(apiRes.expireAt);
//       return apiRes;
//     });
//   }
//   return data;
// }
