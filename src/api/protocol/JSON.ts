import * as lodash from 'lodash';

import typeConstructors from '../typeConstructors';

export const fromJSON = <T>(data: any) => {
  const typeOf = typeof data;
  if (!data) {
    return data
  } else if (typeOf === 'string') {
    return data
  } else if (typeOf === 'number') {
    return data
  } else if (typeOf === 'boolean') {
    return data
  } else if (data instanceof Array) {
    return fromJSONArray<T>(data)
  } else if (!data.hasOwnProperty("tpe")) {
    return Object.keys(data).reduce((acc, curr) => ({...acc, [curr]: fromJSON(data[curr])}), {});
  } else {
    return fromJSONObject<T>(data)
  }
}

const fromJSONArray = <T>(data: Array<any>): Array<T> => {
  return data.map(v => fromJSON(v));
}

const fromJSONObject = <T>(data: any = {}) => {
  const typeConstructor = typeConstructors[data.tpe.value];
  if (!typeConstructor) {
    throw new Error(`Undefined typeConstructor ${data.tpe.value}`);
  }
  const tpeOmmitedData = lodash.omit(data, ['tpe']);
  const subKeys = lodash.mapValues(tpeOmmitedData, value => fromJSON(value));
  return new typeConstructor(subKeys);
}