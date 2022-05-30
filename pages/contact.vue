<template>
  <section
    class="
      w-full
      px-2
      py-8
      md:px-5
      flex flex-col
      md:flex-row md:items-start md:mt-5
    "
  >
    <div
      class="
        w-full
        md:w-1/2
        flex flex-col
        justify-start
        items-start
        px-6
        md:px-12
        py-6
      "
    >
      <h2 class="text-sm md:text-lg font-semibold">Contact Us</h2>
      <span class="mt-2 text-xs md:text-sm">
        We're happy to answer any question you have or if you need an additional
        information just message us using the form down below.
      </span>
      <div
        class="
          w-full
          flex flex-col
          justify-center
          items-center
          shadow-2xl
          bg-gray-100
          px-8
          py-3
          mb-2
        "
      >
        <form
          class="w-full px-0 md:px-10"
          action="https://form2channel.com"
          method="POST"
        >
          <div class="form-control w-full mt-4">
            <label class="label">
              <span class="label-text font-semibold">Your Name</span>
            </label>
            <input
              v-model="name"
              type="text"
              class="input input-bordered"
              required
            />
          </div>
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text mt-2 font-semibold">Your Email</span>
            </label>
            <input
              v-model="email"
              type="text"
              class="input input-bordered"
              required
            />
          </div>
          <div class="form-control w-full mb-4">
            <label class="label">
              <span class="label-text mt-2 font-semibold">Your Message</span>
            </label>
            <textarea
              v-model="message"
              class="textarea h-24 textarea-bordered"
              required
            ></textarea>
          </div>
          <button
            class="btn md:btn-wide btn-accent mb-4"
            @click.prevent="submitForm"
          >
            submit
          </button>
        </form>
      </div>
    </div>

    <div class="md:w-5/12 flex flex-col md:items-start py-12 px-5">
      <div class="flex flex-col md:flex-row justify-between m-6">
        <div class="flex flex-col justify-evenly px-8">
          <h2 class="text-sm md:text-lg text-accent font-semibold">Email:</h2>
          <span>walelgn@zeraftech.com</span>
          <span>abel@zeraftech.com</span>
        </div>
        <div class="flex flex-col px-8">
          <h2 class="text-sm md:text-lg text-accent font-semibold">TikTok:</h2>
          <a href="https://www.tiktok.com/@greencheddar21"
            ><span>@greencheddar21</span></a
          >
        </div>
      </div>
      <div class="flex flex-col px-12 mx-3 mb-6">
        <h2 class="text-sm md:text-lg text-accent font-semibold">Instagram:</h2>
        <a href="https://www.instagram.com/greencheddar21/"
          ><span class="">@greencheddar21</span></a
        >
      </div>
      <img src="~assets/images/illustration.jpg" alt="" class="rounded-xl" />
      <!-- <h2>Email</h2> -->
    </div>
  </section>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      name: '',
      email: '',
      message: '',
    }
  },
  methods: {
    submitForm() {
      const formData = [
        { key: 'formto_email', value: 'greencheddar21@gmail.com' },
        // { key: 'formto_googlesheet', value: 'walelgndagne@gmail.com' },
        { key: 'name', value: this.name },
        { key: 'email', value: this.email },
        { key: 'message', value: this.message },
      ]
      this.loading = true
      axios
        .post('https://showcase.api.linx.twenty57.net/Form2Channel', formData)
        .then((res) => {
          this.loading = false
          alert('Message sent! Thank you for reaching out.')

          this.$router.push('/')
        })
        .catch((err) => {
          this.loading = false
          alert('Something went wrong. Please try again.')
          console.log(err)
        })
    },
  },
}
</script>
