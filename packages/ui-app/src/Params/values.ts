// Copyright 2017-2018 @polkadot/ui-app authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Params } from '@polkadot/params/types';
import { RawParam, RawParam$ValueArray } from './types';

import isUndefined from '@polkadot/util/is/undefined';

import getInitValue from './initValue';

export default function values (params: Params): Array<RawParam> {
  console.log('ui-app/Params/values.ts - params: ', params);

  const types = params.map(({ type }) => type);

  console.log('ui-app/Params/values.ts - types (from mapping over params): ', types);

  return types.map((type): RawParam => {

    if (Array.isArray(type)) {
      console.log('ui-app/Params/values.ts - type is an array (found when mapping over types): ', type);

      if (type.length !== 1) {
        console.error('Unable to determine default values for tuple type', type);

        return {
          isValid: false,
          type,
          value: void 0
        };
      }

      // NOTE special cases for where we have a known override formatter. See comments
      // in ./inintValueArray.ts
      if (type[0] === 'KeyValueStorage') {
        return {
          isValid: false, // invalid to start with, empty array
          type,
          value: []
        };
      }

      const value: RawParam$ValueArray = [];

      return type.reduce(({ isValid, type }, subtype) => {
        const avalue = getInitValue(subtype);

        value.push(avalue);

        return {
          isValid: isValid && !isUndefined(avalue),
          type,
          value
        };
      // FIXME Arrays are currently not valid as inputs, no rendered
      }, { isValid: false, type, value });
    }

    console.log('ui-app/Params/values.ts - type is NOT an array (found when mapping over types): ', type);

    const value = getInitValue(type);

    return {
      isValid: !isUndefined(value),
      type,
      value
    };
  });
}
