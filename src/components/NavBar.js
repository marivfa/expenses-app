import React from 'react'
import { Link } from 'react-router-dom'
import { Graph, Category, ReportMoney, Alarm } from 'tabler-icons-react'
import '../style.css'

import MainExpenses from '../sections/expenses/MainExpenses'
import MainCategory from '../sections/category/MainCategory'
//import MainRemainders from '../sections/remainders/MainRemainders'
import MainDashboard from '../sections/dashboard/MainDashboard'

const items = [
  {
    path: '/dashboard',
    text: 'Home',
    comp: MainDashboard,
    icon: Graph,
  },
  {
    path: '/category',
    text: 'Category',
    comp: MainCategory,
    icon: Category,
  },
  {
    path: '/expenses',
    text: 'Expenses',
    comp: MainExpenses,
    icon: ReportMoney,
  },
  /*{
    path: '/remainders',
    text: 'Remainders',
    comp: MainRemainders,
    icon: Alarm
  },*/
]

export default function NavBar() {
  const li = items.map((item, index) => {
    return (
      <li className="nav-item" key={item.path}>
        <Link className="nav-link" to={item.path}>
          <item.icon /> {item.text}
        </Link>
      </li>
    )
  })

  return (
    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion">
      <a
        className="sidebar-brand d-flex align-items-center justify-content-center"
        href="/dashboard"
      >
        <div className="sidebar-brand-icon"></div>
        <div className="sidebar-brand-text mx-3">Expenses</div>
      </a>
      <hr className="sidebar-divider my-0"></hr>
      {li}
    </ul>
  )
}
