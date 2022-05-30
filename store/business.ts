import firebase from 'firebase'
import _ from 'lodash'
import Logger from '~/plugins/logger'
import { GetCountry } from '~/plugins/countries'

import {
  BusinessActions,
  BusinessMutations,
  BusinessState,
  CarbonTransaction,
  BusinessInformation,
  StatusState,
  EmployeesInfo,
  EmployeeStatus,
  BusinessNotification,
  BusinessAuctions,
} from '~/plugins/model/business/business.model'
import { UserType } from '~/plugins/model/order.model'

const logErrorMsg = (title: string, messages?: any) => {
  // eslint-disable-next-line no-console
  console.error('[Products]', title, messages)
  if (messages?.err) throw messages?.err
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const logger = new Logger('Business')

export const state = (): BusinessState => ({
  employees: [],
  carbonTransactions: [],
  allBusinessInformation: [],
  businessAuctions: [],
  closedBusinessAuctions: [],
  myBusinessInformation: undefined,
  businessLeaderboardRanks: undefined,
  topBusinessLeaderboard: undefined,
  myBusinessLeaderboard: undefined,
  myDeptLeaderboard: undefined,
})

export const getters: any = {
  getAuctionData: (state: any, bId: any) => {
    return _.filter(state.businessAuctions, (b) => b.id === bId)
  },
}

export const mutations: BusinessMutations = {
  SET_MY_DEPT_LEADERBOARD: (state, payload: any) => {
    state.myDeptLeaderboard = payload
  },
  SET_MY_BUSINESS_LEADERBOARD: (state, payload: Object) => {
    state.myBusinessLeaderboard = payload
  },
  SET_TOP_BUSINESS_LEADERBOARD: (state, payload: Object) => {
    state.topBusinessLeaderboard = payload
  },
  SET_BUSINESS_LEADERBOARD_RANK: (state, payload: Object) => {
    state.businessLeaderboardRanks = payload
  },
  SET_BUSINESS_INFORMATION: (
    state,
    businessInformation: BusinessInformation
  ) => {
    state.myBusinessInformation = businessInformation
  },
  UPDATE_EMPLOYEES: (state, employees: Array<UserType>) => {
    state.employees = employees
  },

  UPDATE_TRANSACTIONS: (
    state,
    carbonTransactions: Array<CarbonTransaction>
  ) => {
    state.carbonTransactions = carbonTransactions
  },

  UPDATE_ALL_BUSINESS: (state, business: Array<BusinessInformation>) => {
    state.allBusinessInformation = business
  },

  ADD_AUCTION: (state, businessAuctions: any) => {
    state.businessAuctions?.push(businessAuctions)
  },

  REMOVE_AUCTION: (state, payload: { auctionId: string }) =>
    (state.businessAuctions = _.reject(
      state.businessAuctions,
      (businessAuction: any) => businessAuction.id === payload.auctionId
    )),

  UPDATE_AUCTION_STATUS: (state, payload: { auctionId: string }) =>
    (state.businessAuctions = _.filter(
      state.businessAuctions,
      (businessAuction: any) => businessAuction.id === payload.auctionId
    )),

  UPDATE_AUCTIONS: (state, businessAuctions: Array<any>) => {
    state.businessAuctions = businessAuctions
  },

  UPDATE_CLOSED_AUCTIONS: (state, businessAuctions: Array<any>) => {
    state.closedBusinessAuctions = businessAuctions
  },

  REMOVE_EMPLOYEE: (state, businessRef: BusinessInformation) => {
    state.allBusinessInformation = _.filter(
      state.allBusinessInformation,
      (businessAcc) => businessAcc === businessRef
    )
  },
}

export const actions: BusinessActions = {
  // update employees
  // update transactions

  // ↓↓To add users (employees) to the business account when the user receive the inivitaion link
  async addEmployee(
    { dispatch },
    payload: { employeeId?: string; businessId: string }
  ) {
    try {
      /**
       * This is first finding business account information
       * Then setting employee information (employeeID)
       * and insert employee information into business account
       */
      const { ...businessRef } = await dispatch('getBusinessById', {
        id: payload.businessId,
      })

      const currentUser = this.$fire.auth.currentUser

      const employeeInfo = new EmployeesInfo({
        employeeId: currentUser?.uid,
      } as EmployeesInfo)
      const { ...employeesInfoRef } = employeeInfo

      businessRef.Employees.push(employeesInfoRef)
      // remove employee id from requests while ones they are added to the account
      businessRef.Requests = _.reject(
        businessRef.Requests,
        (empId: string) => empId === currentUser?.uid
      )
      await this.$fire.firestore
        .collection('business')
        .doc(payload.businessId)
        .set(businessRef)
    } catch (error) {
      logger.logError('Adding empoyee failed', { error })
    }
  },

  // ↓↓To find employees by thier #ID
  async getEmployeeById(_context, employeeId: string) {
    try {
      const emmployeeRef = await this.$fire.firestore
        .collection('users')
        .doc(employeeId)
        .get()

      // ↓↓Pick only thier [email,firstName && lastName] from result
      let employee = _.pick(emmployeeRef.data(), [
        'email',
        'firstName',
        'lastName',
        'tel',
      ])

      employee = { id: emmployeeRef.id, ...employee } as UserType
      return employee
    } catch (error) {
      logger.logError('Get employee information failed', { error })
    }
  },

  // ↓↓ Pick all employess that are registered in specific business account by #businessId
  async fetchBusinessEmployees({ commit, dispatch }) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...businessEmplyoeeCollection } = await dispatch(
        'getMyBusiness'
      )

      const employees = [] as Array<UserType>

      businessEmplyoeeCollection.Employees.forEach(
        async (employee: EmployeesInfo) => {
          employees.push(
            (await dispatch('getEmployeeById', employee.employeeId)) as UserType
          )
        }
      )

      commit('UPDATE_EMPLOYEES', employees)
    } catch (error) {
      logger.logError('Fetching Business failed', { error })
    }
  },

  async fetchBusinessAuction({ commit, dispatch, state }) {
    try {
      let business: BusinessInformation | undefined
      if (state.myBusinessInformation === undefined) {
        business = await dispatch('getBusinessInformation')
      } else business = state.myBusinessInformation

      const { id } = business!

      const businessAuctionsRef = await this.$fire.firestore
        .collection('businessAuctions')
        .where('businessId', '==', id)
        // .where('status', '==', 1)
        .get()

      let businessAuctions = [] as any
      businessAuctionsRef.forEach((businessAuction) => {
        businessAuctions.push({
          id: businessAuction.id,
          ...businessAuction.data(),
        })
      })

      businessAuctions = _.sortBy(businessAuctions, (b) => b.auctionEndDate)

      commit('UPDATE_AUCTIONS', businessAuctions)

      return { businessAuctions }
    } catch (error) {
      logger.logError('Fetching Business  Auctions failed', { error })
    }
  },

  async fetchCloasedBusinessAuction({ commit, dispatch, state }) {
    try {
      let business: BusinessInformation | undefined
      if (state.myBusinessInformation === undefined) {
        business = await dispatch('getBusinessInformation')
      } else business = state.myBusinessInformation

      const { id } = business!

      const businessAuctionsRef = await this.$fire.firestore
        .collection('businessAuctions')
        .where('businessId', '==', id)
        .where('status', '==', 0)
        .get()

      const businessAuctions = [] as any
      businessAuctionsRef.forEach((businessAuction) => {
        businessAuctions.push({
          id: businessAuction.id,
          ...businessAuction.data(),
        })
      })

      commit('UPDATE_CLOSED_AUCTIONS', businessAuctions)

      return { businessAuctions }
    } catch (error) {
      logger.logError('Fetching Business  Auctions failed', { error })
    }
  },

  async createBusinessAuction(
    { dispatch, commit, state },
    BusinessAuctionInfo: any
  ) {
    try {
      let business: BusinessInformation | undefined
      if (state.myBusinessInformation === undefined) {
        business = await dispatch('getBusinessInformation')
      } else business = state.myBusinessInformation

      const { id } = business!

      //  this.auction.auctionEndDate = firebase.firestore.Timestamp.fromDate(
      //    new Date(BusinessAuctionInfo.auctionEndDate)
      //  )

      // const auctionEndDateNew = firebase.firestore.Timestamp.fromDate(
      //   new Date(BusinessAuctionInfo.auctionEndDate)
      // )

      const { ...businessAuction } = new BusinessAuctions({
        CCamount: BusinessAuctionInfo.CCamount,
        auctionEndDate: firebase.firestore.Timestamp.fromDate(
          new Date(BusinessAuctionInfo.auctionEndDate)
        ),
        price: BusinessAuctionInfo.price,
        businessId: id,
        code: BusinessAuctionInfo.code,
        vender: BusinessAuctionInfo.vender,
      } as BusinessAuctions)

      // Create carbonAuction
      const auctionRef = await this.$fire.firestore
        .collection('businessAuctions')
        .add(businessAuction)

      const businessRef = await dispatch('getBusinessInformation')
      // send notification to all employee

      businessRef.Employees.forEach(async (e: any) => {
        const businessNotification = {
          content: `Invitation to Bid! A new auction is started by ${businessRef.Name}. Don't miss it!`,
          receiverId: e.employeeId,
          dateTime: firebase.firestore.Timestamp.now(),
          business: businessRef.id,
          link: `/business/auction?id=${auctionRef.id}`,
          status: 1,
          type: 5,
        }
        await this.$fire.firestore
          .collection('notifications')
          .add(businessNotification)
      })

      commit('ADD_AUCTION', (await auctionRef.get()).data())
    } catch (error) {
      logger.logError('Fetching create Business Auction failed', {
        error,
      })
    }
  },

  // async closeBusinessAuction(
  //   { dispatch, state, commit },
  //   payload: { auctionId: string }
  // ) {
  //   dispatch('fetchBusinessAuction')

  //   try {
  //     const businessAuction = _.find(
  //       state.businessAuctions,
  //       (businessAuction: any) => businessAuction.id === payload.auctionId
  //     )

  //     if (!businessAuction) throw new Error('Error')

  //     const businesAuctionsRef_ = await this.$fire.firestore
  //       .collection('businessAuctions')
  //       .doc(businessAuction.id)

  //     // const businesAuctionsRef = businesAuctionsRef_.data()

  //     if (!businesAuctionsRef_) return null

  //     // businesAuctionsRef.status = 0

  //     await businesAuctionsRef_.delete()

  //     commit('REMOVE_AUCTION', { auctionId: businessAuction.id })
  //   } catch (err) {
  //     logErrorMsg('Error Closing Auction', {
  //       err,
  //     })
  //   }
  // },

  // async cancelBusinessAuction(
  //   { dispatch, state, commit },
  //   payload: { auctionId: string }
  // ) {
  //   dispatch('fetchBusinessAuction')

  //   try {
  //     const businessAuction = _.find(
  //       state.businessAuctions,
  //       (businessAuction: any) => businessAuction.id === payload.auctionId
  //     )
  //     const currentUser = this.$fire.auth.currentUser

  //     if (!businessAuction) throw new Error('Error')

  //     const businesAuctionsRef_ = await this.$fire.firestore
  //       .collection('businessAuctions')
  //       .doc(businessAuction.id)
  //       .get()

  //     // const businesAuctionsRef = businesAuctionsRef_.data()

  //     if (!businesAuctionsRef_) return null

  //     const bisdContainer = [] as any
  //     _.forEach(businesAuctionsRef_.data()?.bids, (bids) =>
  //       bisdContainer.push(bids)
  //     )

  //     for (let i = 0; i < bisdContainer.length; i++) {
  //       if (bisdContainer[i].uid === currentUser?.uid) {
  //         bisdContainer.slice(i, 1)
  //       }
  //       console.log('bisdContainer', bisdContainer)
  //     }
  //     // await this.$fire.firestore
  //     //   .collection('businessAuctions')
  //     //   .doc(businessAuction.id)
  //     //   .update({ bids: bisdContainer })
  //     // businesAuctionsRef.status = 0

  //     // await businesAuctionsRef_.delete()

  //     // commit('REMOVE_AUCTION', { auctionId: businessAuction.id })
  //   } catch (err) {
  //     logErrorMsg('Error Closing Auction', {
  //       err,
  //     })
  //   }
  // },

  async openAuction({ dispatch, state, commit }, auctionId: string) {
    try {
      await dispatch('fetchBusinessAuction')

      const businessAuction = _.find(
        state.businessAuctions,
        (businessAuction: any) => businessAuction.id === auctionId
      )

      if (!businessAuction) throw new Error('Error')

      const businesAuctionsRef_ = await this.$fire.firestore
        .collection('businessAuctions')
        .doc(businessAuction.id)
        .get()

      const businesAuctionsRef = businesAuctionsRef_.data()

      if (!businesAuctionsRef) return

      businesAuctionsRef.open = 0

      await businesAuctionsRef_.ref.set(businesAuctionsRef)

      commit('UPDATE_AUCTIONS', businesAuctionsRef)
    } catch (err) {
      logErrorMsg('Error Closing Auction', {
        err,
      })
    }
  },

  async changeStatusEmployee(
    { commit, dispatch },
    payload: { employeeId: string; employeeStatus: string }
  ) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...businessRef } = await dispatch('getMyBusiness')

      _.map(businessRef.Employees, (employee: any) => {
        employee.employeeId === payload.employeeId
          ? (employee.status = payload.employeeStatus)
          : (employee.status = EmployeeStatus.ACTIVE)
      })

      await (
        await this.$fire.firestore.collection('business').doc(id).get()
      ).ref.set(businessRef)

      // commit('UPDATE_EMPLOYEES', businessRef)
      commit('UPDATE_EMPLOYEES', businessRef)
    } catch (error) {
      logger.logError('Updated employee status failed', {
        error,
      })
    }
  },

  /**
   * ↓↓ Business search users by names || lastName in order to register as thier employee
   */
  async serachUser({ commit }, payload: { name: string }) {
    try {
      const usersRef = await this.$fire.firestore.collection('users').get()
      const users = [] as Array<UserType>
      usersRef.forEach((user) => {
        users.push({
          id: user.id,
          ...user.data(),
        } as UserType)
      })

      const searchedUser = _.filter(
        users,
        (user) =>
          user.firstName.includes(payload.name) ||
          user.lastName.includes(payload.name)
      )

      commit('UPDATE_EMPLOYEES', searchedUser)
    } catch (error) {
      logger.logError('Searching employee failed', {
        error,
      })
    }
  },

  async createBusinessNotification(
    { dispatch, state },
    payload: { link: string; empId: string; message: string; type: number }
  ) {
    try {
      let business: BusinessInformation | undefined
      if (state.myBusinessInformation === undefined) {
        business = await dispatch('getBusinessInformation')
      } else business = state.myBusinessInformation

      const { ...inviteNotifayContent } = new BusinessNotification({
        content: payload.message,
        message: payload.message,
        receiverId: payload.empId,
        business: business?.id,
        link: payload.link,
        status: 1 as number,
        type: payload.type,
      } as BusinessNotification)

      await this.$fire.firestore
        .collection('notifications')
        .add(inviteNotifayContent)
    } catch (error) {
      logger.logError('Error', error)
    }
  },
  /**
   * ↓↓ The #Business sends request (invitation URL) to user
   * it create push notification to user
   * and users gets invitationURL from notification
   */
  async sendRequestToUser(
    { dispatch },
    payload: { invitationURL: string; userId: string; businessId: string }
  ) {
    try {
      const CreatedDate = firebase.firestore.Timestamp.now()

      // find My Business information
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { ...myBusiness } = await dispatch('getBusinessById', {
        id: payload.businessId,
      })
      if (!myBusiness) logger.logError(`Business Account does't found`)

      const { ...invitationNotification } = new BusinessNotification({
        content: `You have new join business invitation from ${myBusiness.Name}`,
        link: payload.invitationURL,
        dateTime: CreatedDate,
        type: 4,
        receiverId: payload.userId,
        business: payload.businessId,
      } as BusinessNotification)

      const businessNotification = await this.$fire.firestore
        .collection('notifications')
        .add(invitationNotification)

      if (!businessNotification) return

      const businessAccount = await this.$fire.firestore
        .collection('business')
        .doc(payload.businessId)
        .get()

      myBusiness.Requests.push(payload.userId)

      await businessAccount.ref.update(myBusiness)
    } catch (error) {
      logger.logError('Sending request to user failed', {
        error,
      })
    }
  },

  /**
   * Get the  the user wallet.
   */
  async walletCapacity(_context, EmployeeId: string) {
    try {
      const walletSnapshot = await this.$fire.firestore
        .collection('wallet')
        .where('userId', '==', EmployeeId)
        .get()

      if (!walletSnapshot) throw new Error('User wallet doest exist')

      return { id: walletSnapshot.docs[0].id, ...walletSnapshot.docs[0].data() }
    } catch (error) {
      logger.logError('Getting wallet capacity failed', { error })
    }
  },

  /**
   * ↓↓ Business cretae carbon_transaction from thier employees
   * Added carbonCreditBalance to thier account
   * Reduce carbonCreditBalance from a user
   */

  async createCarbonTransactions(
    { dispatch },
    payload: {
      carbonAmount: number
      priceAmount: number
      businessId: string
      uniqueKey: number
    }
  ) {
    try {
      const CreatedDate = firebase.firestore.Timestamp.now()
      const currentUser = this.$fire.auth.currentUser

      // const { ...businessRef } = await dispatch('getBusinessById', {
      //   id: payload.businessId,
      // })

      // if (!businessRef) throw new Error(`The business account does't exist`)

      // finding employeeWallet capacity from employe acount
      const employee = await dispatch('getEmployeeById', currentUser?.uid)
      const employeeWalletAmount = await dispatch(
        'walletCapacity',
        currentUser?.uid
      )

      const { ...carbonTransaction } = new CarbonTransaction({
        EmployeeId: currentUser?.uid,
        BusinessId: payload.businessId,
        PriceAmount: payload.priceAmount,
        CarbonAmount: payload.carbonAmount,
        UniqueKey: payload.uniqueKey,
        CreatedDate,
        Employee: employee as UserType,
        paymentStatus: StatusState.PENDING,
      } as CarbonTransaction)

      console.log('carbonTransaction', carbonTransaction)

      // Create carbonTransaction
      await this.$fire.firestore
        .collection('carbonTransactions')
        .add(carbonTransaction)

      //  Reduction carbonCreditBalance from  user wallet
      const { id, ...wallet } = employeeWalletAmount
      if (wallet.carbonCreditBalance < payload?.carbonAmount)
        throw new Error(
          'The transaction carbon credit amount has lower value, to make transaction a user must have more carbon reductions'
        )
      wallet.carbonCreditBalance -= payload.carbonAmount
      await this.$fire.firestore.collection('wallet').doc(id).set(wallet)

      // Added carbonCreditBalance to business accouny
      // businessRef.CarbonCreditBalance += payload.Amount
      // await this.$fire.firestore
      //   .collection('business')
      //   .doc(businessRef.id)
      //   .set(businessRef)
    } catch (error) {
      logger.logError('Creating carbon transaction failed', {
        error,
      })
    }
  },

  // Finding All carbon Transaction history that is transact or processed in specific Business account
  async fetchAllCarbonTransaction({ dispatch, commit }) {
    try {
      const { ...businessRef } = await dispatch('getMyBusiness')
      const carbonTransactionCollecion = await this.$fire.firestore
        .collection('carbonTransactions')
        .where('BusinessId', '==', businessRef.id)
        .get()

      const carbonTransaction = [] as Array<CarbonTransaction>
      carbonTransactionCollecion.forEach((emission) => {
        carbonTransaction.push({ ...emission.data() } as CarbonTransaction)
      })

      commit('UPDATE_TRANSACTIONS', carbonTransaction)
    } catch (error) {
      logger.logError('Fetching carbon transactions failed', {
        error,
      })
    }
  },

  // To cretae Business Profile
  async createBusinessAccount(
    { dispatch },
    businessInformation: BusinessInformation
  ) {
    try {
      // finding all business and check businessOwnerid
      const business = await dispatch('fetchAllBusinessAcount')

      const businessProfileExists = _.filter(
        business,
        (buss) => buss.BusinessOwnerId === businessInformation.BusinessOwnerId
      )

      if (businessProfileExists) {
        logger.logError(`Creating business account allowed for one account`)
      }

      await this.$fire.firestore.collection('business').add(businessInformation)
      if (businessProfileExists) {
        logger.logError('Account already has a business profile.')
        return
      }

      await this.$fire.firestore
        .collection('business')
        .add(businessInformation.toJson())
    } catch (error) {
      logger.logError('Creating business account failed', {
        error,
      })
    }
  },

  // To find avaliable Business Accounts or profiles
  async fetchAllBusinessAcount({ commit }) {
    try {
      const businessCollection = await this.$fire.firestore
        .collection('business')
        .get()

      const business = [] as Array<BusinessInformation>

      businessCollection.forEach((buss) => {
        business.push({
          ...buss.data(),
        } as BusinessInformation)
      })

      commit('UPDATE_ALL_BUSINESS', business)
      return business
    } catch (error) {
      logger.logError('Fetching all business accounts failed', {
        error,
      })
    }
  },

  // To find my business account information
  async getBusinessInformation(_context) {
    try {
      const currentUser = this.$fire.auth.currentUser
      if (!currentUser) throw new Error('User not found!')

      const businessCollection = await this.$fire.firestore
        .collection('business')
        .where('BusinessOwnerId', '==', currentUser?.uid)
        .get()

      if (businessCollection.empty) return
      const businessDoc = businessCollection.docs[0]
      _context.commit('SET_BUSINESS_INFORMATION', {
        id: businessDoc.id,
        ...businessDoc.data(),
      })
      return { id: businessDoc.id, ...businessDoc.data() }
    } catch (error) {
      logger.logError('Fetching business information failed', {
        error,
      })
    }
  },

  async getBusinessLeaderboardRank({ dispatch, state, commit }) {
    try {
      let business: BusinessInformation | undefined
      if (state.myBusinessInformation === undefined) {
        business = await dispatch('getBusinessInformation')
      } else business = state.myBusinessInformation

      if (typeof business === 'undefined') return undefined

      const businessCollection = await this.$fire.firestore
        .collection('business')
        .get()
      const businesses: BusinessInformation[] = []
      businessCollection.forEach((businessDoc) =>
        businesses.push({
          id: businessDoc.id,
          ...businessDoc.data(),
        } as BusinessInformation)
      )

      const sortedInternationalBusinesses = _.sortBy(
        businesses,
        (b) => b.CarbonCreditBalance
      ).reverse()

      const sortedDomesticBusinesses = _.filter(
        sortedInternationalBusinesses,
        (b) => b.Location.Country === business!.Location.Country
      )

      const businessInternationalRank =
        _.findIndex(
          sortedInternationalBusinesses,
          (b) => b.id === business!.id
        ) + 1

      const businessDomesticRank =
        _.findIndex(sortedDomesticBusinesses, (b) => b.id === business!.id) + 1

      commit('SET_BUSINESS_LEADERBOARD_RANK', {
        leaderboard: {
          domestic: businessDomesticRank,
          international: businessInternationalRank,
        },
        country: GetCountry(business.Location.Country),
        carbonCoin: business.CarbonCreditBalance,
      })

      return {
        leaderboard: {
          domestic: businessDomesticRank,
          international: businessInternationalRank,
        },
        country: GetCountry(business.Location.Country),
        carbonCoin: business.CarbonCreditBalance,
      }
    } catch (err) {
      logger.logError('Fetching Business Leaderboard Ranking failed', {
        err,
      })
    }
  },

  // eslint-disable-next-line no-empty-pattern
  async getMyBusinessLeaderboard({ commit }) {
    const myLeaderboardRef = this.$fire.firestore
      .collection('businessLeaderboards')
      .where('creatorId', '==', this.$fire.auth.currentUser?.uid)
    const myLeaderboardSnapshot = await myLeaderboardRef.get()
    const myLeaderboard: any = []
    myLeaderboardSnapshot.forEach((leaderboard) =>
      myLeaderboard.push({ id: leaderboard.id, ...leaderboard.data() })
    )
    commit('SET_MY_BUSINESS_LEADERBOARD', myLeaderboard)
    return myLeaderboard
  },

  // eslint-disable-next-line no-empty-pattern
  async getMyDeptLeaderboard({ commit }) {
    const myLeaderboardRef = this.$fire.firestore
      .collection('departmentVsDepartment')
      .where('creatorId', '==', this.$fire.auth.currentUser?.uid)
    const myLeaderboardSnapshot = await myLeaderboardRef.get()
    let myLeaderboard: any = []
    myLeaderboardSnapshot.forEach((leaderboard) =>
      myLeaderboard.push({ id: leaderboard.id, ...leaderboard.data() })
    )
    myLeaderboard = myLeaderboard.reverse()
    commit('SET_MY_DEPT_LEADERBOARD', myLeaderboard)
    return myLeaderboard
  },

  async getTopBusinessLeaderboard({ dispatch, state, commit }) {
    const maxLeaderboard = 100
    const ConvertToRequired = (businesses: BusinessInformation[]) => {
      const convertedList = businesses
        .map((b) =>
          _.pick(b, [
            'Name',
            'Industry',
            'Location',
            'Employees',
            'CarbonCreditBalance',
          ])
        )
        .map((b) =>
          _.omit(
            {
              ...b,
              Country: b.Location.Country,
              EmployeeCount: b.Employees.length,
            },
            ['Employees', 'Location']
          )
        )
      return convertedList
    }

    try {
      let business: BusinessInformation | undefined
      if (state.myBusinessInformation === undefined) {
        business = await dispatch('getBusinessInformation')
      } else business = state.myBusinessInformation

      if (typeof business === 'undefined') return undefined

      const businessCollection = await this.$fire.firestore
        .collection('business')
        .get()
      const businesses: BusinessInformation[] = []
      businessCollection.forEach((businessDoc) =>
        businesses.push({
          id: businessDoc.id,
          ...businessDoc.data(),
        } as BusinessInformation)
      )
      // let sumUP = 0

      const sortedInternationalBusinesses = _.sortBy(
        businesses,
        (b) => b.CarbonCreditBalance
      ).reverse()

      const sortedDomesticBusinesses = _.filter(
        sortedInternationalBusinesses,
        (b) => b.Location.Country === business!.Location.Country
      )

      commit('SET_TOP_BUSINESS_LEADERBOARD', {
        domestic: _.take(
          ConvertToRequired(sortedDomesticBusinesses),
          maxLeaderboard
        ),
        international: _.take(
          ConvertToRequired(sortedInternationalBusinesses),
          maxLeaderboard
        ),
        private: [],
      })

      return {
        domestic: _.take(
          ConvertToRequired(sortedDomesticBusinesses),
          maxLeaderboard
        ),
        international: _.take(
          ConvertToRequired(sortedInternationalBusinesses),
          maxLeaderboard
        ),
        private: [],
      }
    } catch (err) {
      logger.logError('Fetching Business Leaderboard Ranking failed', {
        err,
      })
    }
  },

  async getBusinessbyId(_context, payload: { id: string }) {
    try {
      const business = await this.$fire.firestore
        .collection('business')
        .doc(payload.id)
        .get()
      return { ...business.data() }
    } catch (error) {
      logger.logError('Fetching business information failed', {
        error,
      })
    }
  },

  async getIternationalLeaderRanking(_context) {
    try {
      const businessCollection = await this.$fire.firestore
        .collection('business')
        .orderBy('CarbonCreditBalance', 'desc')
        .limit(100)
        .get()

      const businesses: any[] = []
      businessCollection.forEach((businessDoc) =>
        businesses.push({
          id: businessDoc.id,
          ...businessDoc.data(),
        })
      )

      return businesses
    } catch (error) {
      logger.logError('Fetching Iternational Leader ranking failed', {
        error,
      })
    }
  },

  async getLocalLeaderRanking(_context, payload: { location: string }) {
    try {
      const businessCollection = await this.$fire.firestore
        .collection('business')
        .where('location', '==', payload.location)
        .orderBy('CarbonCreditBalance', 'desc')
        .limit(100)
        .get()

      const businesses: any[] = []
      businessCollection.forEach((businessDoc) =>
        businesses.push({
          id: businessDoc.id,
          ...businessDoc.data(),
        })
      )

      return businesses
    } catch (error) {
      logger.logError('Fetching business information failed', {
        error,
      })
    }
  },

  // eslint-disable-next-line no-empty-pattern
  async removeEmployee({}, empData) {
    try {
      await this.$fire.firestore
        .collection('business')
        .doc(empData.businessId)
        .update({
          Employees: empData.employees,
        })
      return true
    } catch (ex) {
      return false
    }
  },

  async deleteLeaderboard({ commit, state }, leaderboardId) {
    // console.log('from store', leaderboardId);
    try {
      await this.$fire.firestore
        .collection('businessLeaderboards')
        .doc(leaderboardId)
        .delete()
      if (state.myBusinessLeaderboard) {
        const myBusLead: any[] = state.myBusinessLeaderboard as any[]
        const myNewLeaderboard = myBusLead.filter(
          (lead) => lead.id !== leaderboardId
        )
        commit('SET_MY_BUSINESS_LEADERBOARD', myNewLeaderboard)
      }
      return true
    } catch (ex) {
      console.log(ex)
      return false
    }
  },

  async deleteDeptLeaderboard({ commit, state }, leaderboardId) {
    // console.log('from store', leaderboardId);
    try {
      await this.$fire.firestore
        .collection('departmentVsDepartment')
        .doc(leaderboardId)
        .delete()
      if (state.myBusinessLeaderboard) {
        const myDeptLead: any[] = state.myDeptLeaderboard as any[]
        const updatedDeptLeaderboard = myDeptLead.filter(
          (lead) => lead.id !== leaderboardId
        )
        commit('SET_MY_DEPT_LEADERBOARD', updatedDeptLeaderboard)
      }
      return true
    } catch (ex) {
      console.log(ex)
      return false
    }
  },

  async updateDepartmentLeaderboard({}, leaderboarddata) {
    console.log('leaboard', leaderboarddata)
    try {
      await this.$fire.firestore
        .collection('departmentVsDepartment')
        .doc(leaderboarddata.id)
        .update({
          addedLeaderboards: leaderboarddata.addedLeaderboards,
        })
      return true
    } catch (ex) {
      console.log(ex)
      return false
    }
  },

  async removeLeaderboardFromDepartmentLeaderboard({ state, commit }, payload) {
    try {
      await this.$fire.firestore
        .collection('departmentVsDepartment')
        .doc(payload.deptLbId)
        .update({
          addedLeaderboards: firebase.firestore.FieldValue.arrayRemove(
            payload.lbId
          ),
        })
      console.log(`removed from its leaderboard ${payload}`)

      if (state.myDeptLeaderboard) {
        const index = state.myDeptLeaderboard.findIndex(
          (lb) => lb.id === payload.deptLbId
        )
        const storeDeptLeaderborad = state.myDeptLeaderboard as any[]
        console.log('store index', index)
        if (storeDeptLeaderborad[index].addedLeaderboards.length > 2) {
          await this.$fire.firestore
            .collection('departmentVsDepartment')
            .doc(payload.deptLbId)
            .update({
              addedLeaderboards: firebase.firestore.FieldValue.arrayRemove(
                payload.lbId
              ),
            })
          storeDeptLeaderborad[index].addedLeaderboards = storeDeptLeaderborad[
            index
          ].addedLeaderboards.filter((alb: any) => alb !== payload.lbId)
        } else {
          await this.$fire.firestore
            .collection('departmentVsDepartment')
            .doc(payload.deptLbId)
            .delete()
          storeDeptLeaderborad.splice(index, 1)
        }
        commit('SET_MY_DEPT_LEADERBOARD', storeDeptLeaderborad)
        console.log('store myDeptLead', state.myDeptLeaderboard)
      }
      return true
    } catch (ex) {
      console.log(ex)
      return false
    }
  },

  async updateBusinessAuctionStatus({ dispatch }) {
    try {
      const businessAuctionsRef = await this.$fire.firestore
        .collection('businessAuctions')
        .get()
      // const batch = this.$fire.firestore.batch()

      _.filter(businessAuctionsRef.docs, async (b) => {
        if (
          b.data().auctionEndDate < firebase.firestore.Timestamp.now() &&
          b.data().status === 1
        ) {
          const updateAuctionRef = await this.$fire.firestore
            .collection('businessAuctions')
            .doc(b.id)
          updateAuctionRef.update({ status: 0 })
          // batch.update(updateAuctionRef, { status: 0 })

          const businessDoc = await this.$fire.firestore
            .collection('business')
            .doc(b.data().businessId)
            .get()

          if (!businessDoc.exists) return

          const empCollection = [] as Array<any>
          b.data().bids.forEach((e: Object) => {
            empCollection.push(e)
          })
          const empBids = _.sortBy(empCollection, (o) => o.bidCarbon).reverse()

          if (empBids.length === 0)
            return await dispatch('createBusinessNotification', {
              link: `/business/dashboard/carbon/report?id=${
                (
                  await updateAuctionRef.get()
                ).id
              }`,
              empId: businessDoc.id,
              type: 7,
              message: `The bid, which started on the ${b
                .data()
                .auctionStartDate.toDate()
                .toLocaleString()}, was finished without the participation of any players.`,
            })

          /**
           * Finding the winner
           * at the first *Top level
           */

          for (let idx = 0; idx < 1; idx++) {
            if (
              typeof empBids[idx] !== 'undefined' &&
              typeof empBids[idx].uid !== 'undefined'
            ) {
              // Finding the user wallet to CC transaction
              const accountWalletRef = this.$fire.firestore
                .collection('wallet')
                .where('userId', '==', empBids[idx].uid)
                .limit(1)
              const accountWalletDocs = await accountWalletRef.get()

              if (accountWalletDocs.empty)
                return await dispatch('createBusinessNotification', {
                  link: `/business/dashboard/carbon/report?id=${
                    (
                      await updateAuctionRef.get()
                    ).id
                  }`,
                  empId: businessDoc.id,
                  type: 7,
                  message: `The bid, which started on the ${b
                    .data()
                    .auctionStartDate.toDate()
                    .toLocaleString()}, was unsuccessful since the carbon currency could not be transferred from the user due to a lack of a wallet.`,
                })

              const accountWallet = accountWalletDocs.docs[0].data()

              if (typeof empBids[idx].bidCarbon !== 'undefined') {
                if (accountWallet.carbonCreditBalance <= empBids[idx].bidCarbon)
                  return await dispatch('createBusinessNotification', {
                    link: `/business/dashboard/carbon/report?id=${
                      (
                        await updateAuctionRef.get()
                      ).id
                    }`,
                    empId: businessDoc.id,
                    type: 7,
                    message: `The bid, which started on the ${b
                      .data()
                      .auctionStartDate.toDate()
                      .toLocaleString()}, was not successful since there was insufficient CC amount in the winner's (${
                      empBids[idx].employeeName
                    }) wallet, and the carbon currency could not be transferred.`,
                  })

                // Reduce CC amount from user wallet
                accountWallet.carbonCreditBalance =
                  +accountWallet.carbonCreditBalance - +empBids[idx].bidCarbon
                await accountWalletDocs.docs[0].ref.update(accountWallet)
                // Add CC amount to business
                await this.$fire.firestore
                  .collection('business')
                  .doc(b.data().businessId)
                  .update({
                    ...businessDoc.data(),
                    CarbonCreditBalance:
                      +businessDoc.data()?.CarbonCreditBalance +
                      +empBids[idx].bidCarbon,
                  })
                // Create carbon transaction collectio to record the transaction processs
                const requestDoc = await this.$fire.firestore
                  .collection('carbonCreditTransaction')
                  .add({
                    amount: +empBids[idx].bidCarbon,
                    empName: empBids[idx].employeeName,
                    vender: b.data()?.vender,
                    price: b.data()?.price,
                    code: b.data()?.code,
                    receiverId: b.data().businessId,
                    senderId: empBids[idx].uid,
                    transactionDate: firebase.firestore.Timestamp.now(),
                  })

                await dispatch('checkWalletBalance', {
                  EmployeeId: empBids[0].uid,
                  BidCarbonAmount: empBids[0].bidCarbon,
                  status: 'remove',
                })

                // Congratulations push notification for employee
                await dispatch('createBusinessNotification', {
                  link: `/business/request?ct=${requestDoc.id}`,
                  empId: empBids[0].uid,
                  type: 6,
                  message: `Congratulations on winning the ${
                    businessDoc.data()?.Name
                  }-sponsored bid.`,
                })
                // The bid winner will be revealed - push notification for business
                await dispatch('createBusinessNotification', {
                  link: `/business/dashboard/carbon/report?id=${
                    (
                      await updateAuctionRef.get()
                    ).id
                  }`,
                  empId: businessDoc.id,
                  type: 7,
                  message: `The bid winner will be revealed. Winner's name: ${empBids[0].employeeName}`,
                })
              }
            }
          }
          // send notification were also for the remaining participant
          const uniqueEmployeeCollection = []
          for (let idx = 0; idx < empBids.length; idx++) {
            uniqueEmployeeCollection.push(empBids[idx].uid)
          }
          const filteredCollection = _.uniq(uniqueEmployeeCollection)

          for (let idx = 0; idx < filteredCollection.length; idx++) {
            // find users collection using the filteredCollection ID
            const employeeDoc = await this.$fire.firestore
              .collection('users')
              .doc(filteredCollection[idx])
              .get()

            const { ...empCollection } = employeeDoc.data()

            const requestDoc = await this.$fire.firestore
              .collection('carbonCreditTransaction')
              .add({
                amount: ` ${empBids[0].bidCarbon}`,
                empName: ` ${empBids[0].employeeName}`,
                vender: b.data()?.vender,
                price: b.data()?.price,
                code: null,
                receiverId: b.data().businessId,
                senderId: filteredCollection[idx],
                transactionDate: firebase.firestore.Timestamp.now(),
              })

            await dispatch('createBusinessNotification', {
              link: `/business/request?ct=${requestDoc.id}&status=2`,
              empId: filteredCollection[idx],
              type: 6,
              message: `Announcement of the winning bidder. ${
                businessDoc.data()?.Name
              } limited announces the result of bid winning for the CC auction.
              Name of the winner: ${empBids[0].employeeName}
              Bid winning value: ${empBids[0].bidCarbon} CC for ${
                b.data().price
              }Pounds worth gift card from ${b.data().vender}.
              Congratulations to the Winner!`,
            })
          }
        }
      })
    } catch (err) {
      logger.logError('Updating Business Auction Data failed', {
        err,
      })
    }
  },

  async closeBusinessAuction(
    { dispatch, state, commit },
    payload: { auctionId: string }
  ) {
    dispatch('fetchBusinessAuction')

    try {
      const businessAuction = _.find(
        state.businessAuctions,
        (businessAuction: any) => businessAuction.id === payload.auctionId
      )

      if (!businessAuction) throw new Error('Error')

      const businesAuctionsRef_ = await this.$fire.firestore
        .collection('businessAuctions')
        .doc(businessAuction.id)
      if (!businesAuctionsRef_) return null
      businesAuctionsRef_.update({ status: 0 })

      const businessDoc = await this.$fire.firestore
        .collection('business')
        .doc(businessAuction.businessId)
        .get()
      if (!businessDoc.exists) return

      const empCollection = [] as Array<any>
      businessAuction.bids.forEach((e: object) => {
        empCollection.push(e)
      })
      const empBids = _.sortBy(empCollection, (o) => o.bidCarbon).reverse()

      if (empBids.length === 0) {
        alert(
          `The bid, which started on the ${businessAuction.auctionStartDate
            .toDate()
            .toLocaleString()}, was finished without the participation of any players.`
        )
        return await dispatch('createBusinessNotification', {
          link: `/business/dashboard/carbon/report?id=${
            (
              await businesAuctionsRef_.get()
            ).id
          }`,
          empId: businessDoc.id,
          type: 7,
          message: `The bid, which started on the ${businessAuction.auctionStartDate
            .toDate()
            .toLocaleString()}, was finished without the participation of any players.`,
        })
      }

      if (
        typeof empBids[0] !== 'undefined' &&
        typeof empBids[0].uid !== 'undefined'
      ) {
        const accountWalletRef = this.$fire.firestore
          .collection('wallet')
          .where('userId', '==', empBids[0].uid)
          .limit(1)

        const accountWalletDocs = await accountWalletRef.get()
        if (accountWalletDocs.empty) {
          await dispatch('createBusinessNotification', {
            link: `/business/dashboard/carbon/report?id=${
              (
                await businesAuctionsRef_.get()
              ).id
            }`,
            empId: businessDoc.id,
            type: 7,
            message: `The bid, which began on the ${businessAuction.auctionStartDate
              .toDate()
              .toLocaleString()}, was unsuccessful since the carbon currency could not be transferred from the user due to a lack of a wallet.   
                `,
          })
          return alert(
            `The bid, which began on the ${businessAuction.auctionStartDate
              .toDate()
              .toLocaleString()}, was unsuccessful since the carbon currency could not be transferred from the user due to a lack of a wallet.   
                `
          )
        }

        const accountWallet = accountWalletDocs.docs[0].data()

        if (typeof empBids[0].bidCarbon !== 'undefined') {
          if (accountWallet.carbonCreditBalance <= empBids[0].bidCarbon) {
            await dispatch('createBusinessNotification', {
              link: `/business/dashboard/carbon/report?id=${
                (
                  await businesAuctionsRef_.get()
                ).id
              }`,
              empId: businessDoc.id,
              type: 7,
              message: `The bid, which began on the ${businessAuction.auctionStartDate
                .toDate()
                .toLocaleString()}, was not successful since there was insufficient CC amount in the winner's (${
                empBids[0].employeeName
              }) wallet, and the carbon currency could not be transferred.`,
            })
            return alert(
              `The bid, which began on the ${businessAuction.auctionStartDate
                .toDate()
                .toLocaleString()}, was not successful since there was insufficient CC amount in the winner's (${
                empBids[0].employeeName
              }) wallet, and the carbon currency could not be transferred.`
            )
          }

          accountWallet.carbonCreditBalance =
            +accountWallet.carbonCreditBalance - +empBids[0].bidCarbon
          await accountWalletDocs.docs[0].ref.update(accountWallet)

          await this.$fire.firestore
            .collection('business')
            .doc(businessAuction.businessId)
            .update({
              ...businessDoc.data(),
              CarbonCreditBalance:
                +businessDoc.data()?.CarbonCreditBalance +
                +empBids[0].bidCarbon,
            })

          await dispatch('checkWalletBalance', {
            EmployeeId: empBids[0].uid,
            BidCarbonAmount: empBids[0].bidCarbon,
            status: 'remove',
          })

          const requestDoc = await this.$fire.firestore
            .collection('carbonCreditTransaction')
            .add({
              amount: +empBids[0].bidCarbon,
              empName: empBids[0].employeeName,
              vender: businessAuction.vender,
              price: businessAuction.price,
              code: businessAuction.code,
              receiverId: businessAuction.businessId,
              senderId: empBids[0].uid,
              transactionDate: firebase.firestore.Timestamp.now(),
            })

          await dispatch('createBusinessNotification', {
            link: `/business/request?ct=${requestDoc.id}`,
            empId: empBids[0].uid,
            type: 6,
            message: `Congratulations on winning the ${
              businessDoc.data()?.Name
            } - sponsored bid.`,
          })

          await dispatch('createBusinessNotification', {
            link: `/business/dashboard/carbon/report?id=${
              (
                await businesAuctionsRef_.get()
              ).id
            }`,
            empId: businessDoc.id,
            type: 7,
            message: `The bid winner will be revealed. Winner's name: ${empBids[0].employeeName}`,
          })
        }
      }

      // send notification were also for the remaining participant
      const uniqueEmployeeCollection = []
      for (let idx = 0; idx < empBids.length; idx++) {
        uniqueEmployeeCollection.push(empBids[idx].uid)
      }
      const filteredCollection = _.uniq(uniqueEmployeeCollection)

      for (let idx = 0; idx < filteredCollection.length; idx++) {
        // find users collection using the filteredCollection ID
        const employeeDoc = await this.$fire.firestore
          .collection('users')
          .doc(filteredCollection[idx])
          .get()

        const { ...empCollection } = employeeDoc.data()

        const requestDoc = await this.$fire.firestore
          .collection('carbonCreditTransaction')
          .add({
            amount: ` ${empBids[0].bidCarbon}`,
            empName: ` ${empBids[0].employeeName}`,
            vender: businessAuction.vender,
            price: businessAuction.price,
            code: null,
            receiverId: businessAuction.businessId,
            senderId: filteredCollection[idx],
            transactionDate: firebase.firestore.Timestamp.now(),
          })

        // const requestDoc = await this.$fire.firestore
        //   .collection('carbonCreditTransaction')
        //   .add({
        //     amount: +0,
        //     empName: `${empCollection.firstName} ${empCollection.lastName}`,
        //     vender: businessAuction.vender,
        //     price: businessAuction.price,
        //     code: businessAuction.code,
        //     receiverId: businessAuction.businessId,
        //     senderId: filteredCollection[idx],
        //     transactionDate: firebase.firestore.Timestamp.now(),
        //   })

        await dispatch('createBusinessNotification', {
          link: `/business/request?ct=${requestDoc.id}&status=2`,
          empId: filteredCollection[idx],
          type: 6,
          message: `Announcement of the winning bidder. ${
            businessDoc.data()?.Name
          } limited announces the result of bid winning for the CC auction.
              Name of the winner: ${empBids[0].employeeName}
              Bid winning value: ${empBids[0].bidCarbon} CC for ${
            businessAuction.price
          }Pounds worth gift card from ${businessAuction.vender}.
              Congratulations to the Winner!`,
        })
      }

      commit('UPDATE_AUCTION_STATUS', { auctionId: businessAuction.id })
    } catch (err) {
      logErrorMsg('Error Closing Auction', {
        err,
      })
    }
  },

  /**
   * checkWalletBalance when bidding or Rebiding
   */
  async checkWalletBalance(
    _context,
    payload: { EmployeeId: string; BidCarbonAmount: number; status?: string }
  ) {
    try {
      const walletSnapshot = await this.$fire.firestore
        .collection('wallet')
        .where('userId', '==', payload.EmployeeId)
        .get()

      if (!walletSnapshot) throw new Error('User wallet doest exist')

      const accountWalletDocs = walletSnapshot.docs[0].data()

      switch (payload.status) {
        case 'new':
          accountWalletDocs.BidCarbonAmount =
            (accountWalletDocs.BidCarbonAmount +
              +payload.BidCarbonAmount) as number
          await walletSnapshot.docs[0].ref.update(accountWalletDocs)

          break
        case 'update':
          accountWalletDocs.BidCarbonAmount =
            (accountWalletDocs.BidCarbonAmount +
              +payload.BidCarbonAmount) as number
          await walletSnapshot.docs[0].ref.update(accountWalletDocs)
          console.log('Update', walletSnapshot.docs[0].data())
          break
        case 'remove':
          accountWalletDocs.BidCarbonAmount =
            accountWalletDocs.BidCarbonAmount - +payload.BidCarbonAmount
          await walletSnapshot.docs[0].ref.update(accountWalletDocs)
          console.log('Remove_Case', walletSnapshot.docs[0].data())
          break
        default:
          console.log('default Case')
      }
    } catch (error) {
      logger.logError('Getting wallet capacity failed', { error })
    }
  },
}
