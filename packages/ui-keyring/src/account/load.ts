// Copyright 2017-2018 @polkadot/ui-keyring authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { KeyringPair, KeyringPair$Json } from '@polkadot/util-keyring/types';
import { State } from '../types';

// Load account keyring pair into memory using account JSON file.
export default function accountLoad (state: State, json: KeyringPair$Json): KeyringPair | void {
  const { keyring } = state;
  const _address = json.address;

  if (!_address) {
    return;
  }

  try {
    const pair = keyring.addFromJson(json);

    return pair;
  } catch (error) {
    console.error('Unable to load account');
  }
}