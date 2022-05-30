<template>
  <div>
    <div v-if="pageLoading" class="text-xl text-gray-600 font-bold">
      Please wait...
    </div>

    <div v-else-if="alreadyVerified" class="text-xl text-gray-600 font-bold">
      Your account is already verified.
    </div>

    <form
      v-else
      method="POST"
      action="https://zrf-temp-pp-1.herokuapp.com/connect/create"
      @submit="handleSubmit"
    >
      <h3 class="text-xl text-gray-700 mb-3">Setup Payments Here.</h3>
      <p>
        Enter your email or use your account email to for your payment setup.
        Once you have setup your stripe payment account, you can recieve your
        payment.
      </p>

      <div class="form-control email-input">
        <label class="label">
          <span class="label-text">Email</span>
        </label>
        <input
          ref="emailInput"
          type="text"
          placeholder="Enter your email here."
          :value="useremail"
          required
        />
      </div>

      <div class="email-check">
        <input
          ref="emailCheck"
          type="checkbox"
          checked="checked"
          class="checkbox checkbox-xs rounded-sm checkbox-accent"
        />

        <span class="">Use Account Email</span>
      </div>

      <input ref="postUserId" type="hidden" name="userid" :value="userid" />
      <input
        ref="postEmail"
        type="hidden"
        name="useremail"
        :value="useremail"
      />

      <button ref="setupBtn" type="submit" disabled class="setup-btn">
        <svg
          v-if="loading"
          class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>

        <span>Setup Account</span>
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      userid: undefined as undefined | string,
      useremail: undefined as undefined | string,
      loading: true,
      alreadyVerified: false,
      pageLoading: true,
    }
  },

  async created() {
    await this.initUserInfo()
  },

  updated() {
    if (this.pageLoading) return

    this.loading = false
    const setupBtn = document.getElementsByClassName(
      'setup-btn'
    )[0] as HTMLButtonElement
    setupBtn?.removeAttribute('disabled')

    const emailCheckInput = this.$refs.emailCheck as HTMLInputElement
    const emailInput = this.$refs.emailInput as HTMLInputElement
    const postEmail = this.$refs.postEmail as HTMLInputElement

    emailCheckInput?.addEventListener('change', () => {
      if (!emailCheckInput.checked) return

      postEmail.value = emailInput.value
    })

    emailCheckInput?.addEventListener('change', () => {
      if (emailCheckInput.checked) {
        if (typeof this.useremail === 'undefined')
          throw new Error('User email undefined')

        postEmail.value = this.useremail ?? ''
        emailInput.value = this.useremail ?? ''
      } else {
        emailInput.value = ''
      }
    })
  },

  methods: {
    async initUserInfo() {
      const userInfo = await this.$store.state.auth.authUser
      const userId = this.$fire.auth.currentUser?.uid

      if (typeof userId === 'undefined') {
        throw new TypeError('User id can not be undefined')
      }

      this.userid = userId
      this.useremail = userInfo.email

      this.alreadyVerified = !(
        await this.$fire.firestore
          .collection('marketplaceSeller')
          .where('userId', '==', userId)
          .limit(1)
          .get()
      ).empty

      this.pageLoading = false
    },

    handleSubmit() {
      this.loading = true
      const setupBtn = this.$refs.setupBtn as HTMLButtonElement
      const setupBtnText = setupBtn.getElementsByTagName('span')[0]
      const userIdPost = this.$refs.postUserId as HTMLInputElement

      if (typeof this.userid === 'undefined') {
        throw new TypeError("User id can't be undefined")
      }

      userIdPost.value = this.userid ?? ''

      setupBtn.setAttribute('disabled', 'disabled')
      setupBtnText.innerText = 'Please wait...'
    },
  },
})
</script>

<style scoped>
form {
  @apply mx-4;
}

form p {
  @apply text-gray-600 text-sm;
}

.setup-btn {
  @apply btn-sm
    rounded border-none bg-green-400
    text-white;

  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  min-height: unset;
  height: unset;
  line-height: unset;
  padding-bottom: 0.5em;
  padding-top: 0.5em;
}

.setup-btn * {
  line-height: unset;
  height: unset;
  min-height: unset;
}

.setup-btn:disabled {
  @apply bg-gray-300 hover:bg-gray-300 cursor-default ring-4 ring-gray-300 ring-opacity-50;
}

.setup-btn:hover {
  @apply bg-green-500;
}

.email-input {
  @apply mb-2;
  max-width: 60%;
}

.email-input .label-text {
  @apply text-gray-400 font-bold text-2xs;
}

.email-input > input {
  @apply input rounded border-2 border-green-200;
}

.email-input > input:focus {
  @apply border-green-300;
}

.email-input > input::placeholder {
  @apply text-gray-300;
}

.email-check {
  @apply flex flex-row items-center gap-1 my-2;
}

.email-check * {
  line-height: unset;
}

.email-check span {
  @apply text-gray-500 text-sm;
}

@media screen and (max-width: 768px) {
  .email-input {
    max-width: unset;
  }
}
</style>
