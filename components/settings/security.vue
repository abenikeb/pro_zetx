<template>
  <div class="max-w-sm w-full space-y-2">
    <div>
      <form class="space-y-4" @submit.prevent="resetPassword">
        <input type="hidden" name="remember" value="true" />
        <div class="rounded-md shadow-sm -space-y-px">
          <!-- <div class="mb-2">
            <label for="old-password" class="text-black">Old Password</label>
            <input
              id="old-password"
              v-model="passwords.old"
              name="old-password"
              type="password"
              required
              autocomplete="off"
              class="
                appearance-none
                rounded-none
                relative
                block
                w-full
                px-3
                py-2
                border border-gray-300
                placeholder-gray-500
                text-gray-900
                rounded-t-md
                focus:outline-none
                focus:ring-accent
                focus:border-accent
                focus:z-10
                sm:text-sm
              "
              placeholder="Old Password"
            />
          </div> -->
          <div class="mb-2 pb-2">
            <label for="new-password" class="text-black">New Password</label>
            <input
              id="new-password"
              v-model="passwords.new"
              name="new-password"
              type="password"
              required
              autocomplete="off"
              class="
                appearance-none
                rounded-none
                relative
                block
                w-full
                px-3
                py-2
                border border-gray-300
                placeholder-gray-500
                text-gray-900
                rounded-t-md
                focus:outline-none
                focus:ring-accent
                focus:border-accent
                focus:z-10
                sm:text-sm
              "
              placeholder="New Password"
            />
          </div>
          <div class="mb-2 pb-2">
            <label for="confirm-password" class="text-black"
              >Confirm Password</label
            >
            <input
              id="confirm-password"
              v-model="passwords.confirm"
              name="confirm-password"
              type="password"
              required
              autocomplete="off"
              class="
                appearance-none
                rounded-none
                relative
                block
                w-full
                px-3
                py-2
                border border-gray-300
                placeholder-gray-500
                text-gray-900
                rounded-t-md
                focus:outline-none
                focus:ring-accent
                focus:border-accent
                focus:z-10
                sm:text-sm
              "
              placeholder="Confirm Password"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="
              group
              relative
              w-full
              flex
              justify-center
              py-2
              px-4
              border border-transparent
              text-sm
              font-medium
              rounded-md
              text-white
              bg-accent
              hover:bg-accent
              focus:outline-none
              focus:ring-2
              focus:ring-offset-2
              focus:ring-accent
            "
          >
            Reset Password
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      userData: null,
      passwords: {
        old: '',
        new: '',
        confirm: '',
      },
    }
  },
  created() {
    // console.log(this.$store.state.auth.userData)
    if (!this.userData) {
      this.userData = { ...this.$store.state.auth.userData }
    }
  },

  methods: {
    resetPassword() {
      if (this.passwords.new.length < 6) {
        return alert('Password must be at least 6 characters long')
      } else if (this.passwords.new !== this.passwords.confirm) {
        return alert('Passwords do not match')
      } else {
        const user = this.$fire.auth.currentUser
        user
          .updatePassword(this.passwords.new)
          .then(() => {
            alert('Password updated successfully')
          })
          .catch((error) => {
            alert(error.message)
          })
      }
    },
  },
})
</script>
