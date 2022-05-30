import firebase from 'firebase'

// eslint-disable-next-line import/named
import { GetterTree, MutationTree, ActionTree, Store } from 'vuex'
import { UserType } from '../order.model'
// import Serializable from '../Serializable'

export const CC_INITIAL = 0
export const NOTIFICATION_TYPE = 4

export enum StatusState {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  CANCLED = 'cancled',
}

export enum EmployeeStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export class EmployeesInfo {
  employeeId: string
  status: EmployeeStatus
  carbonCoinBalance: number
  constructor(employess: EmployeesInfo) {
    this.employeeId = employess.employeeId
    this.status = EmployeeStatus.ACTIVE
    this.carbonCoinBalance = employess.carbonCoinBalance
  }

  toJson() {
    return {
      employeeId: this.employeeId,
      status: this.status,
    }
  }
}

export class CarbonTransaction {
  BusinessId: string
  EmployeeId: string
  PriceAmount: number
  CarbonAmount: number
  UniqueKey: number
  CreatedDate: firebase.firestore.Timestamp = firebase.firestore.Timestamp.now()
  Employee: UserType
  paymentStatus: StatusState

  constructor(carbonTransactionInfo: CarbonTransaction) {
    this.BusinessId = carbonTransactionInfo.BusinessId
    this.EmployeeId = carbonTransactionInfo.Employee?.id
    this.PriceAmount = carbonTransactionInfo.PriceAmount
    this.CarbonAmount = carbonTransactionInfo.CarbonAmount
    this.UniqueKey = carbonTransactionInfo.UniqueKey
    this.CreatedDate = carbonTransactionInfo.CreatedDate
    this.Employee = carbonTransactionInfo.Employee
    this.paymentStatus = carbonTransactionInfo.paymentStatus
  }
}

export class BusinessNotification {
  content: string
  message: string
  dateTime: firebase.firestore.Timestamp
  receiverId: string
  status: number
  business: string
  type: number
  link?: string

  constructor(invitationNotification: BusinessNotification) {
    this.content = invitationNotification.content
    this.message = invitationNotification.message
    this.dateTime = firebase.firestore.Timestamp.now()
    this.receiverId = invitationNotification.receiverId
    this.status = 1
    this.business = invitationNotification.business
    this.type = invitationNotification.type

    if (invitationNotification.link) this.link = invitationNotification.link
  }
}

export class BusinessAuctions {
  CCamount: number
  auctionEndDate: firebase.firestore.Timestamp
  auctionStartDate: firebase.firestore.Timestamp
  bids: Array<{
    bidCarbon: number
    employeeName: string
    empId: string
    time: firebase.firestore.Timestamp
  }>

  status: number
  open: number
  price: number
  businessId: string
  code: string
  vender: string
  constructor(businessAuction: BusinessAuctions) {
    this.CCamount = businessAuction.CCamount
    this.auctionEndDate = businessAuction.auctionEndDate
    this.auctionStartDate = firebase.firestore.Timestamp.now()
    this.bids = []
    this.price = businessAuction.price
    this.businessId = businessAuction.businessId
    this.code = businessAuction.code
    this.vender = businessAuction.vender
    this.status = 1
    this.open = 1
  }
}

export interface BusinessLocation {
  Street1: string
  Street2: string
  City: string
  State: string
  Country: string
  PostalCode: string
}

export interface BusinessInformationType {
  Name: string
  Description: string
  Industry: string
  Location: BusinessLocation
  CarbonCreditBalance: number
  BusinessOwnerId: string
  Requests: Array<string>
}

export class BusinessInformation {
  Id?: string | number
  id?: string | number
  Name: string
  Description: string
  Industry: string
  Location: BusinessLocation
  Employees: Array<EmployeesInfo>
  CarbonCreditBalance: number
  BusinessOwnerId: string
  Requests: Array<string>

  constructor(businessInformation: BusinessInformationType) {
    this.Name = businessInformation.Name
    this.Description = businessInformation.Description
    this.Industry = businessInformation.Industry
    this.Location = businessInformation.Location
    this.Employees = []
    this.CarbonCreditBalance = CC_INITIAL
    this.BusinessOwnerId = businessInformation.BusinessOwnerId
    this.Requests = []
  }

  toJson() {
    const jsonLocation = {
      City: this.Location.City,
      Street1: this.Location.Street1,
      Street2: this.Location.Street2,
      State: this.Location.State,
      Country: this.Location.Country,
      PostalCode: this.Location.PostalCode,
    }

    return {
      Name: this.Name,
      Industry: this.Industry,
      Description: this.Description,
      Location: jsonLocation,
      Employees: this.Employees,
      CarbonCreditBalance: this.CarbonCreditBalance,
      BusinessOwnerId: this.BusinessOwnerId,
      Requests: this.Requests,
    }
  }
}

export interface BusinessState {
  myBusinessInformation?: BusinessInformation
  allBusinessInformation?: Array<BusinessInformation>
  employees: Array<UserType>
  carbonTransactions: Array<CarbonTransaction>
  businessAuctions?: Array<any>
  closedBusinessAuctions?: Array<any>
  businessLeaderboardRanks: Object | undefined
  topBusinessLeaderboard: Object | undefined
  myBusinessLeaderboard: Object | undefined
  myDeptLeaderboard: Array<any> | undefined
}

export type BusinessMutations = MutationTree<BusinessState>
export type BusinessGetters = GetterTree<BusinessState, Store<any>>
export type BusinessActions = ActionTree<BusinessState, Store<any>>
