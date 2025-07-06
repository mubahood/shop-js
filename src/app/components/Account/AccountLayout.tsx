// src/app/components/Account/AccountLayout.tsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import AccountSidebar from './AccountSidebar';
import './AccountLayout.css';

interface AccountLayoutProps {
  children?: React.ReactNode;
}

const AccountLayout: React.FC<AccountLayoutProps> = ({ children }) => {
  return (
    <div className="account-layout">
      <Container fluid className="account-container">
        <Row className="g-0 min-vh-100">
          {/* Sidebar */}
          <Col xs={12} lg={4} xl={3} className="account-sidebar-col">
            <AccountSidebar />
          </Col>
          
          {/* Main Content Area */}
          <Col xs={12} lg={8} xl={9} className="account-content-col">
            <div className="account-content-wrapper">
              {children || <Outlet />}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AccountLayout;
