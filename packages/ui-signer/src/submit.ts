// Copyright 2017-2018 @polkadot/ui-signer authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { RxApiInterface } from '@polkadot/api-rx/types';
import { Interface$Method } from '@polkadot/jsonrpc/types';
import { Param$Values } from '@polkadot/params/types';
import { QueueTx$Result } from './types';

export default async function submitMessage (api: RxApiInterface, params: Array<Param$Values>, { name, section }: Interface$Method): Promise<QueueTx$Result> {
  try {
    const result = await api[section][name].apply(null, params).toPromise();

    console.log(`${section}.${name}: result ::`, result);

    return {
      result,
      status: 'sent'
    };
  } catch (error) {
    console.error(error);

    return {
      error,
      status: 'error'
    };
  }
}