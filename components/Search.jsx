import React from 'react'
import "./Other.css";
import { Search } from 'lucide-react';

function Searchf() {
  return (
    <>
        <form action="" className='search-form'>
            <input name='query' defaultValue={"Type here!"} className='search-input'/>
            <Search size={20}/>
        </form>
    </>
  )
}

export default Searchf;