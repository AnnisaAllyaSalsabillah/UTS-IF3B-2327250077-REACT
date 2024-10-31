import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { useState } from 'react';

const Home = React.lazy(() => import('./components/Home'));
const SocialUsersList = React.lazy(() => import('./components/SocialUsers/List'));
const SocialUsersCreate = React.lazy(() => import('./components/SocialUsers/Create'));
const SocialUsersEdit = React.lazy(() => import('./components/SocialUsers/Edit'));

function App() {
  return (
    <Router>
      {/* navbar */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            MDP
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className={({ isActive }) => 'nav-link ${isActive ? "active" : ""}'} aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => 'nav-link ${isActive ? "active" : ""}'} to="/social_users">
                  Social Users
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/social_users" element={<SocialUsersList />} />
          <Route path="/social_users/create" element={<SocialUsersCreate />} />
          <Route path="/social_users/edit/:id" element={<SocialUsersEdit />} />
        </Routes>
      </Suspense>
      <div>
        <br />
        &copy; 2024 Nine
      </div>
    </Router>
  );
}

export default App;
