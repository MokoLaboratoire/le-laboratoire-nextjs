import React from 'react'

const session = null

export default function Tasks() {

	if(!session) throw new Error('Not authenticated')

	console.log("Hello")

  return (
    <div>tasks</div>
  )
}
