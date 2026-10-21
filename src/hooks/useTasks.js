import { useCallback, useEffect, useState } from 'react'
import { MOCK_TASKS, USE_MOCKS } from '../utils/constants'
import { taskService } from '../services/taskService'
export function useTasks() {
  const [tasks,setTasks]=useState(MOCK_TASKS), [loading,setLoading]=useState(!USE_MOCKS), [error,setError]=useState('')
  const refresh=useCallback(async()=>{ if(USE_MOCKS) return; setLoading(true); setError(''); try { setTasks(await taskService.list()) } catch(e){setError(e.message)} finally{setLoading(false)} },[])
  useEffect(()=>{refresh()},[refresh])
  const create=async(task)=>{ if(USE_MOCKS){const item={...task,id:crypto.randomUUID(),completed:false};setTasks(v=>[item,...v]);return item} const item=await taskService.create(task);setTasks(v=>[item,...v]);return item }
  const toggle=async(id)=>{const current=tasks.find(t=>t.id===id);if(!current)return;const next=!current.completed;if(USE_MOCKS){setTasks(v=>v.map(t=>t.id===id?{...t,completed:next}:t));return} const item=await taskService.update(id,{completed:next});setTasks(v=>v.map(t=>t.id===id?item:t))}
  return {tasks,loading,error,create,toggle,refresh}
}
