import { useState } from 'react'
import { MOCK_SHOPPING, USE_MOCKS } from '../utils/constants'
import { shoppingService } from '../services/shoppingService'
export function useShoppingList(){const [items,setItems]=useState(MOCK_SHOPPING);const [error,setError]=useState('');
 const add=async(item)=>{try{if(USE_MOCKS){setItems(v=>[{...item,id:crypto.randomUUID(),purchased:false},...v]);return}const x=await shoppingService.create(item);setItems(v=>[x,...v])}catch(e){setError(e.message)}}
 const toggle=async(id)=>{const item=items.find(x=>x.id===id);if(!item)return;try{if(USE_MOCKS){setItems(v=>v.map(x=>x.id===id?{...x,purchased:!x.purchased}:x));return}const x=await shoppingService.update(id,{purchased:!item.purchased});setItems(v=>v.map(i=>i.id===id?x:i))}catch(e){setError(e.message)}}
 const remove=async(id)=>{try{if(!USE_MOCKS)await shoppingService.remove(id);setItems(v=>v.filter(x=>x.id!==id))}catch(e){setError(e.message)}}
 return {items,error,add,toggle,remove}}
