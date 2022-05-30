<template>
  <div>
    <nav class="desktop-nav">
      <nuxt-link to="/" class="flex items-center text-xl font-bold text-accent">
        <img src="~/assets/images/logo.svg" class="w-10" alt="" />
        <h1 class="ml-3">GreenCheddar</h1>
      </nuxt-link>
      <div
        class="flex justify-center items-center text-gray-500 relative main-nav"
      >
        <nuxt-link
          exact
          class="mx-2 hover:text-black main-navitem"
          to="/dashboard"
          >Home</nuxt-link
        >
        <!-- market dropdown -->
        <!-- <nuxt-link
          id="marketplace"
          to="/market"
          class="mx-2 hover:text-black cursor-pointer main-navitem"
        >
          Market
        </nuxt-link> -->

        <!-- market dropdown -->
        <!-- <div v-if="showMarketDropdown" class="market-dropdown">
          <nuxt-link
            id="private"
            class="text-sm pb-2 text-gray-600 hover:text-black font-semibold"
            to="/market"
            @click="toggleMarketDropdown"
            >All categories</nuxt-link
          >
          <nuxt-link
            id="domestic"
            class="text-sm pb-2 text-gray-600 hover:text-black font-semibold"
            to="#"
            >Groceries</nuxt-link
          >

          <nuxt-link
            id="international"
            class="text-sm pb-2 text-gray-600 hover:text-black font-semibold"
            to="#"
            >Fashion</nuxt-link
          >

          <nuxt-link
            class="text-sm pb-2 text-gray-600 hover:text-black font-semibold"
            to="#"
            >Sell on GreenCheddar</nuxt-link
          >
        </div> -->

        <!-- <nuxt-link class="mx-2 hover:text-black" to="/">Offset</nuxt-link> -->
        <div class="relative">
          <div class="dropdown dropdown-end">
            <label
              tabindex="0"
              class="dropdown-button"
              @click="toggelNav = !toggelNav"
              >Leaderboard</label
            >
            <ul v-if="toggelNav" tabindex="1" class="dropdown-content">
              <li>
                <nuxt-link
                  id="private"
                  to="/leaderboard/private"
                  @click.native="toggelNav = !toggelNav"
                  >Private
                </nuxt-link>
              </li>
              <li>
                <nuxt-link
                  id="domestic"
                  to="/leaderboard/domestic"
                  @click.native="toggelNav = !toggelNav"
                  >Domestic
                </nuxt-link>
              </li>
              <li>
                <nuxt-link
                  id="international"
                  to="/leaderboard/international"
                  @click.native="toggelNav = !toggelNav"
                  >International
                </nuxt-link>
              </li>
              <!-- <li>
                <nuxt-link
                  id="business"
                  to="/leaderboard/business"
                  @click.native="toggelNav = !toggelNav"
                  >Businesses
                </nuxt-link>
              </li> -->
            </ul>
          </div>

          <!-- <nuxt-link
            id="leaderboard"
            class="mx-2 hover:text-black cursor-pointer main-navitem"
            to=""
            @click.native="toggleLeaderboardDropdown"
          >
            Leaderboard
          </nuxt-link> -->
        </div>

        <!-- <nuxt-link
          id="marketplace"
          to="/business"
          class="mx-2 hover:text-black cursor-pointer main-navitem"
        >
          Business
        </nuxt-link> -->
        <!-- <nuxt-link
          class="mx-2"
          :to="isBusiness ? '/business/dashboard' : '/business'"
          >Business</nuxt-link
        > -->
        <nuxt-link class="mx-2 font-semibold text-accent-focus" to="/gaiaverse"
          >Gaiaverse</nuxt-link
        >
      </div>
      <div class="flex justify-evenly items-center relative">
        <!-- notification icon -->
        <!-- <button
          id="notificationIcon"
          class="relative"
          @click="toggleNotificationDropdown"
        >
          <img
            src="~/assets/images/bell.svg"
            class="w-8 mr-4 opacity-40 hover:opacity-60"
            alt=""
          />
          <span
            v-if="numNotification"
            class="
              absolute
              -top-2
              right-1
              bg-red-600
              text-white
              px-2
              py-0.5
              rounded-full
              text-xs
            "
            >{{ numNotification }}</span
          >
        </button> -->

        <div class="dropdown dropdown-end">
          <label
            tabindex="0"
            class="dropdown-button relative"
            @click="toggelNav = !toggelNav"
            ><img
              src="~/assets/images/bell.svg"
              class="w-8 mr-4 opacity-40 hover:opacity-60"
              alt=""
            />
            <span
              v-if="numNotification"
              class="
                absolute
                top-4
                -right-8
                bg-red-600
                text-white
                ring-2 ring-white
                px-2
                py-0.5
                rounded-full
                text-xs
              "
              >{{ numNotification }}</span
            ></label
          >
          <ul
            v-if="toggelNav"
            tabindex="1"
            class="dropdown-content notification-dropdown"
          >
            <p class="dropdown-header-title">Notifications</p>

            <div
              v-for="notification in notifications"
              :key="notification.id"
              class="flex w-full"
            >
              <li>
                <div
                  v-if="
                    notification.type == 4 ||
                    notification.type == 5 ||
                    notification.type == 6
                  "
                  class="dorpdown-container"
                >
                  <img src="~/assets/images/business/bfk5.svg" />

                  <div>
                    <nuxt-link
                      :to="notification.link"
                      :class="
                        notification.status == 1
                          ? 'font-semibold text-gray-600'
                          : ''
                      "
                      @click.native="togelActiveNotify(notification.id)"
                    >
                      {{ notification.content }}
                    </nuxt-link>
                    <div class="text-gray-500 text-xs my-2">
                      {{
                        `${
                          typeof notification.dateTime === 'object'
                            ? timeSince(notification.dateTime.toDate())
                            : timeSince(new Date(notification.dateTime))
                        } ago`
                      }}
                    </div>
                  </div>

                  <img
                    :class="notification.status !== 1 && 'hidden'"
                    src="~/assets/images/business/Ellipse .svg"
                  />
                </div>

                <div
                  v-else-if="
                    notification.type === 'orderNotifications' &&
                    notification.receiverType === 'seller'
                  "
                  class="dorpdown-container"
                >
                  <img src="~/assets/images/business/bfk6.svg" />
                  <div>
                    <nuxt-link
                      :to="`/dashboard/product/manage/orderDetail?id=${notification.orderId}`"
                      class="text-xs text-black overflow-clip-ellipsis"
                      :class="
                        notification.status == 1
                          ? 'font-semibold text-gray-600'
                          : ''
                      "
                      @click.native="togelActiveNotify(notification.id)"
                    >
                      {{ notification.content }}
                    </nuxt-link>
                    <div class="text-gray-500 text-xs my-2">
                      {{
                        `${
                          typeof notification.dateTime === 'object'
                            ? timeSince(notification.dateTime.toDate())
                            : timeSince(new Date(notification.dateTime))
                        } ago`
                      }}
                    </div>
                  </div>
                  <img
                    :class="notification.status !== 1 && 'hidden'"
                    src="~/assets/images/business/Ellipse .svg"
                  />
                </div>

                <div
                  v-else-if="
                    notification.type === 'orderNotifications' &&
                    notification.receiverType === 'buyer'
                  "
                  class="dorpdown-container"
                >
                  <img src="~/assets/images/business/bfk6.svg" />
                  <div>
                    <nuxt-link
                      :to="`/dashboard/transaction/detail?orderId=${notification.orderId}`"
                      class="text-xs text-black overflow-clip-ellipsis"
                      :class="
                        notification.status == 1
                          ? 'font-semibold text-gray-600'
                          : ''
                      "
                      @click.native="togelActiveNotify(notification.id)"
                    >
                      {{ notification.content }}
                    </nuxt-link>
                    <div class="text-gray-500 text-xs my-2">
                      {{
                        `${
                          typeof notification.dateTime === 'object'
                            ? timeSince(notification.dateTime.toDate())
                            : timeSince(new Date(notification.dateTime))
                        } ago`
                      }}
                    </div>
                  </div>
                  <img
                    :class="notification.status !== 1 && 'hidden'"
                    src="~/assets/images/business/Ellipse .svg"
                  />
                </div>

                <div
                  v-else-if="notification.type == 1 || notification.type == 2"
                  class="dorpdown-container"
                >
                  <img src="~/assets/images/business/bfk6.svg" />
                  <div>
                    <nuxt-link
                      to="/notifications"
                      class="text-xs text-black overflow-clip-ellipsis"
                      @click.native="togelAllActiveNotify"
                    >
                      {{ notification.content }}
                    </nuxt-link>
                    <div class="text-gray-500 text-xs my-2">
                      {{
                        `${
                          typeof notification.dateTime === 'object'
                            ? timeSince(notification.dateTime.toDate())
                            : timeSince(new Date(notification.dateTime))
                        } ago`
                      }}
                    </div>
                  </div>

                  <img
                    :class="notification.status !== 1 && 'hidden'"
                    src="~/assets/images/business/Ellipse .svg"
                  />
                </div>
              </li>
            </div>
            <span
              v-if="loadedNotification"
              class="
                text-blue-600
                hover:text-blue-800
                cursor-pointer
                hover:underline
                text-center
                mt-2
              "
            >
              <nuxt-link to="/notifications" @click="togelAllActiveNotify"
                >All Notifications</nuxt-link
              >
            </span>
            <span
              v-else
              class="text-red-400 hover:text-red-800 text-center mt-2"
            >
              You have no notifications
            </span>
          </ul>
        </div>
        <!-- notification dropdown -->
        <div v-if="showNotificationDropdown" class="notification-dropdown">
          <p class="dropdown-header-title">Notifications</p>

          <div
            v-for="notification in notifications"
            :key="notification.id"
            class="flex w-full"
          >
            <div
              v-if="
                notification.type == 4 ||
                notification.type == 5 ||
                notification.type == 6
              "
              class="dorpdown-container"
            >
              <img src="~/assets/images/business/bfk5.svg" />

              <div>
                <nuxt-link
                  :to="notification.link"
                  :class="
                    notification.status == 1
                      ? 'font-semibold text-gray-600'
                      : ''
                  "
                  @click.native="togelActiveNotify(notification.id)"
                >
                  {{ notification.content }}
                </nuxt-link>
                <div class="text-gray-500 text-xs my-2">
                  {{
                    `${
                      typeof notification.dateTime === 'object'
                        ? timeSince(notification.dateTime.toDate())
                        : timeSince(new Date(notification.dateTime))
                    } ago`
                  }}
                </div>
              </div>

              <img
                :class="notification.status !== 1 && 'hidden'"
                src="~/assets/images/business/Ellipse .svg"
              />
            </div>

            <div
              v-else-if="
                notification.type === 'orderNotifications' &&
                notification.receiverType === 'seller'
              "
              class="dorpdown-container"
            >
              <img src="~/assets/images/business/bfk6.svg" />
              <div>
                <nuxt-link
                  :to="`/dashboard/product/manage/orderDetail?id=${notification.orderId}`"
                  class="text-xs text-black overflow-clip-ellipsis"
                  :class="
                    notification.status == 1
                      ? 'font-semibold text-gray-600'
                      : ''
                  "
                  @click.native="togelActiveNotify(notification.id)"
                >
                  {{ notification.content }}
                </nuxt-link>
                <div class="text-gray-500 text-xs my-2">
                  {{
                    `${
                      typeof notification.dateTime === 'object'
                        ? timeSince(notification.dateTime.toDate())
                        : timeSince(new Date(notification.dateTime))
                    } ago`
                  }}
                </div>
              </div>
              <img
                :class="notification.status !== 1 && 'hidden'"
                src="~/assets/images/business/Ellipse .svg"
              />
            </div>

            <div
              v-else-if="
                notification.type === 'orderNotifications' &&
                notification.receiverType === 'buyer'
              "
              class="dorpdown-container"
            >
              <img src="~/assets/images/business/bfk6.svg" />
              <div>
                <nuxt-link
                  :to="`/dashboard/transaction/detail?orderId=${notification.orderId}`"
                  class="text-xs text-black overflow-clip-ellipsis"
                  :class="
                    notification.status == 1
                      ? 'font-semibold text-gray-600'
                      : ''
                  "
                  @click.native="togelActiveNotify(notification.id)"
                >
                  {{ notification.content }}
                </nuxt-link>
                <div class="text-gray-500 text-xs my-2">
                  {{
                    `${
                      typeof notification.dateTime === 'object'
                        ? timeSince(notification.dateTime.toDate())
                        : timeSince(new Date(notification.dateTime))
                    } ago`
                  }}
                </div>
              </div>
              <img
                :class="notification.status !== 1 && 'hidden'"
                src="~/assets/images/business/Ellipse .svg"
              />
            </div>

            <div
              v-else-if="notification.type == 1 || notification.type == 2"
              class="dorpdown-container"
            >
              <img src="~/assets/images/business/bfk6.svg" />
              <div>
                <nuxt-link
                  to="/notifications"
                  class="text-xs text-black overflow-clip-ellipsis"
                  @click.native="togelAllActiveNotify"
                >
                  {{ notification.content }}
                </nuxt-link>
                <div class="text-gray-500 text-xs my-2">
                  {{
                    `${
                      typeof notification.dateTime === 'object'
                        ? timeSince(notification.dateTime.toDate())
                        : timeSince(new Date(notification.dateTime))
                    } ago`
                  }}
                </div>
              </div>

              <img
                :class="notification.status !== 1 && 'hidden'"
                src="~/assets/images/business/Ellipse .svg"
              />
            </div>

            <!-- <span
              v-else
              class="
                text-x
                flex flex-row
                gap-2
                items-center
                justify-start
                my-2s
              "
              :class="notification.status == 1 ? 'font-bold' : ''"
            >
              <img
                src="~/assets/images/product/settings_up.svg"
                class="w-4"
                alt=""
              />
              {{ notification.content }}
            </span> -->
            <!-- <i
              class="fa fa-close close-icon"
              @click="dismissNotification(notification.id)"
            ></i> -->
          </div>
          <span
            v-if="loadedNotification"
            class="
              text-blue-600
              hover:text-blue-800
              cursor-pointer
              hover:underline
              text-center
              mt-2
            "
          >
            <nuxt-link to="/notifications" @click="togelAllActiveNotify"
              >All Notifications</nuxt-link
            >
          </span>
          <span v-else class="text-red-400 hover:text-red-800 text-center mt-2">
            You have no notifications
          </span>
        </div>

        <!-- Account icon(user full name) -->
        <!-- <button
          id="account"
          class="btn btn-accent btn-sm rounded-full"
          @click="toggleDropdown"
        >
          <span class="fa fa-user mr-2"></span>
          <span v-if="user">
            {{ user.firstName + ' ' + user.lastName }}
          </span>
          <span v-else> Account </span>
        </button> -->

        <div class="dropdown dropdown-end">
          <label
            id="account"
            tabindex="0"
            class="btn btn-accent btn-sm rounded-full"
            @click="toggelNav = !toggelNav"
            ><span class="fa fa-user mr-2"></span>
            <span v-if="user">
              {{ user.firstName + ' ' + user.lastName }}
            </span>
            <span v-else> Account </span></label
          >
          <ul v-if="toggelNav" tabindex="1" class="dropdown-content">
            <li>
              <nuxt-link
                to="/dashboard/settings"
                @click.native="toggelNav = !toggelNav"
              >
                <p>Account settings</p>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                v-if="classifier"
                to="/classifier"
                @click.native="toggelNav = !toggelNav"
              >
                <p>Switch to Classifier</p>
              </nuxt-link>
            </li>
            <!-- <li>
              <nuxt-link
                to="/business/auction"
                @click.native="toggelNav = !toggelNav"
              >
                Invitation to Bid
              </nuxt-link>
            </li> -->
            <li class="cursor-pointer">
              <span @click="signOut">Sign out </span>
            </li>
          </ul>
        </div>

        <!-- Account dropdown -->
        <div v-if="showDropdown" class="account-dropdown">
          <!-- <nuxt-link
            class="text-sm pb-2 text-gray-600 hover:text-black font-semibold"
            to="/home"
            >Profile</nuxt-link
          > -->
          <nuxt-link
            class="text-sm pb-2 text-gray-600 hover:text-black font-semibold"
            to="/dashboard/settings"
            >Account settings</nuxt-link
          >
          <nuxt-link
            v-if="classifier"
            class="
              text-sm
              pb-2
              text-yellow-600
              hover:text-yellow-800
              font-semibold
            "
            to="/classifier"
            >Switch to Classifier</nuxt-link
          >
          <!-- <nuxt-link
            class="
              text-sm
              pb-2
              text-green-600
              hover:text-green-800
              font-semibold
            "
            to="/business/auction"
            >Invitation to Bid</nuxt-link
          > -->
          <span
            class="
              text-sm
              pb-2
              text-red-600
              hover:text-red-800
              font-semibold
              cursor-pointer
            "
            @click="signOut"
            >Sign out</span
          >
        </div>
      </div>
    </nav>

    <nav class="mobile-nav">
      <nuxt-link to="/" class="flex items-center text-xl font-bold text-accent">
        <img src="~/assets/images/logo.svg" class="w-10" alt="" />
      </nuxt-link>
      <div class="flex justify-center items-center relative">
        <!-- <button
          id="notificationIcon"
          class="relative"
          @click="toggleNotificationDropdown"
        >
          <img
            src="~/assets/images/bell.svg"
            class="w-8 mr-4 opacity-40 hover:opacity-60"
            alt=""
          />
          <span
            v-if="numNotification"
            class="
              absolute
              -top-2
              right-2
              bg-red-600
              text-white
              px-2
              py-0.5
              ring-2 ring-white
              rounded-full
              text-xs
            "
            >{{ numNotification }}</span
          >
        </button> -->
        <div class="dropdown dropdown-end">
          <label
            tabindex="0"
            class="dropdown-button relative"
            @click="toggelNav = !toggelNav"
            ><img
              src="~/assets/images/bell.svg"
              class="w-7 mr-4 opacity-40 hover:opacity-60"
              alt=""
            />
            <span
              v-if="numNotification"
              class="
                absolute
                top-4
                -right-8
                bg-red-600
                text-white
                ring-2 ring-white
                px-2
                py-0.5
                rounded-full
                text-xs
              "
              >{{ numNotification }}</span
            ></label
          >
          <ul
            v-if="toggelNav"
            tabindex="1"
            class="dropdown-content notification-dropdown"
          >
            <p class="dropdown-header-title">Notifications</p>

            <div
              v-for="notification in notifications"
              :key="notification.id"
              class="flex w-full"
            >
              <li>
                <div
                  v-if="
                    notification.type == 4 ||
                    notification.type == 5 ||
                    notification.type == 6
                  "
                  class="dorpdown-container"
                >
                  <img src="~/assets/images/business/bfk5.svg" />

                  <div>
                    <nuxt-link
                      :to="notification.link"
                      :class="
                        notification.status == 1
                          ? 'font-semibold text-gray-600'
                          : ''
                      "
                      @click.native="togelActiveNotify(notification.id)"
                    >
                      {{ notification.content }}
                    </nuxt-link>
                    <div class="text-gray-500 text-xs my-2">
                      {{
                        `${
                          typeof notification.dateTime === 'object'
                            ? timeSince(notification.dateTime.toDate())
                            : timeSince(new Date(notification.dateTime))
                        } ago`
                      }}
                    </div>
                  </div>

                  <img
                    :class="notification.status !== 1 && 'hidden'"
                    src="~/assets/images/business/Ellipse .svg"
                  />
                </div>

                <div
                  v-else-if="
                    notification.type === 'orderNotifications' &&
                    notification.receiverType === 'seller'
                  "
                  class="dorpdown-container"
                >
                  <img src="~/assets/images/business/bfk6.svg" />
                  <div>
                    <nuxt-link
                      :to="`/dashboard/product/manage/orderDetail?id=${notification.orderId}`"
                      class="text-xs text-black overflow-clip-ellipsis"
                      :class="
                        notification.status == 1
                          ? 'font-semibold text-gray-600'
                          : ''
                      "
                      @click.native="togelActiveNotify(notification.id)"
                    >
                      {{ notification.content }}
                    </nuxt-link>
                    <div class="text-gray-500 text-xs my-2">
                      {{
                        `${
                          typeof notification.dateTime === 'object'
                            ? timeSince(notification.dateTime.toDate())
                            : timeSince(new Date(notification.dateTime))
                        } ago`
                      }}
                    </div>
                  </div>
                  <img
                    :class="notification.status !== 1 && 'hidden'"
                    src="~/assets/images/business/Ellipse .svg"
                  />
                </div>

                <div
                  v-else-if="
                    notification.type === 'orderNotifications' &&
                    notification.receiverType === 'buyer'
                  "
                  class="dorpdown-container"
                >
                  <img src="~/assets/images/business/bfk6.svg" />
                  <div>
                    <nuxt-link
                      :to="`/dashboard/transaction/detail?orderId=${notification.orderId}`"
                      class="text-xs text-black overflow-clip-ellipsis"
                      :class="
                        notification.status == 1
                          ? 'font-semibold text-gray-600'
                          : ''
                      "
                      @click.native="togelActiveNotify(notification.id)"
                    >
                      {{ notification.content }}
                    </nuxt-link>
                    <div class="text-gray-500 text-xs my-2">
                      {{
                        `${
                          typeof notification.dateTime === 'object'
                            ? timeSince(notification.dateTime.toDate())
                            : timeSince(new Date(notification.dateTime))
                        } ago`
                      }}
                    </div>
                  </div>
                  <img
                    :class="notification.status !== 1 && 'hidden'"
                    src="~/assets/images/business/Ellipse .svg"
                  />
                </div>

                <div
                  v-else-if="notification.type == 1 || notification.type == 2"
                  class="dorpdown-container"
                >
                  <img src="~/assets/images/business/bfk6.svg" />
                  <div>
                    <nuxt-link
                      to="/notifications"
                      class="text-xs text-black overflow-clip-ellipsis"
                      @click.native="togelAllActiveNotify"
                    >
                      {{ notification.content }}
                    </nuxt-link>
                    <div class="text-gray-500 text-xs my-2">
                      {{
                        `${
                          typeof notification.dateTime === 'object'
                            ? timeSince(notification.dateTime.toDate())
                            : timeSince(new Date(notification.dateTime))
                        } ago`
                      }}
                    </div>
                  </div>

                  <img
                    :class="notification.status !== 1 && 'hidden'"
                    src="~/assets/images/business/Ellipse .svg"
                  />
                </div>
              </li>
            </div>
            <span
              v-if="loadedNotification"
              class="
                text-blue-600
                hover:text-blue-800
                cursor-pointer
                hover:underline
                text-center
                mt-2
              "
            >
              <nuxt-link to="/notifications" @click="togelAllActiveNotify"
                >All Notifications</nuxt-link
              >
            </span>
            <span
              v-else
              class="text-red-400 hover:text-red-800 text-center mt-2"
            >
              You have no notifications
            </span>
          </ul>
        </div>
        <div v-if="!sidenavActive" @click="sidenavActive = true">
          <i class="fa fa-bars text-accent text-3xl"></i>
        </div>
        <div v-else @click="sidenavActive = false">
          <i class="fa fa-times text-accent text-3xl"></i>
        </div>
        <div
          v-if="showNotificationDropdown"
          class="md:hidden notification-dropdown"
        >
          <p class="dropdown-header-title">Notifications</p>
          <div
            v-for="notification in notifications"
            :key="notification.id"
            class="flex w-full justify-between border-b"
          >
            <div
              v-if="
                notification.type == 4 ||
                notification.type == 5 ||
                notification.type == 6
              "
              class="dorpdown-container"
            >
              <img src="~/assets/images/business/bfk5.svg" />

              <div>
                <nuxt-link
                  :to="notification.link"
                  :class="
                    notification.status == 1
                      ? 'font-semibold text-gray-600'
                      : ''
                  "
                  @click.native="togelActiveNotify(notification.id)"
                >
                  {{ notification.content }}
                </nuxt-link>
                <div class="text-gray-500 text-xs my-2">
                  {{
                    `${
                      typeof notification.dateTime === 'object'
                        ? timeSince(notification.dateTime.toDate())
                        : timeSince(new Date(notification.dateTime))
                    } ago`
                  }}
                </div>
              </div>

              <img
                :class="notification.status !== 1 && 'hidden'"
                src="~/assets/images/business/Ellipse .svg"
              />
            </div>

            <div
              v-else-if="
                notification.type === 'orderNotifications' &&
                notification.receiverType === 'seller'
              "
              class="dorpdown-container"
            >
              <img src="~/assets/images/business/bfk6.svg" />
              <div>
                <nuxt-link
                  :to="`/dashboard/product/manage/orderDetail?id=${notification.orderId}`"
                  class="text-xs text-black overflow-clip-ellipsis"
                  :class="
                    notification.status == 1
                      ? 'font-semibold text-gray-600'
                      : ''
                  "
                  @click.native="togelActiveNotify(notification.id)"
                >
                  {{ notification.content }}
                </nuxt-link>
                <div class="text-gray-500 text-xs my-2">
                  {{
                    `${
                      typeof notification.dateTime === 'object'
                        ? timeSince(notification.dateTime.toDate())
                        : timeSince(new Date(notification.dateTime))
                    } ago`
                  }}
                </div>
              </div>
              <img
                :class="notification.status !== 1 && 'hidden'"
                src="~/assets/images/business/Ellipse .svg"
              />
            </div>

            <div
              v-else-if="
                notification.type === 'orderNotifications' &&
                notification.receiverType === 'buyer'
              "
              class="dorpdown-container"
            >
              <img src="~/assets/images/business/bfk6.svg" />
              <div>
                <nuxt-link
                  :to="`/dashboard/transaction/detail?orderId=${notification.orderId}`"
                  class="text-xs text-black overflow-clip-ellipsis"
                  :class="
                    notification.status == 1
                      ? 'font-semibold text-gray-600'
                      : ''
                  "
                  @click.native="togelActiveNotify(notification.id)"
                >
                  {{ notification.content }}
                </nuxt-link>
                <div class="text-gray-500 text-xs my-2">
                  {{
                    `${
                      typeof notification.dateTime === 'object'
                        ? timeSince(notification.dateTime.toDate())
                        : timeSince(new Date(notification.dateTime))
                    } ago`
                  }}
                </div>
              </div>
              <img
                :class="notification.status !== 1 && 'hidden'"
                src="~/assets/images/business/Ellipse .svg"
              />
            </div>

            <div
              v-else-if="notification.type == 1 || notification.type == 2"
              class="dorpdown-container"
            >
              <img src="~/assets/images/business/bfk6.svg" />
              <div>
                <nuxt-link
                  to="/notifications"
                  class="text-xs text-black overflow-clip-ellipsis"
                  @click.native="togelAllActiveNotify"
                >
                  {{ notification.content }}
                </nuxt-link>
                <div class="text-gray-500 text-xs my-2">
                  {{
                    `${
                      typeof notification.dateTime === 'object'
                        ? timeSince(notification.dateTime.toDate())
                        : timeSince(new Date(notification.dateTime))
                    } ago`
                  }}
                </div>
              </div>

              <img
                :class="notification.status !== 1 && 'hidden'"
                src="~/assets/images/business/Ellipse .svg"
              />
            </div>

            <!-- <nuxt-link
              v-if="notification.type == 4"
              :to="notification.link"
              :class="notification.status == 1 ? 'font-bold' : ''"
              class="mb-2 text-xs text-blue-400 underline decoration-1"
            >
              {{ notification.content }}
            </nuxt-link>
            <span
              v-else
              :class="notification.status == 1 ? 'font-bold' : ''"
              class="mb-2 text-xs"
              >{{ notification.content }}</span
            >
            <i
              class="fa fa-close close-icon"
              @click="dismissNotification(notification.id)"
            ></i> -->
          </div>
          <span
            v-if="loadedNotification"
            class="
              text-blue-600
              hover:text-blue-800
              cursor-pointer
              hover:underline
              text-center
              mt-2
            "
          >
            <nuxt-link to="/notifications" @click="togelAllActiveNotify"
              >All Notifications</nuxt-link
            >
          </span>
          <span v-else class="text-red-400 text-sm text-center mt-2">
            You have no notifications
          </span>
        </div>
      </div>
    </nav>

    <div v-if="sidenavActive" class="sidenav">
      <div
        class="
          w-full
          flex flex-col
          justify-start
          items-center
          border-b-2
          mb-5
          pb-2
        "
      >
        <div class="text-center">
          <div
            class="
              mx-auto
              w-14
              h-14
              overflow-hidden
              rounded-full
              border-2 border-accent
              shadow-lg
            "
          >
            <img
              class="w-full h-full bg-accent bg-opacity-20"
              :src="
                user ? `https://robohash.org/${user.email}.png?set=set3` : ''
              "
            />
          </div>
          <h1 v-if="user" class="text-xl my-1 font-semibold">
            {{ user.firstName + ' ' + user.lastName }}
          </h1>
        </div>
        <div class="w-full flex items-center justify-between">
          <nuxt-link
            class="text-sm px-3 py-1 bg-accent border text-white rounded-box"
            to="/dashboard/settings"
            @click.native="sidenavActive = false"
          >
            Account
          </nuxt-link>
          <button
            class="text-sm px-3 py-1 bg-accent border text-white rounded-box"
            @click="signOut"
          >
            Sign out
          </button>
        </div>
        <div
          v-if="profileTrackerFinal !== 100"
          class="w-full flex flex-col justify-start items-center"
        >
          <div class="w-full flex items-center mt-5 gap-x-2">
            <div class="w-full">
              <progress-bar :val="profileTrackerFinal" />
            </div>
            <h1 class="font-bold text-sm">{{ profileTrackerFinal }}%</h1>
          </div>
          <nuxt-link
            to="/dashboard/settings"
            @click.native="sidenavActive = false"
          >
            <h1
              class="
                w-full
                text-center text-sm
                font-bold
                text-accent
                hover:underline
                mt-2
                cursor-pointer
              "
            >
              Complete profile
            </h1>
          </nuxt-link>
        </div>
      </div>
      <nuxt-link
        class="text-lg mb-2"
        to="/"
        @click.native="sidenavActive = false"
        >Home</nuxt-link
      >
      <!-- <nuxt-link
        class="text-lg mb-2"
        to="/market"
        @click.native="sidenavActive = false"
        >Marketplace</nuxt-link
      > -->
      <h1
        class="text-lg mb-1"
        @click="expandLeaderboards = !expandLeaderboards"
      >
        Leaderboards
        <span v-if="expandLeaderboards" class="fa fa-chevron-up text-xs"></span>
        <span v-else class="fa fa-chevron-down text-xs"></span>
      </h1>
      <div
        v-if="expandLeaderboards"
        class="
          ml-2
          mb-2
          flex flex-col
          justify-start
          items-start
          text-sm text-gray-600
        "
      >
        <nuxt-link
          to="/leaderboard/private"
          @click.native="
            () => {
              sidenavActive = false
              expandLeaderboards = false
            }
          "
          >Private</nuxt-link
        >
        <nuxt-link
          to="/leaderboard/domestic"
          @click.native="
            () => {
              sidenavActive = false
              expandLeaderboards = false
            }
          "
          >Domestic</nuxt-link
        >
        <nuxt-link
          to="/leaderboard/international"
          @click.native="
            () => {
              sidenavActive = false
              expandLeaderboards = false
            }
          "
          >International</nuxt-link
        >
        <nuxt-link
          to="/leaderboard/business"
          @click.native="
            () => {
              sidenavActive = false
              expandLeaderboards = false
            }
          "
          >Business</nuxt-link
        >
      </div>
      <!-- <nuxt-link class="text-lg mb-2" to="/business">Business</nuxt-link> -->
      <nuxt-link class="text-lg mb-2" to="/gaiaverse">Gaiaverse</nuxt-link>
    </div>

    <div
      v-if="sidenavActive"
      class="bg-black bg-opacity-50 fixed top-0 left-0 z-40 w-screen h-screen"
      @click="sidenavActive = false"
    ></div>
  </div>
</template>

<script>
import ProgressBar from '~/components/classifier/Progress.vue'
export default {
  components: {
    ProgressBar,
  },
  data() {
    return {
      expandLeaderboards: false,
      sidenavActive: false,
      showDropdown: false,
      showMarketDropdown: false,
      showNotificationDropdown: false,
      showLeaderboardDropdown: false,
      notifications: [],
      classifier: false,
      isBusiness: null,
      loadedNotification: true,
      toggelNav: false,
    }
  },

  computed: {
    user() {
      return this.$store.state.auth.userData
    },
    numNotification() {
      let numNotification = 0
      this.notifications.forEach((not) =>
        not.status === 1 ? (numNotification += 1) : numNotification
      )
      return numNotification
    },

    currentRoute() {
      return this.$route.path
    },
    profileTrackerFinal() {
      return this.$store.state.auth.profileTracker
    },
  },

  watch: {
    currentRoute() {
      this.showDropdown = false
      this.showMarketDropdown = false
      this.showNotificationDropdown = false
      this.showLeaderboardDropdown = false
      this.toggelNav = false
    },
  },

  async created() {
    const counter = 5
    const roles = this.$store.state.auth.userData.roles || []
    if (roles.includes('classifier')) {
      this.classifier = true
    }
    // trying to retrieve users notification when a user activates the dropdown
    await this.$store.dispatch('notification/getUserNotificationAction')

    const sortedNotifications =
      this.$store.state.notification.notifications.sort((a, b) =>
        a.dateTime.seconds < b.dateTime.seconds ? 1 : -1
      )

    sortedNotifications.slice(0, counter).forEach((notification) => {
      this.notifications.push(notification)
      // if (counter > 0) {
      //   this.notifications.push(notification)
      //   counter -= 1
      // }
    })

    if (sortedNotifications.length === 0) this.loadedNotification = false

    this.isBusiness = this.$store.state.auth.userData.roles.includes('business')
    // To only show a limited number of notifications
    // this.notifications = this.$store.state.notification.notifications.slice(
    //   0,
    //   1
    // )
  },
  methods: {
    // toggles the account dropdown
    toggleDropdown() {
      this.showDropdown = !this.showDropdown
    },
    // toggles the market dropdown
    toggleMarketDropdown() {
      this.showMarketDropdown = !this.showMarketDropdown
    },

    toggleLeaderboardDropdown() {
      this.showLeaderboardDropdown = !this.showLeaderboardDropdown
    },

    // toggles the notification dropdown
    toggleNotificationDropdown() {
      this.showNotificationDropdown = !this.showNotificationDropdown
      // const batch = this.$fire.firestore.batch()
      // this.$store.state.notification.notifications.forEach((notification) => {
      //   if (notification.status === 1) {
      //     const notificationRef = this.$fire.firestore
      //       .collection('notifications')
      //       .doc(notification.id)
      //     batch.update(notificationRef, { status: 2 })
      //   }
      // })
      // await batch.commit().then(() => {
      //   setTimeout(() => {
      //     this.notifications.forEach((notification) => {
      //       notification.status = 2
      //     })
      //   }, 2000)
      // })
    },

    // This methods gets called when the user wants to logout
    signOut() {
      this.$fire.auth.signOut()
      setTimeout(() => {
        this.$store.commit('dashboard/CLEAR_STATE')
      }, 1000)
    },

    // dismiss the new notification from the notification dropdown
    dismissNotification(notificationId) {
      this.$store.dispatch(
        'notification/dismissNotificationAction',
        notificationId
      )
      for (let i = 0; i < this.notifications.length; i++) {
        if (this.notifications[i].id === notificationId) {
          this.notifications.splice(i, 1)
        }
      }
    },

    async togelActiveNotify(notificationId) {
      const batch = this.$fire.firestore.batch()
      this.$store.state.notification.notifications.forEach((notification) => {
        if (notification.id === notificationId) {
          const notificationRef = this.$fire.firestore
            .collection('notifications')
            .doc(notification.id)
          batch.update(notificationRef, { status: 2 })
        }
      })
      await batch.commit().then(() => {
        this.notifications.forEach((notification) => {
          if (notification.id === notificationId) notification.status = 2
        })
      })
    },

    async togelAllActiveNotify() {
      const batch = this.$fire.firestore.batch()
      this.$store.state.notification.notifications.forEach((notification) => {
        if (notification.status === 1) {
          const notificationRef = this.$fire.firestore
            .collection('notifications')
            .doc(notification.id)
          batch.update(notificationRef, { status: 2 })
        }
      })
      await batch.commit().then(() => {
        setTimeout(() => {
          this.notifications.forEach((notification) => {
            notification.status = 2
          })
        }, 2000)
      })
    },

    timeSince(date) {
      const seconds = Math.floor((new Date() - date) / 1000)

      let interval = seconds / 31536000

      if (interval > 1) {
        return Math.floor(interval) + ' years'
      }
      interval = seconds / 2592000
      if (interval > 1) {
        return Math.floor(interval) + ' months'
      }
      interval = seconds / 86400
      if (interval > 1) {
        return Math.floor(interval) + ' days'
      }
      interval = seconds / 3600
      if (interval > 1) {
        return Math.floor(interval) + ' hours'
      }
      interval = seconds / 60
      if (interval > 1) {
        return Math.floor(interval) + ' minutes'
      }
      return Math.floor(seconds) + ' seconds'
    },
  },
}
</script>

<style scoped>
nav {
  @apply w-full px-16 flex justify-between items-center h-14 shadow-md bg-white fixed top-0 left-0 z-50;
}

#account:hover .account-dropdown {
  display: flex;
}

.main-navitem {
  @apply opacity-60;
}

.main-nav > a.nuxt-link-active {
  @apply opacity-100 font-semibold;
}

.account-dropdown {
  @apply z-50 flex flex-col justify-center items-start py-2 px-4 w-40 bg-white border-2 shadow-md rounded-lg absolute top-12 -left-4 overflow-y-auto;
}

.leaderboard-dropdown {
  @apply z-50 flex flex-col justify-center items-start py-2 px-4 w-40 bg-white border-2 shadow-md rounded-lg absolute top-12 -left-4 overflow-y-auto;
}

.market-dropdown,
.leaderboard-dropdown {
  @apply z-50 flex flex-col justify-center items-center py-2 w-48 bg-white border-2 shadow-md rounded-lg absolute top-12 -left-12 overflow-y-auto;
}

.notification-dropdown {
  @apply z-50 flex flex-col justify-center items-center py-2 w-48 bg-white border-2 rounded-lg absolute top-12 -left-44 overflow-y-auto;
}

.notification-dropdown {
  @apply divide-y divide-y-reverse;
  width: 390px;
}

.notification-dropdown .dropdown-header-title {
  @apply text-lg font-bold mb-2 text-gray-700;
}

.notification-dropdown .dorpdown-container {
  @apply flex flex-row gap-3 items-center justify-start px-3 flex-nowrap;
}

.notification-dropdown .dropdown-active {
  @apply bg-white;
}

.notification-dropdown .dorpdown-container img:first-child {
  @apply w-6 opacity-60;
}

.notification-dropdown .dorpdown-container img:last-child {
  @apply w-5;
}

.notification-dropdown .dorpdown-container a {
  @apply my-2 text-sm  text-black overflow-clip-ellipsis flex-1;
  /* width: 100% !important; */
}

.overflow-clip-ellipsis {
  width: 300px;
  padding: 2px 1px;
  /* Both of the following are required for text-overflow */
  white-space: nowrap;
  overflow: hidden;
  display: -webkit-box !important;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  white-space: normal;
}

.dropdown .dropdown-button {
  @apply font-light normal-case  m-1 cursor-pointer text-gray-400  hover:text-gray-600;
}

.dropdown .dropdown-button:focus {
  @apply text-gray-600 font-bold;
}

.dropdown ul {
  @apply menu p-2  bg-white rounded-box mt-5;
  min-width: 14em;
  max-width: 40em;
}

.dropdown li {
  @apply bg-white hover:bg-gray-100 my-1 rounded-xl;
}

.new-notifications {
  @apply text-gray-800 text-sm pb-2 cursor-pointer hover:text-gray-600;
}

.close-icon {
  @apply text-gray-400 cursor-pointer hover:text-gray-800;
}

.desktop-nav {
  @apply hidden sm:flex;
}

.mobile-nav {
  @apply w-full md:hidden px-5 box-border;
}

.sidenav {
  @apply w-3/5 md:hidden fixed rounded-lg top-14 right-0 bg-white shadow text-gray-800 z-50 flex flex-col justify-start items-start p-5;
  animation: slidein 0.4s forwards;
}

.animate-slide-down {
  animation: slidein 0.4s forwards;
}

@keyframes slidein {
  0% {
    transform: translateY(-100px);
    opacity: 0;
  }
  100% {
    transform: translateY(0px);
    opacity: 1;
  }
}

@media screen and (max-width: 760px) {
  .notification-dropdown {
    @apply text-sm divide-y divide-y-reverse pr-3 absolute top-12 -left-52;
    width: 282px;
  }

  .notification-dropdown .dropdown-header-title {
    @apply font-bold text-gray-700;
  }

  .notification-dropdown .dorpdown-container {
    @apply flex flex-row px-2 gap-2 items-center justify-start flex-nowrap;
  }

  .notification-dropdown .dropdown-active {
    @apply bg-white;
  }

  .notification-dropdown .dorpdown-container img:first-child {
    @apply w-5 opacity-60 mx-1;
  }

  .notification-dropdown .dorpdown-container img:last-child {
    @apply w-3;
  }

  .notification-dropdown .dorpdown-container a {
    @apply my-2 flex-1;
    /* width: 100% !important; */
  }

  .overflow-clip-ellipsis {
    width: 200px;
    padding: 2px 0px;
    /* Both of the following are required for text-overflow */
    white-space: nowrap;
    overflow: hidden;
    display: -webkit-box !important;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    white-space: normal;
  }
}
</style>
