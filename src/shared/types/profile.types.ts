export interface UpdateProfileRequest {
  fullName?: string
  phone?: string
  address?: string
  avatar?: string
}

export interface ChangePasswordRequest {
  oldPassword: string
  newPassword: string
}


