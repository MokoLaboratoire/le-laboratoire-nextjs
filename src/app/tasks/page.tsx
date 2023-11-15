import React from 'react'
import { AuthRequiredError } from '../lib/AuthRequiredError'

const session = null

export default function Tasks() {

	if(!session) throw new AuthRequiredError

	console.log("Hello")

  return (
    <div>tasks</div>
  )
}
