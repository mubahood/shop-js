// src/app/pages/account/Account.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import AccountLayout from '../../components/Account/AccountLayout';

const Account: React.FC = () => {
  return (
    <AccountLayout>
      <Outlet />
    </AccountLayout>
  );
};

export default Account;
