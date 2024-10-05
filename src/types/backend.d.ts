export interface IUser {
  _id?: string
  name?: string
  email?: string
  password?: string
  gender?: string
  address?: string
  avatar?: string
  isActive?: boolean
  role?:
    | {
        _id?: string
        name?: string
      }
    | string

  company?:
    | {
        _id?: string | undefined
        name?: string | undefined
      }
    | undefined
  createdBy?: string
  isDeleted?: boolean
  deletedAt?: boolean | null
  createdAt?: string
  updatedAt?: string
}

export interface IAccount {
  access_token?: string
  user: {
    _id: string
    email: string
    name: string
    role: {
      _id: string
      name: string
    }
    permissions: {
      _id: string
      name: string
      apiPath: string
      method: string
      module: string
    }[]
  }
}

export interface ICompany {
  _id?: string
  name?: string
  address?: string
  logo?: string
  isActive?: boolean
  description?: string
  createdBy?: string

  isDeleted?: boolean
  deletedAt?: boolean | null
  createdAt?: string
  updatedAt?: string
  jobs?: number
}

export interface IJob {
  _id?: string
  name: string
  skills: string[]
  companyId: {
    _id: string
    name?: string
    logo?: string
  }

  location: string
  salary: number
  quantity: number
  level: string
  description: string
  startDate: Date | null
  endDate: Date | null
  isActive: boolean
  createdBy?: string
  isDeleted?: boolean
  deletedAt?: boolean | null
  createdAt?: string
  updatedAt?: string
}

export interface IResume {
  _id?: string
  email: string
  userId: string
  url: string
  status: string
  companyId:
    | string
    | {
        _id: string
        name: string
        logo: string
      }
  jobId:
    | string
    | {
        _id: string
        name: string
      }
  history?: {
    status: string
    updatedAt: Date
    updatedBy: { _id: string; email: string }
  }[]
  createdBy?: string
  isDeleted?: boolean
  deletedAt?: boolean | null
  createdAt?: string
  updatedAt?: string
}

export interface IPermission {
  _id?: string
  name?: string
  apiPath?: string
  method?: string
  module?: string

  createdBy?: string
  isDeleted?: boolean
  deletedAt?: boolean | null
  createdAt?: string
  updatedAt?: string
}

export interface IRole {
  _id?: string
  name: string
  description: string
  isActive: boolean
  permissions: string[]

  createdBy?: string
  isDeleted?: boolean
  deletedAt?: boolean | null
  createdAt?: string
  updatedAt?: string
}

export interface ISubscribers {
  _id?: string
  name?: string
  email?: string
  skills: string[]
  createdBy?: string
  isDeleted?: boolean
  deletedAt?: boolean | null
  createdAt?: string
  updatedAt?: string
}

export interface IPaginate {
  current?: number
  pageSize?: number
  pages?: number
  total?: number
  keyword?: string
}

export interface INotification {
  _id?: string
  title?: string
  message?: string
  type?: string
  url?: string
  userId?: string
  isRead?: false
  url: string
  createdBy?: {
      _id: {
          _id: string
          name: string
          email: string
          avatar: string
      }
      email: string
  }
  isDeleted?: boolean
  deletedAt?: boolean | null
  createdAt?: string
  updatedAt?: string
}