import { Mail, MapPin, Phone, User } from 'lucide-react';
import React from 'react'
import type { UserAddress } from '../../../types/user-profile';
 interface UserHeadProps {
   email:string;
   phone: string;
   name: string;
   role: string;
   address: UserAddress;
}
const UserHead: React.FC<UserHeadProps> = (
  {
    email,
    phone,
    name,
    role,
    address,
    
  }
) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 px-8 py-12">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">{name}</h1>
            <p className="text-primary-100 text-lg capitalize mb-4">{role}</p>
            <div className="flex flex-wrap gap-4 text-primary-50">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>{email}</span>
              </div>
              {phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>{phone}</span>
                </div>
              )}
              { address?.city || address?.state || address?.street || address?.zipCode && (
                <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{address?.city}, {address?.state}</span>
              </div>
              )}
            </div>
          </div>
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
            <User className="w-12 h-12 text-primary-600" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserHead
