import React, { createContext, useContext, useState, useEffect } from 'react';

const SidebarContext = createContext();

export const useSidebar = () => {
  return useContext(SidebarContext);
};

export const SidebarProvider = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);

  // Load collapsed state from localStorage on initial load
  useEffect(() => {
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState !== null) {
      setDesktopCollapsed(JSON.parse(savedState));
    }
  }, []);

  // Save collapsed state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', JSON.stringify(desktopCollapsed));
  }, [desktopCollapsed]);

  const toggleMobileSidebar = () => {
    setMobileOpen(!mobileOpen);
  };

  const toggleDesktopSidebar = () => {
    setDesktopCollapsed(!desktopCollapsed);
  };

  const closeMobileSidebar = () => {
    setMobileOpen(false);
  };

  const openMobileSidebar = () => {
    setMobileOpen(true);
  };

  const collapseDesktopSidebar = () => {
    setDesktopCollapsed(true);
  };

  const expandDesktopSidebar = () => {
    setDesktopCollapsed(false);
  };

  return (
    <SidebarContext.Provider value={{
      mobileOpen,
      desktopCollapsed,
      toggleMobileSidebar,
      toggleDesktopSidebar,
      closeMobileSidebar,
      openMobileSidebar,
      collapseDesktopSidebar,
      expandDesktopSidebar,
      setMobileOpen
    }}>
      {children}
    </SidebarContext.Provider>
  );
};