import React from 'react';
import { Outlet } from 'react-router-dom';
import UserViewerHead from '../Headers/UserViewerHead';

const UserViewLayOut = () => {
  return (
    <section className="userViewer">
      <UserViewerHead />
      <Outlet id="userOutlet" />
    </section>
  )
}

export default UserViewLayOut