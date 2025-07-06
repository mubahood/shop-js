// src/app/components/Account/AccountSidebar.tsx
import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { logout } from '../../store/slices/authSlice';
import ToastService from '../../services/ToastService';

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  section?: string;
}

const AccountSidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      label: 'My Account',
      icon: 'bi-person-circle',
      path: '/account',
    },
    {
      id: 'orders',
      label: 'Orders',
      icon: 'bi-bag-check',
      path: '/account/orders',
    },
    {
      id: 'inbox',
      label: 'Inbox',
      icon: 'bi-envelope',
      path: '/account/inbox',
    },
    {
      id: 'reviews',
      label: 'Pending Reviews',
      icon: 'bi-star',
      path: '/account/reviews',
    },
    {
      id: 'vouchers',
      label: 'Vouchers',
      icon: 'bi-ticket-perforated',
      path: '/account/vouchers',
    },
    {
      id: 'wishlist',
      label: 'Wishlist',
      icon: 'bi-heart',
      path: '/wishlist',
    },
    {
      id: 'sellers',
      label: 'Followed Sellers',
      icon: 'bi-shop',
      path: '/account/sellers',
    },
    {
      id: 'recently-viewed',
      label: 'Recently Viewed',
      icon: 'bi-clock-history',
      path: '/account/recently-viewed',
    },
  ];

  const accountManagementItems: MenuItem[] = [
    {
      id: 'profile',
      label: 'Account Management',
      icon: 'bi-gear',
      path: '/account/profile',
      section: 'management'
    },
    {
      id: 'payment',
      label: 'Payment Settings',
      icon: 'bi-credit-card',
      path: '/account/payment',
      section: 'management'
    },
    {
      id: 'addresses',
      label: 'Address Book',
      icon: 'bi-geo-alt',
      path: '/account/addresses',
      section: 'management'
    },
    {
      id: 'newsletter',
      label: 'Newsletter Preferences',
      icon: 'bi-newspaper',
      path: '/account/newsletter',
      section: 'management'
    },
  ];

  const isActive = (path: string) => {
    if (path === '/account') {
      return location.pathname === '/account';
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    dispatch(logout());
    ToastService.logoutSuccess();
    navigate('/');
  };

  return (
    <div className="account-sidebar">
      {/* User Profile Header */}
      <div className="sidebar-header">
        <div className="user-avatar">
          <i className="bi bi-person-circle"></i>
        </div>
        <div className="user-info">
          <h5 className="user-name">
            {user?.first_name && user?.last_name 
              ? `${user.first_name} ${user.last_name}`
              : user?.email?.split('@')[0] || 'My Account'
            }
          </h5>
          <p className="user-email">{user?.email}</p>
        </div>
      </div>

      {/* Navigation Menu */}
      <Nav className="sidebar-nav">
        {/* Main Menu Items */}
        {menuItems.map((item) => (
          <Nav.Item key={item.id} className="sidebar-nav-item">
            <Nav.Link
              as={Link}
              to={item.path}
              className={`sidebar-nav-link ${isActive(item.path) ? 'active' : ''}`}
            >
              <i className={`${item.icon} sidebar-nav-icon`}></i>
              <span className="sidebar-nav-text">{item.label}</span>
              {isActive(item.path) && <div className="active-indicator"></div>}
            </Nav.Link>
          </Nav.Item>
        ))}

        {/* Divider */}
        <div className="sidebar-divider"></div>

        {/* Account Management Section */}
        {accountManagementItems.map((item) => (
          <Nav.Item key={item.id} className="sidebar-nav-item">
            <Nav.Link
              as={Link}
              to={item.path}
              className={`sidebar-nav-link ${isActive(item.path) ? 'active' : ''}`}
            >
              <i className={`${item.icon} sidebar-nav-icon`}></i>
              <span className="sidebar-nav-text">{item.label}</span>
              {isActive(item.path) && <div className="active-indicator"></div>}
            </Nav.Link>
          </Nav.Item>
        ))}

        {/* Logout */}
        <div className="sidebar-divider"></div>
        <Nav.Item className="sidebar-nav-item">
          <Nav.Link
            onClick={handleLogout}
            className="sidebar-nav-link logout-link"
            role="button"
          >
            <i className="bi-box-arrow-right sidebar-nav-icon"></i>
            <span className="sidebar-nav-text">Logout</span>
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default AccountSidebar;
