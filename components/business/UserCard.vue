<template>
  <div class="card">
    <div class="flex justify-start">
      <img
        src="~/assets/images/business/invis-user.png"
        alt="User Profile Picture"
      />

      <span>{{ user.fullname }}</span>
    </div>

    <div class="mx-3">
      <div>
        <span class="text-gray-400 text-xs">Email</span>
        <span class="text-gray-600 text-lg">{{ user.email }}</span>
      </div>
      <br />
    </div>

    <button class="add-user-btn" @click="handleAddBtn">Add User</button>
  </div>
</template>

<script lang="ts">
// eslint-disable-next-line import/named
import Vue, { PropType } from 'vue'

interface UserInformation {
  id: string
  username: string
  email: string
  fullname: string
  profilePicture?: string
}

export default Vue.extend({
  props: {
    user: {
      type: Object as PropType<UserInformation>,
      required: true,
      validator(user: UserInformation) {
        return !(!user.id && !user.username && !user.email && !user.fullname)
      },
    },
  },

  computed: {
    getProfilePicture(): string {
      return (
        this.user.profilePicture || '~/assets/images/business/invis-user.png'
      )
    },
  },

  methods: {
    handleAddBtn() {
      this.$emit('openRequestModal', { uid: this.user.id })
    },
  },
})
</script>

<style scoped>
.card {
  @apply border-t border-l border-r
    border-gray-400 border-opacity-30
    transition-shadow duration-300
    ease-in-out
    pt-2 rounded;
  width: 300px;
}

.card:hover {
  @apply shadow-md;
}

.card > div img {
  @apply m-3 p-1
    rounded border-gray-300 border-opacity-50;
  border-width: 2px;
  width: 3.5em;
  height: 3.5em;
}

.card > div span {
  @apply mt-3;
}

.card .add-user-btn {
  @apply bg-green-400 text-white text-sm py-1;
  text-transform: uppercase;
  margin-top: auto;
}

@media screen and (max-width: 768px) {
  .card {
    min-width: 270px;
    max-width: 300px;
  }
}
</style>
