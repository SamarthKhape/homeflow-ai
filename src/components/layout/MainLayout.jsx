import { useState } from 'react'
import { Outlet, useLocation } from 'react-router'
import Sidebar from './Sidebar'
import Header from './Header'
const titles={"/":['Dashboard','Your household at a glance'],"/assistant":['AI Assistant','Plan and coordinate household workflows'],"/tasks":['Tasks','Keep everyday work moving'],"/shopping":['Shopping List','Everything your household needs'],"/reminders":['Reminders','Never miss the small things']}
export default function MainLayout(){const [open,setOpen]=useState(false);const {pathname}=useLocation();const [title,subtitle]=titles[pathname]||['HomeFlow AI','Household command center'];return <div className="min-h-screen bg-[#07111f]"><div className="flex min-h-screen"><Sidebar open={open} onClose={()=>setOpen(false)}/>{open&&<button className="fixed inset-0 z-30 bg-black/60 lg:hidden" onClick={()=>setOpen(false)} aria-label="Close navigation overlay"/>}<div className="min-w-0 flex-1"><Header onMenu={()=>setOpen(true)} title={title} subtitle={subtitle}/><main className="mx-auto max-w-[1500px] p-4 md:p-7"><Outlet/></main></div></div></div>}
