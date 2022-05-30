/**
 * For logging a consistant message to the user.
 * @author Zablon Dawit <zablon@zeraftech.com>
 */

class Logger {
  owner: string

  constructor(owner: string) {
    this.owner = owner
  }

  logError(title: string, messages?: any) {
    // eslint-disable-next-line no-console
    console.error(`[${this.owner}]`, title, messages)

    if (messages?.err) throw messages?.err
  }
}

export default Logger
