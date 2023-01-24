import React from 'react'
import { Route, Routes } from 'react-router-dom'

import MainExpenses from './sections/expenses/MainExpenses'
import FormExpenses from './sections/expenses/FormExpenses'
import MainCategory from './sections/category/MainCategory'
import FormCategory from './sections/category/FormCategory'
import MainRemainders from './sections/remainders/MainRemainders'
import FormRemainders from './sections/remainders/FormRemainders'
import MainDashboard from './sections/dashboard/MainDashboard'
import FormLogin from './sections/login/FormLogin'
import UsersProfile from './sections/users/UsersProfile'

export default function MainRouter() {
  return (
    <Routes>
      <Route path="/" exact element={<MainDashboard />} />
      <Route path="/login" exact element={<FormLogin />} />
      <Route path="/profile" exact element={<UsersProfile />} />
      <Route path="/dashboard" exact element={<MainDashboard />} />
      <Route path="/category" exact element={<MainCategory />} />
      <Route path="/category/create" exact element={<FormCategory />} />
      <Route path="/category/edit/:id" exact element={<FormCategory />} />
      <Route path="/expenses" exact element={<MainExpenses />} />
      <Route path="/expenses/create" exact element={<FormExpenses />} />
      <Route path="/expenses/edit/:id" exact element={<FormExpenses />} />
      <Route path="/remainders" exact element={<MainRemainders />} />
      <Route path="/remainders/create" exact element={<FormRemainders />} />
      <Route path="/remainders/edit/:id" exact element={<FormRemainders />} />
    </Routes>
  )
}
