📘 RCT-PEIS-JOURNAL — Blog Web Application

A full-stack blog application built with React, featuring authentication, authorization, profile management, comments, and CRUD blog functionality.

🌐 Overview

RCT-PEIS-JOURNAL is a modern, fully interactive blog platform built using React.
Users can create accounts, write daily blog posts, edit or delete them, leave comments, manage their profiles, and interact with other users’ content.

Guests can browse the Landing Page, access the About Page, and view public content, but all application routes are protected — only authenticated users can create/edit/comment.

This project demonstrates clean architecture using:

React Context API for global state

LocalStorage for persistent auth

Custom hooks for cleaner reusable logic

Route guarding for secure navigation

Modular components for scalability

✨ Features
👥 Authentication & Authorization

User login & registration

Secure route guarding based on auth state

Automatic session persistence using localStorage

User roles & permission-based UI behaviors

✍️ Blog Functionality (CRUD)

Create posts

Edit posts

Delete posts

View single blog details

Comment on posts (only authenticated users)

📑 User Profiles

Each user has a personal profile page

View user-created blog posts

Edit or delete only your own posts

Manage personal info (if implemented)

💬 Comments

Add comments to posts

Display author + timestamp

Automatically refresh comment section

🎨 UI & Navigation

Public Landing Page for guests

About Page

404 Not Found handling

Clean, responsive layout

Navigation bar updates dynamically when logged in

🧰 Under the Hood

React + Vite

React Router for navigation

Context API for global authentication state

localStorage for token/session persistence

The app uses:

Auth Context to track logged-in user

Custom Guard Components to protect routes

Redirects for unauthorized access attempts

Example behaviors:

Logged-out users cannot visit /create, /profile, /edit/:id

Logged-in users cannot visit /login or /register

🧠 State Management & Architecture
🟦 Context API

Used for:

Logged-in user data

Token management

Global authentication state

🟨 localStorage

Used for:

Persisting login sessions

Retaining user data after refresh

🟩 Custom Hooks

Examples:

useAuth() — access auth state

useForm() — form control

useFetch() — reusable API requests

MIT License © Plamen Draganov
Fetch/axios for doing network requests (depending on your setup)

Custom hooks (useAuth, useForm, etc.)
