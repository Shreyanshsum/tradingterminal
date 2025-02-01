'use client';

import styles from '@components/page/DashboardLayout.module.scss';

import * as React from 'react';
import * as Utilities from '@common/utilities';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SidebarLayout from '@components/SidebarLayout';
import ActionListItem from '@components/ActionListItem';
import DropdownMenuTrigger from '@components/DropdownMenuTrigger';
import ActionButton from '@components/ActionButton';
import DebugGrid from '@components/DebugGrid';
import Icon from '@components/Icon';
import { useHotkeys } from '@modules/hotkeys';

interface DashboardLayoutProps {
  children?: React.ReactNode;
  previewPixelSRC: string;
  title?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, previewPixelSRC, title = 'Dashboard' }) => {
  const pathname = usePathname();
  const [isGrid, setGrid] = React.useState(false);
  const [isSidebarOpen, setSidebarOpen] = React.useState(true);

  // Initialize sidebar state based on screen size
  React.useEffect(() => {
    const checkScreenSize = () => {
      setSidebarOpen(window.innerWidth > 768);
    };

    // Initial check
    checkScreenSize();

    // Add listener for window resize
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  // Add keyboard shortcuts
  useHotkeys('ctrl+0', () => {
    // Open fonts dropdown
    const fontsButton = document.querySelector('[data-dropdown="fonts"]');
    if (fontsButton) {
      (fontsButton as HTMLElement).click();
    }
  });

  useHotkeys('ctrl+t', () => {
    // Open theme dropdown
    const themeButton = document.querySelector('[data-dropdown="theme"]');
    if (themeButton) {
      (themeButton as HTMLElement).click();
    }
  });

  useHotkeys('ctrl+g', () => {
    toggleDebugGrid();
  });

  const navigationItems = [
    { icon: <Icon name="monitor" />, label: 'Dashboard', href: '/' },
    { icon: <Icon name="star" />, label: 'Top', href: '/top' },
    { icon: <Icon name="scan" />, label: 'Screener', href: '/screener' },
    { icon: <Icon name="rocket" />, label: 'NeuraAI', href: '/neurai' },
    { icon: <Icon name="portfolio" />, label: 'Portfolio', href: '/portfolio' },
    { icon: <Icon name="timer" />, label: 'History', href: '/history' },
    { icon: <Icon name="setting-2" />, label: 'Settings', href: '/settings' },
  ];

  // Get current page title from navigation items
  const currentPage = navigationItems.find(item => item.href === pathname) || navigationItems[0];

  const toggleDebugGrid = () => {
    setGrid(!isGrid);
    window.dispatchEvent(new Event('debugGridToggle'));
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={styles.root}>
      <SidebarLayout
        isCollapsed={!isSidebarOpen}
        sidebar={
          <nav className={styles.navigation}>
            <div className={styles.navItems}>
              {navigationItems.map((item) => (
                <ActionListItem 
                  key={item.label} 
                  icon={item.icon} 
                  href={item.href}
                  isActive={pathname === item.href}
                >
                  {isSidebarOpen ? item.label : ''}
                </ActionListItem>
              ))}
            </div>
            
            {isSidebarOpen && (
              <div className={styles.controls}>
                <DropdownMenuTrigger
                  items={[
                    { icon: '⊹', children: 'Commit Mono V143 [OFL]', onClick: () => Utilities.onHandleFontChange('font-use-commit-mono') },
                    { icon: '⊹', children: 'Departure Mono [MIT]', onClick: () => Utilities.onHandleFontChange('font-use-departure-mono') },
                    { icon: '⊹', children: 'Fira Code [OFL]', onClick: () => Utilities.onHandleFontChange('font-use-fira-code') },
                    { icon: '⊹', children: 'Fragment Mono [OFL]', onClick: () => Utilities.onHandleFontChange('font-use-fragment-mono') },
                    { icon: '⊹', children: 'Geist Mono [OFL] [DEFAULT]', onClick: () => Utilities.onHandleFontChange('') },
                    { icon: '⊹', children: 'Iosevka Term [OFL]', onClick: () => Utilities.onHandleFontChange('font-use-iosevka-term') },
                    { icon: '⊹', children: 'JetBrains Mono [OFL]', onClick: () => Utilities.onHandleFontChange('font-use-jet-brains-mono') },
                    { icon: '⊹', children: 'SFMono Square [FOSS]', onClick: () => Utilities.onHandleFontChange('font-use-sfmono-square') },
                    { icon: '⊹', children: 'Server Mono 0.0.6 [OFL]', onClick: () => Utilities.onHandleFontChange('font-use-server-mono') },
                    { icon: '⊹', children: 'TX-02 Berkeley Mono™', onClick: () => Utilities.onHandleFontChange('font-use-berkeley-mono') },
                  ]}
                >
                  <ActionButton data-dropdown="fonts">Fonts ⌃+0</ActionButton>
                </DropdownMenuTrigger>

                <DropdownMenuTrigger
                  items={[
                    { icon: '⊹', children: 'Refined White [DEFAULT]', onClick: () => Utilities.onHandleThemeChange('') },
                    { icon: '⊹', children: 'Black Midnight Vapor', onClick: () => Utilities.onHandleThemeChange('theme-dark') },
                    { icon: '⊹', children: 'U-571 Code Red', onClick: () => Utilities.onHandleThemeChange('theme-black-red') },
                    { icon: '⊹', children: 'Digital Bioluminescence', onClick: () => Utilities.onHandleThemeChange('theme-black-teal') },
                    { icon: '⊹', children: 'Operation Safe Blue', onClick: () => Utilities.onHandleThemeChange('theme-blue') },
                    { icon: '⊹', children: 'Neon Green Garden', onClick: () => Utilities.onHandleThemeChange('theme-green') },
                    { icon: '⊹', children: 'Kirkland Signature AS/400', onClick: () => Utilities.onHandleThemeChange('theme-black-green') },
                  ]}
                >
                  <ActionButton data-dropdown="theme">Theme ⌃+T</ActionButton>
                </DropdownMenuTrigger>

                <ActionButton onClick={toggleDebugGrid}>Grid ⌃+G {isGrid ? 'On' : 'Off'}</ActionButton>
              </div>
            )}
          </nav>
        }
        defaultSidebarWidth={isSidebarOpen ? 20 : 4}
      >
        <main className={styles.content}>
          <div className={styles.topBar}>
            <ActionButton onClick={toggleSidebar}>{isSidebarOpen ? '←' : '→'}</ActionButton>
            <h1 className={styles.title}>{currentPage.label}</h1>
            <div className={styles.actions}>
              <ActionButton>
                <span className="content">Buy & Sell</span>
                <Icon name="wallet" />
              </ActionButton>
              <ActionButton>
                <span className="content">Search</span>
                <Icon name="search" />
              </ActionButton>
              <ActionButton>
                <span className="content">Notifications</span>
                <Icon name="notifications" />
              </ActionButton>
            </div>
          </div>
          <img className={styles.pixel} src={previewPixelSRC} alt="" />
          {children}
        </main>
      </SidebarLayout>
      <DebugGrid />
    </div>
  );
};

export default DashboardLayout; 