// Copyright 2017-2018 @polkadot/app-accounts authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { I18nProps } from '@polkadot/ui-app/types';

import './index.css';

import React from 'react';

import accountObservable from '@polkadot/ui-keyring/observable/accounts';
import Tabs from '@polkadot/ui-app/Tabs';
import withObservableBase from '@polkadot/ui-react-rx/with/observableBase';

import { isNoAccounts } from './util/accounts';
import Creator from './Creator';
import Editor from './Editor';
import Restorer from './Restorer';
import translate from './translate';

type Props = I18nProps & {
  accountAll?: Array<any>,
  basePath: string
};

type Actions = 'create' | 'edit' | 'restore';

type State = {
  action: Actions
};

// FIXME React-router would probably be the best route, not home-grown
const Components: { [index: string]: React.ComponentType<any> } = {
  'create': Creator,
  'edit': Editor,
  'restore': Restorer
};

class AccountsApp extends React.PureComponent<Props, State> {
  state: State = { action: 'edit' };

  componentDidUpdate () {
    const { accountAll } = this.props;
    const { action } = this.state;

    if (action === 'edit' && isNoAccounts(accountAll)) {
      this.selectRestore();
    }
  }

  render () {
    const { accountAll, t } = this.props;
    const { action } = this.state;
    const Component = Components[action];
    const items = [
      {
        name: 'edit',
        text: t('app.edit', { defaultValue: 'Edit account' })
      },
      {
        name: 'create',
        text: t('app.create', { defaultValue: 'Create account' })
      },
      {
        name: 'restore',
        text: t('app.restore', { defaultValue: 'Restore account' })
      }
    ];

    // Do not load Editor tab if no accounts
    if (isNoAccounts(accountAll)) {
      items.splice(0, 1);
    }

    return (
      <main className='accounts--App'>
        <header>
          <Tabs
            activeItem={action}
            items={items}
            onChange={this.onMenuChange}
          />
        </header>
        <Component
          onChangeAccount={this.onChangeAccount}
          onCreateAccount={this.onCreateAccount}
        />
      </main>
    );
  }

  onChangeAccount = () => {
    this.selectEdit();
  }

  onCreateAccount = () => {
    this.selectEdit();
  }

  onMenuChange = (action: Actions) => {
    this.setState({ action });
  }

  selectEdit = (): void => {
    this.setState({ action: 'edit' });
  }

  selectRestore = (): void => {
    this.setState({ action: 'restore' });
  }
}

export default withObservableBase(
  accountObservable.subject, { propName: 'accountAll' }
)(translate(AccountsApp));
