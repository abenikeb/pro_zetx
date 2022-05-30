/**
 * Includes all util type definitions used in the project.
 *
 * @author Zablon Dawit <zablon@zeraftech.com>
 */

export interface Locaiton {
  city: string
  street: string
  borrow?: string
  state: string
  country: string
  postalCode: string
}

export class UserNotLoggedIn extends Error {
  constructor() {
    super('User not logged in')
  }
}
