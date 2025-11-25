import AuthLayout from '@/components/authLayout/authLayout'
import React from 'react'

const page = () => {
  return (
    <div>
      <AuthLayout> 
        <div>
          {/* do everything within this div and make sure to not remove the authlayout tags */}
        </div>
      </AuthLayout>
    </div>
  )
}

export default page
