<template>
  <div class="container">
    <create-leaderboard-modal
      v-if="showCreateModal"
      @hidemodal="showCreateModal = false"
      @addedLeaderboard="addLeaderboard"
    />
    <create-department-leaderboard-modal
      v-if="showCreateModal2"
      :myLbs="myLeaderboards"
      @hidemodal="showCreateModal2 = false"
      @addedDepartmentLeaderboard="addDeptLeaderboard"
    />
    <div class="mb-6 mt-4">
      <h4 class="font-bold text-gray-600 text-3xl">
        <i
          class="icon icon-leaderboard bg-yellow-400"
          style="width: 1em; height: 1em"
        ></i>
        Leaderboards &amp; Challenges
      </h4>
      <hr />
    </div>
    <div class="tabs mt-4 hidden md:inline-block">
      <a
        ref="tab1"
        data-tab="1"
        class="tab tab-bordered tab-active"
        @click="handleTabClick"
        >International</a
      >
      <a ref="tab2" data-tab="2" class="tab" @click="handleTabClick"
        >Domestic ({{ local_country }})</a
      >
      <a
        ref="tab4"
        data-tab="4"
        class="tab bg-gray-50 text-gray-300"
        @click.prevent="handleTabClick"
        >Your Leaderboards</a
      >
      <a
        ref="tab3"
        data-tab="3"
        class="tab bg-gray-50 text-gray-300"
        @click.prevent="handleTabClick"
        >Team vs Team Leaderboard</a
      >
    </div>

    <div class="inline-block md:hidden">
      <select
        @change="leaderboardSelection($event)"
        name=""
        id=""
        class="select select-sm border-accent select-accent w-48"
      >
        <option value="international">International</option>
        <option value="domestic">Domestic ({{ local_country }})</option>
        <option value="private">Your Leaderboards</option>
        <option value="team">Team Vs Team</option>
      </select>
    </div>

    <div class="hidden md:inline-block">
      <div ref="page1">
        <h4 class="mt-4 font-bold text-gray-700">International Leaderboard</h4>

        <div class="recent-leaderboards">
          <div class="overflow-x-auto">
            <table class="table w-full">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Business Name</th>
                  <th>Country</th>
                  <th>Industry</th>
                  <th>Employees</th>
                  <th>Carbon Coin (CC)</th>
                </tr>
              </thead>
              <tbody v-if="leaderboards">
                <tr
                  v-for="(
                    businessLeaderboard, idx
                  ) in leaderboards.international"
                  :key="idx"
                >
                  <td>{{ idx + 1 }}</td>
                  <td>{{ businessLeaderboard.Name }}</td>
                  <td>{{ businessLeaderboard.Country }}</td>
                  <td>{{ businessLeaderboard.Industry }}</td>
                  <td>{{ businessLeaderboard.EmployeeCount }}</td>
                  <td>
                    {{ businessLeaderboard.CarbonCreditBalance.toFixed(2) }}
                  </td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr>
                  <td colspan="3" aria-colspan="3" class="ml-8">
                    Nothing to show from the leaderboard
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="recent-leaderboards-help">
            You can scroll left to view more.
          </div>
        </div>
      </div>
    </div>

    <div class="hidden md:inline-block">
      <div ref="page2" class="hidden">
        <h4 class="mt-4 font-bold text-gray-700">Domestic Leaderboard</h4>

        <div class="recent-leaderboards">
          <div class="overflow-x-auto">
            <table class="table w-full">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Business Name</th>
                  <th>Country</th>
                  <th>Industry</th>
                  <th>Employees</th>
                  <th>Carbon Coin (CC)</th>
                </tr>
              </thead>
              <tbody v-if="leaderboards">
                <tr
                  v-for="(businessLeaderboard, idx) in leaderboards.domestic"
                  :key="idx"
                >
                  <td>{{ idx + 1 }}</td>
                  <td>{{ businessLeaderboard.Name }}</td>
                  <td>{{ businessLeaderboard.Country }}</td>
                  <td>{{ businessLeaderboard.Industry }}</td>
                  <td>{{ businessLeaderboard.EmployeeCount }}</td>
                  <td>
                    {{ businessLeaderboard.CarbonCreditBalance.toFixed(2) }}
                  </td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr>
                  <td colspan="3" aria-colspan="3" class="ml-8">
                    Nothing to show from the leaderboard
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="recent-leaderboards-help">
            You can scroll left to view more.
          </div>
        </div>
      </div>
    </div>

    <div class="hidden md:inline-block">
      <div ref="page3" class="hidden">
        <!-- <div class="flex gap-x-4 place-items-center">
      </div> -->
        <h4 class="mt-4 font-bold text-gray-700">Team vs Team Leaderboard</h4>
        <div v-if="deleteDeptAlert" class="w-full text-white bg-green-500 my-7">
          <div
            class="
              md:container
              flex
              items-center
              justify-between
              px-6
              py-4
              mx-auto
            "
          >
            <div class="flex">
              <svg viewBox="0 0 40 40" class="w-6 h-6 fill-current">
                <path
                  d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z"
                ></path>
              </svg>

              <p class="mx-3 text-2xs md:text-base">
                Leaderboard deleted successfully!!!
              </p>
            </div>

            <button
              @click="closeDeptAlert"
              class="
                p-1
                transition-colors
                duration-200
                transform
                rounded-md
                hover:bg-opacity-25 hover:bg-gray-600
                focus:outline-none
              "
            >
              <svg
                class="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 18L18 6M6 6L18 18"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <div class="recent-leaderboards">
          <div class="overflow-x-auto">
            <table v-if="departmentLeaderboards.length" class="table w-full">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Department</th>
                  <th>Number of players</th>
                  <th>Prize</th>
                  <th>Monthly average points</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(deptLeaderboard, idx) in departmentLeaderboards"
                  :key="idx + 'A'"
                  class="cursor-pointer"
                  @click="
                    $router.push(
                      '/business/dashboard/leaderboard/leadvslead/' +
                        deptLeaderboard.id
                    )
                  "
                >
                  <td>{{ idx + 1 }}</td>
                  <td>{{ deptLeaderboard.name }}</td>
                  <td>{{ deptLeaderboard.addedLeaderboards.length }}</td>
                  <td>{{ deptLeaderboard.prize }}</td>
                  <td>
                    {{ deptLeaderboard.averagePoints.toFixed(2) }}
                  </td>
                  <td>
                    <img
                      src="~/assets/images/trash.svg"
                      class="opacity-70 p-2 cursor-pointer w-8"
                      @click.stop="removeDeptLeaderboard(deptLeaderboard.id)"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <div v-else>
              <tr>
                <td colspan="3" aria-colspan="3" class="ml-8">
                  You don't have any leaderboards to display. You can add
                  leaderboards by clicking the button below.
                </td>
              </tr>
            </div>
          </div>
          <div class="recent-leaderboards-help">
            You can scroll left to view more.
          </div>
        </div>
        <button
          class="
            transition
            duration-150
            bg-accent
            rounded-lg
            border border-white
            py-2
            px-3
            text-white
            hover:bg-white hover:text-accent hover:border-accent
            mt-4
          "
          @click="showCreateModal2 = true"
        >
          <i class="fa fa-plus pr-2" />
          Create leaderboard
        </button>
      </div>
    </div>

    <div class="hidden md:inline-block">
      <div ref="page4" class="hidden">
        <h4 class="mt-4 font-bold text-gray-700">Your business Leaderboards</h4>
        <!-- delete alert -->

        <div v-if="deleteAlert" class="w-full text-white bg-green-500 my-7">
          <div
            class="
              md:container
              flex
              items-center
              justify-between
              px-6
              py-4
              mx-auto
            "
          >
            <div class="flex">
              <svg viewBox="0 0 40 40" class="w-6 h-6 fill-current">
                <path
                  d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z"
                ></path>
              </svg>

              <p class="mx-3 text-2xs md:text-base">
                Leaderboard deleted successfully!!!
              </p>
            </div>

            <button
              class="
                p-1
                transition-colors
                duration-200
                transform
                rounded-md
                hover:bg-opacity-25 hover:bg-gray-600
                focus:outline-none
              "
              @click="closeAlert"
            >
              <svg
                class="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 18L18 6M6 6L18 18"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
        <div class="recent-leaderboards">
          <div class="overflow-x-auto">
            <table v-if="myLeaderboards.length" class="table w-full">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Department</th>
                  <th>Number of players</th>
                  <th>Prize</th>
                  <th>Monthly average points</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(businessLeaderboard, idx) in myLeaderboards"
                  :key="idx"
                  class="cursor-pointer hover:bg-accent hover:bg-opacity-20"
                  @click="
                    $router.push(
                      '/business/dashboard/leaderboard/' +
                        businessLeaderboard.id
                    )
                  "
                >
                  <td>{{ idx + 1 }}</td>
                  <td>{{ businessLeaderboard.name }}</td>
                  <td>{{ businessLeaderboard.players.length }}</td>
                  <td>{{ businessLeaderboard.prize }}</td>
                  <td>
                    {{ businessLeaderboard.averagePoints.toFixed(2) }}
                  </td>
                  <td>
                    <img
                      @click.stop="removeLeaderboard(businessLeaderboard.id)"
                      src="~/assets/images/trash.svg"
                      class="opacity-70 p-2 cursor-pointer w-8"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <div v-else>
              <tr>
                <td colspan="3" aria-colspan="3" class="ml-8">
                  You don't have any leaderboards to display. You can add
                  leaderboards by clicking the button below.
                </td>
              </tr>
            </div>
          </div>
          <div class="recent-leaderboards-help">
            You can scroll left to view more.
          </div>
        </div>
        <button
          class="
            transition
            duration-150
            bg-accent
            rounded-lg
            border border-white
            py-2
            px-3
            text-white
            hover:bg-white hover:text-accent hover:border-accent
            mt-4
          "
          @click="showCreateModal = true"
        >
          <i class="fa fa-plus pr-2" />
          Add a leaderboard
        </button>
      </div>
    </div>
    <!-- one -->
    <div
      v-if="selectedLeaderboard == 'international'"
      class="inline-block md:hidden"
    >
      <h4 class="mt-4 font-bold text-gray-700 underline">
        International Leaderboard
      </h4>

      <div class="recent-leaderboards">
        <div class="overflow-x-auto">
          <table class="table w-full">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Business Name</th>
                <th>Country</th>
                <th>Industry</th>
                <th>Employees</th>
                <th>Carbon Coin (CC)</th>
              </tr>
            </thead>
            <tbody v-if="leaderboards">
              <tr
                v-for="(businessLeaderboard, idx) in leaderboards.international"
                :key="idx"
              >
                <td>{{ idx + 1 }}</td>
                <td>{{ businessLeaderboard.Name }}</td>
                <td>{{ businessLeaderboard.Country }}</td>
                <td>{{ businessLeaderboard.Industry }}</td>
                <td>{{ businessLeaderboard.EmployeeCount }}</td>
                <td>
                  {{ businessLeaderboard.CarbonCreditBalance.toFixed(2) }}
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="3" aria-colspan="3" class="ml-8">
                  Nothing to show from the leaderboard
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="recent-leaderboards-help">
          You can scroll left to view more.
        </div>
      </div>
    </div>
    <!-- two -->
    <div
      class="inline-block md:hidden"
      v-if="selectedLeaderboard == 'domestic'"
    >
      <h4 class="mt-4 font-bold text-gray-700 underline">
        Domestic Leaderboard
      </h4>

      <div class="recent-leaderboards">
        <div class="overflow-x-auto">
          <table class="table w-full">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Business Name</th>
                <th>Country</th>
                <th>Industry</th>
                <th>Employees</th>
                <th>Carbon Coin (CC)</th>
              </tr>
            </thead>
            <tbody v-if="leaderboards">
              <tr
                v-for="(businessLeaderboard, idx) in leaderboards.domestic"
                :key="idx"
              >
                <td>{{ idx + 1 }}</td>
                <td>{{ businessLeaderboard.Name }}</td>
                <td>{{ businessLeaderboard.Country }}</td>
                <td>{{ businessLeaderboard.Industry }}</td>
                <td>{{ businessLeaderboard.EmployeeCount }}</td>
                <td>
                  {{ businessLeaderboard.CarbonCreditBalance.toFixed(2) }}
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="3" aria-colspan="3" class="ml-8">
                  Nothing to show from the leaderboard
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="recent-leaderboards-help">
          You can scroll left to view more.
        </div>
      </div>
    </div>
    <!-- three -->
    <div class="inline-block md:hidden" v-if="selectedLeaderboard == 'team'">
      <!-- <div class="flex gap-x-4 place-items-center">
      </div> -->
      <h4 class="mt-4 font-bold text-gray-700 underline">
        Team vs team Leaderboard
      </h4>
      <div v-if="deleteDeptAlert" class="w-full text-white bg-green-500 my-7">
        <div
          class="
            md:container
            flex
            items-center
            justify-between
            px-6
            py-4
            mx-auto
          "
        >
          <div class="flex">
            <svg viewBox="0 0 40 40" class="w-6 h-6 fill-current">
              <path
                d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z"
              ></path>
            </svg>

            <p class="mx-3 text-2xs md:text-base">
              Leaderboard deleted successfully!!!
            </p>
          </div>

          <button
            class="
              p-1
              transition-colors
              duration-200
              transform
              rounded-md
              hover:bg-opacity-25 hover:bg-gray-600
              focus:outline-none
            "
            @click="closeDeptAlert"
          >
            <svg
              class="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 18L18 6M6 6L18 18"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
      <div class="recent-leaderboards">
        <div class="overflow-x-auto">
          <table v-if="departmentLeaderboards.length" class="table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Department</th>
                <th>Number of players</th>
                <th>Prize</th>
                <th>Monthly average points</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(deptLeaderboard, idx) in departmentLeaderboards"
                :key="idx + 'A'"
                class="cursor-pointer"
                @click="
                  $router.push(
                    '/business/dashboard/leaderboard/leadvslead/' +
                      deptLeaderboard.id
                  )
                "
              >
                <td>{{ idx + 1 }}</td>
                <td>{{ deptLeaderboard.name }}</td>
                <td>{{ deptLeaderboard.addedLeaderboards.length }}</td>
                <td>{{ deptLeaderboard.prize }}</td>
                <td>
                  {{ deptLeaderboard.averagePoints.toFixed(2) }}
                </td>
                <td>
                  <img
                    src="~/assets/images/trash.svg"
                    class="opacity-70 p-2 cursor-pointer w-8"
                    @click.stop="removeDeptLeaderboard(deptLeaderboard.id)"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div v-else>
            <tr>
              <td colspan="3" aria-colspan="3" class="ml-8">
                You don't have any leaderboards to display. You can add
                leaderboards by clicking the button below.
              </td>
            </tr>
          </div>
        </div>
        <div class="recent-leaderboards-help">
          You can scroll left to view more.
        </div>
      </div>
      <button
        class="
          transition
          duration-150
          bg-accent
          rounded-lg
          border border-white
          py-2
          px-3
          text-white
          hover:bg-white hover:text-accent hover:border-accent
          mt-4
        "
        @click="showCreateModal2 = true"
      >
        <i class="fa fa-plus pr-2" />
        Create leaderboard
      </button>
    </div>
    <!-- four -->
    <div class="inline-block md:hidden" v-if="selectedLeaderboard == 'private'">
      <h4 class="mt-4 font-bold text-gray-700 underline">
        Your business Leaderboards
      </h4>
      <!-- delete alert -->

      <div v-if="deleteAlert" class="w-full text-white bg-green-500 my-7">
        <div
          class="
            md:container
            flex
            items-center
            justify-between
            px-6
            py-4
            mx-auto
          "
        >
          <div class="flex">
            <svg viewBox="0 0 40 40" class="w-6 h-6 fill-current">
              <path
                d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z"
              ></path>
            </svg>

            <p class="mx-3 text-2xs md:text-base">
              Leaderboard deleted successfully!!!
            </p>
          </div>

          <button
            @click="closeAlert"
            class="
              p-1
              transition-colors
              duration-200
              transform
              rounded-md
              hover:bg-opacity-25 hover:bg-gray-600
              focus:outline-none
            "
          >
            <svg
              class="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 18L18 6M6 6L18 18"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
      <div class="recent-leaderboards">
        <div class="overflow-x-auto">
          <table v-if="myLeaderboards.length" class="table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Department</th>
                <th>Number of players</th>
                <th>Prize</th>
                <th>Monthly average points</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(businessLeaderboard, idx) in myLeaderboards"
                :key="idx"
                class="cursor-pointer hover:bg-accent hover:bg-opacity-20"
                @click="
                  $router.push(
                    '/business/dashboard/leaderboard/' + businessLeaderboard.id
                  )
                "
              >
                <td>{{ idx + 1 }}</td>
                <td>{{ businessLeaderboard.name }}</td>
                <td>{{ businessLeaderboard.players.length }}</td>
                <td>{{ businessLeaderboard.prize }}</td>
                <td>
                  {{ businessLeaderboard.averagePoints.toFixed(2) }}
                </td>
                <td>
                  <img
                    @click.stop="removeLeaderboard(businessLeaderboard.id)"
                    src="~/assets/images/trash.svg"
                    class="opacity-70 p-2 cursor-pointer w-8"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div v-else>
            <tr>
              <td colspan="3" aria-colspan="3" class="ml-8">
                You don't have any leaderboards to display. You can add
                leaderboards by clicking the button below.
              </td>
            </tr>
          </div>
        </div>
        <div class="recent-leaderboards-help">
          You can scroll left to view more.
        </div>
      </div>
      <button
        class="
          transition
          duration-150
          bg-accent
          rounded-lg
          border border-white
          py-2
          px-3
          text-white
          hover:bg-white hover:text-accent hover:border-accent
          mt-4
        "
        @click="showCreateModal = true"
      >
        <i class="fa fa-plus pr-2" />
        Add a leaderboard
      </button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import _ from 'lodash'
import CreateLeaderboardModal from '~/components/business/CreateLeaderboardModal.vue'
import CreateDepartmentLeaderboardModal from '~/components/business/CreateDepartmentLeaderboardModal.vue'
export default Vue.extend({
  components: {
    CreateLeaderboardModal,
    CreateDepartmentLeaderboardModal,
  },
  data() {
    return {
      local_country: this.$store.state.auth.userData.location,
      business: undefined,
      businessRank: undefined,
      leaderboards: {
        international: [],
        domestic: [],
        private: [],
      },
      showCreateModal: false,
      showCreateModal2: false,
      myLeaderboards: [],
      departmentLeaderboards: [],
      deleteAlert: false,
      deleteDeptAlert: false,
      selectedLeaderboard: 'international',
      emissionsHistory: {},
    }
  },

  computed: {
    uid() {
      return this.$store.state.auth.authUser.uid
    },
  },

  async created() {
    this.$store.dispatch('loading/toggleLoading', true)
    if (this.$store.state.business.myBusinessInformation === undefined)
      this.business = await this.$store.dispatch(
        'business/getBusinessInformation'
      )
    else this.business = this.$store.state.business.myBusinessInformation

    if (this.$store.state.business.businessLeaderboardRanks === undefined)
      this.businessRank = await this.$store.dispatch(
        'business/getBusinessLeaderboardRank'
      )
    else this.businessRank = this.$store.state.business.businessLeaderboardRanks

    if (this.$store.state.business.topBusinessLeaderboard === undefined) {
      this.leaderboards = await this.$store.dispatch(
        'business/getTopBusinessLeaderboard'
      )
    } else this.leaderboards = this.$store.state.business.topBusinessLeaderboard

    let myLeaderboards
    if (this.$store.state.business.myBusinessLeaderboard === undefined) {
      myLeaderboards = await this.$store.dispatch(
        'business/getMyBusinessLeaderboard'
      )
    } else myLeaderboards = this.$store.state.business.myBusinessLeaderboard

    let myDeptLeaderboards = []
    if (this.$store.state.business.myDeptLeaderboard === undefined) {
      myDeptLeaderboards = await this.$store.dispatch(
        'business/getMyDeptLeaderboard'
      )
    } else myDeptLeaderboards = this.$store.state.business.myDeptLeaderboard

    let allEmissionsHistory
    if (this.$store.state.measure.allEmissionsHistory === undefined) {
      allEmissionsHistory = await this.$store.dispatch(
        'measure/getAllEmissionsHistory'
      )
    } else allEmissionsHistory = this.$store.state.measure.allEmissionsHistory

    //   const emissionsHistoryRef = this.$fire.firestore
    //     .collection('emissionsHistory')
    //     .orderBy('totalEmissions')
    //   const emissionsHistorySnapshot = await emissionsHistoryRef.get()
    const emissionsHistory = {}
    allEmissionsHistory.forEach((emission) => {
      if (
        emission.year === new Date().getFullYear() &&
        emission.month === new Date().getMonth() + 1
      )
        emissionsHistory[emission.uid] = {
          id: emission.id,
          ...emission,
        }
    })
    this.emissionsHistory = emissionsHistory
    myLeaderboards.forEach((myLeaderboard) => {
      let total = 0
      myLeaderboard.players.forEach((player) => {
        if (emissionsHistory[player])
          total += emissionsHistory[player].totalEmissions
      })
      if (myLeaderboard.players.length === 0) myLeaderboard.averagePoints = 0
      else myLeaderboard.averagePoints = total / myLeaderboard.players.length
    })
    myDeptLeaderboards.forEach((deptLeader) => {
      let averageTotal = 0
      deptLeader.addedLeaderboards.forEach((myLeaderboardId) => {
        const myLeaderboard = myLeaderboards.find(
          (l) => l.id === myLeaderboardId
        )
        averageTotal += myLeaderboard.averagePoints
      })
      if (deptLeader.addedLeaderboards.length === 0)
        deptLeader.averagePoints = 0
      else
        deptLeader.averagePoints =
          averageTotal / deptLeader.addedLeaderboards.length
    })
    this.myLeaderboards = myLeaderboards
    this.departmentLeaderboards = myDeptLeaderboards.reverse()
    this.sortMyLeaderboards()
    this.$store.dispatch('loading/toggleLoading', false)
  },

  methods: {
    sortMyLeaderboards() {
      this.myLeaderboards.sort((a, b) => a.averagePoints - b.averagePoints)
      this.myLeaderboards = this.myLeaderboards.reverse()
    },
    addLeaderboard(leaderboard) {
      let total = 0
      leaderboard.players.forEach((player) => {
        if (this.emissionsHistory[player])
          total += this.emissionsHistory[player].totalEmissions
      })
      if (leaderboard.players.length === 0) leaderboard.averagePoints = 0
      else leaderboard.averagePoints = total / leaderboard.players.length
      this.myLeaderboards.push(leaderboard)
      this.sortMyLeaderboards()
    },
    addDeptLeaderboard(lb) {
      let averageTotal = 0
      lb.addedLeaderboards.forEach((myLeaderboardId) => {
        const myLeaderboard = this.myLeaderboards.find(
          (l) => l.id === myLeaderboardId
        )
        averageTotal += myLeaderboard.averagePoints
      })
      if (lb.addedLeaderboards.length === 0) lb.averagePoints = 0
      else lb.averagePoints = averageTotal / lb.addedLeaderboards.length
      this.departmentLeaderboards.push(lb)
    },
    handleTabClick(e) {
      const vueSelf = this

      const ACTIVE_TAB_CLASS_BORDERED = 'tab-bordered'
      const ACTIVE_TAB_CLASS_ACTIVE = 'tab-active'

      const tabBtn = e.target
      const tabNum = tabBtn.getAttribute('data-tab')
      const tabRefs = _.keys(this.$refs).filter((key) => key.includes('tab'))
      const pageRefs = _.keys(this.$refs).filter((key) => key.includes('page'))

      // Exit if tabNumber not provided
      if (typeof tabNum === 'undefined') return

      const currentTab = tabRefs.find((key) => key.endsWith(tabNum))
      const currentPage = pageRefs.find((key) => key.endsWith(tabNum))
      const otherTabs = tabRefs.filter((key) => !key.endsWith(tabNum))
      const otherPages = pageRefs.filter((key) => !key.endsWith(tabNum))

      // Exit if currentTab not provided
      if (
        typeof currentTab === 'undefined' ||
        typeof currentPage === 'undefined'
      )
        return

      // Disable other tabs and pages
      otherTabs.forEach((key) => {
        const tabRef = vueSelf.$refs[key]
        tabRef.classList.remove('tab-bordered')
        tabRef.classList.remove(ACTIVE_TAB_CLASS_BORDERED)
      })
      otherPages.forEach((key) => {
        const tabRef = vueSelf.$refs[key]
        tabRef.classList.add('hidden')
      })

      // Enable the current tab and page
      const currentTabRef = this.$refs[currentTab]
      currentTabRef.classList.add(ACTIVE_TAB_CLASS_BORDERED)
      currentTabRef.classList.add(ACTIVE_TAB_CLASS_ACTIVE)

      const currentPageRef = this.$refs[currentPage]
      currentPageRef.classList.remove('hidden')
    },
    async removeLeaderboard(leaderboardId) {
      let deleteLeaderboard = false
      if (confirm('Are you sure you want to delete this leaderboard?')) {
        this.$store.dispatch('loading/toggleLoading', true)
        deleteLeaderboard = await this.$store.dispatch(
          'business/deleteLeaderboard',
          leaderboardId
        )
        this.myLeaderboards = this.myLeaderboards.filter(
          (leaderboard) => leaderboard.id !== leaderboardId
        )
        this.$store.dispatch('loading/toggleLoading', false)

        if (deleteLeaderboard) {
          this.deleteAlert = true
          // alert('Leaderboard deleted successfully!!!')
        } else {
          alert('Something went wrong while deleting the leaderboard')
        }
      }
    },
    async removeDeptLeaderboard(leaderboardId) {
      let deleteLeaderboard = false
      if (confirm('Are you sure you want to delete this leaderboard?')) {
        this.$store.dispatch('loading/toggleLoading', true)
        deleteLeaderboard = await this.$store.dispatch(
          'business/deleteDeptLeaderboard',
          leaderboardId
        )
        if (deleteLeaderboard) {
          this.departmentLeaderboards = this.departmentLeaderboards.filter(
            (lb) => lb.id !== leaderboardId
          )
          this.deleteDeptAlert = true
        } else {
          alert('Something went wrong while deleting')
        }
        this.$store.dispatch('loading/toggleLoading', false)
      }
    },
    async departmentLeaderboardChecker(leaderboardId) {
      const promises = []
      let updateLeaderboard = false
      this.departmentLeaderboards.forEach((leader, index) => {
        console.log('name', leader.name)
        if (leader.addedLeaderboards.includes(leaderboardId)) {
          // if (leader.addedLeaderboards.length > 2) {
          const updatePromise = this.$store
            .dispatch('business/removeLeaderboardFromDepartmentLeaderboard', {
              deptLbId: leader.id,
              lbId: leaderboardId,
            })
            .then((result) => {
              updateLeaderboard = result
            })
          promises.push(updatePromise)
        }
      })
      await Promise.all(promises)
      updateLeaderboard = true
      return updateLeaderboard
    },
    leaderboardSelection(event) {
      this.selectedLeaderboard = event.target.value
    },
    closeAlert() {
      this.deleteAlert = false
    },
    closeDeptAlert() {
      this.deleteDeptAlert = false
    },
  },
})
</script>

<style lang="scss" scoped>
.container {
  width: 80%;
  margin: 0 auto;
}

.leaderboard {
  @apply divide-x shadow-sm rounded-lg;
  display: flex;
  flex-direction: row;

  .inc-rank {
    @apply text-green-400;
  }

  .inc-rank::before {
    content: '↗︎';
    margin-right: 0.1em;
  }

  .dec-rank {
    @apply text-red-400;
  }

  .dec-rank::before {
    content: '↘︎';
    margin-right: 0.1em;
  }

  .disabled-rank {
    @apply text-gray-300;
    text-decoration: line-through;
  }

  .card {
    @apply border-t border-b
      rounded-none py-3 px-4;
    display: inline-flex;
    flex: 1 1 0%;
    flex-direction: column;
    gap: 0.3em;
    position: relative;

    * {
      line-height: 0;
    }

    &:first-child {
      @apply rounded-l-lg border-l;
    }

    &:last-child {
      @apply rounded-r-lg border-r;
    }

    .card-title {
      @apply text-xs text-gray-400
        font-light;
      padding-left: 0.2em;
      line-height: 0;
      margin-bottom: 0;
    }

    .card-value {
      @apply text-4xl text-gray-700 font-bold;
      text-transform: uppercase;
    }

    .card-desc {
      @apply text-xs font-light;
      line-height: 0;
      margin-bottom: 0;
    }

    .card-icon {
      position: absolute;
      top: 10%;
      right: 5%;
    }
  }

  .icon {
    display: inline-block;
    width: 2.5em;
    height: 2.5em;
    line-height: 0;
    mask-repeat: no-repeat;
    mask-position: center;
    mask-size: contain;

    &.icon-users {
      mask: url('~/assets/images/business/users-solid.svg');
    }

    &.icon-credit {
      mask: url('~/assets/images/business/carbon_credit.svg');
    }

    &.icon-globe {
      mask: url('~/assets/images/business/globe.svg');
    }

    &.icon-flag {
      mask: url('~/assets/images/business/flag-solid.svg');
    }

    &.icon-lock {
      mask: url('~/assets/images/business/lock-alt.svg');
    }

    &.icon-leaderboard {
      mask: url('~/assets/images/business/chess-queen.svg');
    }

    &.icon-exclamation {
      mask: url('~/assets/images/business/lock-alt.svg');

      /* Correcting height issue */
      .icon-flag {
        height: 2em !important;
      }
    }
  }
}

.tab {
  @apply text-gray-400;

  &.tab-active {
    @apply text-gray-900;
  }
}

.recent-leaderboards {
  @apply mt-2;

  thead {
    @apply bg-gray-100 border-none text-gray-700;
  }

  tbody {
    tr > th {
      background: #f9fafb !important;
    }
  }

  .recent-leaderboards-help {
    display: none;
  }

  * {
    @apply border-none divide-y-0 text-xs;
  }
}

@media screen and (max-width: 768px) {
  .page-container {
    width: 90%;
    margin: 0 auto;
  }

  .current-info {
    flex-direction: column;
  }

  .leaderboard {
    @apply divide-y divide-x border border-gray-200;
    flex-direction: column;

    .card {
      @apply border-none rounded-none border-gray-800;
    }

    .card:first-child {
      @apply rounded-tl-md rounded-tr-md rounded-l-none;
    }

    .card:last-child {
      @apply rounded-b-md rounded-r-none;
    }
    .icon {
      height: 2em;
      width: 2em;
    }

    .icon-flag {
      height: 1.7em;
      width: 1.7em;
    }
  }
  .recent-leaderboards {
    div {
      -ms-overflow-style: none;
      scrollbar-width: 0;
    }

    & > div::-webkit-scrollbar {
      display: none;
    }

    .recent-leaderboards-help {
      @apply text-gray-300;
      display: block;
    }
  }
}
</style>
