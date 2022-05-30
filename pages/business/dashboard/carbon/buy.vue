<template>
  <div class="relative">
    <!-- Back Button -->
    <div class="absolute top-2 left-4">
      <nuxt-link
        to="/business/dashboard/carbon"
        class="text-sm font-bold text-accent flex items-center gap-1"
      >
        <!-- :class="getStarted && 'hidden'" -->
        <div class="mask-back">
          <img class="" alt="" />
        </div>
      </nuxt-link>
    </div>

    <!-- GET STARTED SECTION -->
    <section
      v-if="!getStarted"
      class="flex flex-col justify-center items-center"
    >
      <div class="setup-content mt-24">
        <div class="flex flex-col justify-center items-center">
          <div class="md:shrink-0">
            <img
              src="@/assets/images/business/auction_plan_2.svg"
              class="h-48 w-full object-cover md:h-48 md:w-68"
              alt="Man looking at item at a store"
            />
          </div>
          <div class="p-8">
            <div class="body-title">Let's create your personalized plan</div>
            <p class="body-text">
              Answer a few questions to start an auction so you can purchase
              carbon coins.
            </p>
            <p class="mt-2 text-sm text-center text-gray-700"></p>
          </div>
        </div>
      </div>
      <button class="btn-block-style mt-3" @click="handleGetStarted">
        Get Started
      </button>
    </section>
    <!-- END STARTED SECTION -->

    <section v-if="getStarted">
      <div class="setup-container">
        <div class="setup-box">
          <div class="main">
            <div ref="page1" class="page page-1 current">
              <div class="ml-5 setup-content">
                <div>
                  <div class="flex flex-col justify-center items-center">
                    <div class="">
                      <!-- src="@/assets/images/business/undraw_personal_finance.svg" -->
                      <img
                        src="@/assets/images/business/gift_card.svg"
                        class="h-44 w-full md:h-48 md:w-68"
                        alt="Man looking at item at a store"
                      />
                    </div>
                    <div class="p-8">
                      <div class="body-title">Put the code in the box</div>
                      <p class="mt-2 text-sm text-center text-gray-700">
                        Input the code number and digits from the voucher or
                        e-gift card.
                      </p>
                    </div>
                  </div>

                  <div class="input-style px-12">
                    <div class="label-0">
                      Code
                      <div
                        class="tooltip"
                        data-tip="The code is typically embossed by a combination of numbers and letters when you purchase a gift card from vendors/retailers."
                      >
                        <div class="img-help">
                          <img />
                        </div>
                      </div>
                    </div>
                    <label class="relative block">
                      <span>
                        <div class="h-5 w-5 fill-slate-300" viewBox="0 0 20 20">
                          <img src="~/assets/images/business/offer.svg" />
                        </div>
                      </span>
                      <input
                        v-model="auction.code"
                        :class="
                          validationError
                            ? 'border outline-none ring-pink-600 ring-1'
                            : null
                        "
                        placeholder="Enter a Voucher Code"
                        type="text"
                        name="code"
                      />
                    </label>
                    <p
                      v-if="validationError"
                      class="mt-2 text-sm text-pink-600"
                    >
                      Please make sure you have filled
                      <b>Code</b>
                      information.
                    </p>
                  </div>

                  <div
                    class="
                      help
                      underline-offset-1
                      ml-24
                      my-4
                      md:ml-64
                      items-center
                      flex
                      gap-1
                    "
                    @click="showModalInfo('budget')"
                  >
                    <!-- <div class="mask-1">
                      <img class="" />
                    </div>
                    <span>Need help?</span> -->
                  </div>
                </div>
              </div>
            </div>

            <div ref="page2" class="page page-2">
              <div class="ml-5 setup-content">
                <div>
                  <div>
                    <div class="flex flex-col justify-center items-center">
                      <div class="md:shrink-0">
                        <img
                          src="@/assets/images/business/schedule2.svg"
                          class="h-48 w-full object-cover md:h-48 md:w-68"
                          alt="Man looking at item at a store"
                        />
                      </div>
                      <div class="p-8">
                        <div class="body-title">Set a Schedule</div>

                        <p class="mt-2 text-sm text-center text-gray-700">
                          For how long does the auction last? Please Set the end
                          date for the auction.
                        </p>
                      </div>
                    </div>

                    <div class="page-form px-16">
                      <div class="form-control">
                        <label class="label">
                          <span class="label-text">Auction end date</span>
                        </label>

                        <input
                          ref="location-city-input"
                          v-model="auction.auctionEndDate"
                          type="datetime-local"
                          class="input input-sm w-full mb-4"
                          :class="
                            validationError
                              ? 'border outline-none border-pink-600 ring-pink-600 ring-1'
                              : null
                          "
                        />
                        <p
                          v-if="validationError"
                          class="mt-2 text-sm text-pink-600"
                        >
                          Please make sure you have filled
                          <b>Schedule</b>
                          information.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div ref="page3" class="page page-3">
              <div class="ml-5 setup-content">
                <div>
                  <div class="flex flex-col justify-center items-center">
                    <div class="md:shrink-0">
                      <img
                        src="@/assets/images/business/pay_online.svg"
                        class="h-48 w-full object-cover md:h-48 md:w-68"
                        alt="Man looking at item at a store"
                      />
                    </div>
                    <!-- <div class="p-8">
                      <div class="body-title">Bidding starts from:</div>
                    </div> -->
                  </div>

                  <div class="input-style-cc px-12 mt-8">
                    <div class="label-0">Bidding starts from:</div>
                    <label class="relative block">
                      <input
                        ref="business-name-input"
                        v-model="auction.CCamount"
                        class="
                          input input-sm input-bordered
                          border-2 border-gray-200
                          rounded
                          bg-gray-100
                        "
                        :class="
                          validationError
                            ? 'border outline-none border-pink-600 ring-pink-600 ring-1'
                            : null
                        "
                        placeholder="0 CC"
                        type="number"
                        required
                        name="CC"
                      />
                      <div
                        class="
                          absolute
                          inset-y-0
                          right-0
                          flex
                          items-center
                          border-l-2
                          px-2
                        "
                      >
                        <div
                          class="h-5 w-24 fill-slate-300 font-semibold"
                          viewBox="0 0 20 20"
                        >
                          <!-- <img src="~/assets/images/business/CC.svg" /> -->
                          Carbon Coin
                        </div>
                      </div>
                    </label>
                    <p
                      v-if="validationError"
                      class="mt-2 text-sm text-pink-600"
                    >
                      Please make sure you have filled
                      <b>Carbon Coin</b>
                      information.
                    </p>
                  </div>

                  <!-- <div class="page-form px-16">
                    <div class="form-control">
                      <label>
                        <span class="label-text">Carbon Coin</span>
                      </label>
                      <input
                        ref="business-name-input"
                        v-model="auction.CCamount"
                        class="
                          input input-sm input-bordered
                          border-2 border-gray-200
                          rounded
                          bg-gray-100
                        "
                        :class="
                          validationError
                            ? 'border outline-none border-pink-600 ring-pink-600 ring-1'
                            : null
                        "
                        placeholder="0 CC"
                        type="number"
                        required
                      />
                      <p
                        v-if="validationError"
                        class="mt-2 text-sm text-pink-600"
                      >
                        Please make sure you have filled
                        <b>Carbon Coin</b>
                        information.
                      </p>
                    </div>
                  </div> -->
                  <div
                    class="
                      help
                      underline-offset-1
                      ml-28
                      my-5
                      md:ml-60
                      items-center
                      flex
                      gap-1
                    "
                    @click="showModalInfo('carbon_coin')"
                  >
                    <span
                      class="icon icon-user-location bg-accent animate-bounce"
                    ></span>
                    <span>Need help?</span>
                  </div>
                </div>
              </div>
            </div>

            <div ref="page4" class="page page-4 ml-4">
              <section>
                <div v-if="businessCreated">
                  <div class="page-title">Auction Started</div>

                  <div class="welcome-description">
                    You have successfully started your auction. You can now
                    access your CC auctions manager dashboard.
                  </div>
                </div>
                <div v-else>
                  <div v-if="!validationError" class="page-title">
                    Almost Done!
                  </div>
                  <div
                    v-if="validationError"
                    class="text-xl text-red-400 font-normal my-2;"
                  >
                    Error!
                  </div>

                  <div
                    v-if="validationError"
                    class="welcome-description text-red-400"
                  >
                    Error! please make sure you have filled every information.
                  </div>

                  <div class="welcome-description">
                    You're almost done, Please check the information you have
                    entered and proceed to create your auction by clicking the
                    "Start Auction" button.
                  </div>
                  <div class="grid md:grid-cols-2 grid-cols-1 gap-4 mt-4">
                    <div class="w-11/12">
                      <div
                        class="bg-white mx-auto rounded-md shadow-lg mb-4 p-4"
                      >
                        <div class="text-lg font-bold flex gap-2 mb-2">
                          <img
                            src="~assets/images/business/coupon.png"
                            class="w-8"
                            alt=""
                          />
                          Voucher Code
                        </div>
                        <div class="flex justify-between mb-4 items-center">
                          <h1 class="font-bold">{{ auction.code }}</h1>
                          <div class="tooltip-contact">
                            <!-- <div
                              class="help underline-offset-1 ml-4"
                              @click="showModalInfo('budget')"
                            >
                              <div class="mask-1">
                                <img class="" />
                              </div>
                              <span></span>
                            </div> -->
                            <div
                              class="tooltip"
                              data-tip="The code is typically embossed by a combination of numbers and letters when you purchase a gift card from vendors/retailers."
                            >
                              <div class="img-help">
                                <img />
                              </div>
                            </div>
                            <label
                              for="my-modal-code"
                              class="btn btn-sm modal-button"
                            >
                              <img
                                src="@/assets/images/product/edit.svg"
                                class="w-4 opacity-75"
                                alt=""
                            /></label>
                          </div>
                        </div>

                        <div class="text-lg font-bold flex gap-2 mb-2">
                          <img
                            src="~assets/images/business/CC6.svg"
                            class="w-8"
                            alt=""
                          />
                          Amount
                        </div>
                        <div class="flex justify-between mb-4 items-center">
                          <h1 class="font-bold">£{{ auction.price }}</h1>
                          <div class="tooltip-contact">
                            <div
                              class="tooltip"
                              data-tip="what is the pound equivalent of the gift card?"
                            >
                              <div class="img-help">
                                <img />
                              </div>
                            </div>
                            <!-- <div
                              class="help underline-offset-1 ml-4"
                              @click="showModalInfo('budget')"
                            >
                              <div class="mask-1">
                                <img class="" />
                              </div>
                              <span></span>
                            </div> -->
                            <label
                              for="my-modal"
                              class="btn btn-sm modal-button"
                            >
                              <img
                                src="@/assets/images/product/edit.svg"
                                class="w-4 opacity-75"
                                alt=""
                            /></label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="w-11/12">
                      <div
                        class="bg-white mx-auto rounded-md shadow-lg mb-4 p-4"
                      >
                        <div class="mt-2">
                          <div class="text-lg font-bold flex gap-2 mb-2">
                            <img
                              src="~assets/images/product/green_calander.png"
                              class="w-8"
                              alt=""
                            />
                            Auction End Date
                          </div>

                          <div class="flex justify-between mb-4 items-center">
                            <h1 class="font-bold">
                              {{
                                new Date(
                                  auction.auctionEndDate
                                ).toLocaleDateString('en-US')
                              }}
                            </h1>
                            <label
                              for="my-modal-2"
                              class="btn btn-sm modal-button"
                            >
                              <img
                                src="@/assets/images/product/edit.svg"
                                class="w-4 opacity-75"
                                alt=""
                            /></label>
                          </div>
                        </div>
                        <div
                          class="
                            text-lg
                            font-bold
                            flex flex-row
                            justify-start
                            gap-2
                            mb-2
                          "
                        >
                          <svg
                            width="48"
                            viewBox="0 0 79 55"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M37.5296 35.1075C37.3859 38.2342 36.5444 41.0009 35.0051 43.4076C33.4657 45.7937 31.3003 47.645 28.509 48.9615C25.7381 50.278 22.567 50.9363 18.9957 50.9363C13.1051 50.9363 8.46649 49.0129 5.07989 45.1663C1.6933 41.3197 0 35.8892 0 28.8748V26.6532C0 22.2512 0.759418 18.4046 2.27825 15.1133C3.81762 11.8015 6.02403 9.25085 8.89751 7.46125C11.771 5.65108 15.096 4.74599 18.8726 4.74599C24.3116 4.74599 28.6834 6.1859 31.9879 9.06572C35.2924 11.925 37.1704 15.8744 37.622 20.9141H26.8465C26.7644 18.1783 26.0768 16.2138 24.7837 15.0208C23.4906 13.8277 21.5203 13.2312 18.8726 13.2312C16.1838 13.2312 14.2134 14.2391 12.9614 16.255C11.7094 18.2709 11.0526 21.4901 10.991 25.9127V29.0908C10.991 33.8836 11.5863 37.3085 12.7767 39.3655C13.9877 41.4226 16.0607 42.4511 18.9957 42.4511C21.4792 42.4511 23.3778 41.8648 24.6913 40.6923C26.0049 39.5198 26.7028 37.6582 26.7849 35.1075H37.5296Z"
                              fill="#009169"
                            />
                            <path
                              d="M78.9076 35.1075C78.764 38.2342 77.9224 41.0009 76.3831 43.4076C74.8437 45.7937 72.6784 47.645 69.887 48.9615C67.1161 50.278 63.9451 50.9363 60.3737 50.9363C54.4831 50.9363 49.8445 49.0129 46.4579 45.1663C43.0713 41.3197 41.378 35.8892 41.378 28.8748V26.6532C41.378 22.2512 42.1374 18.4046 43.6563 15.1133C45.1956 11.8015 47.4021 9.25085 50.2755 7.46125C53.149 5.65108 56.474 4.74599 60.2506 4.74599C65.6897 4.74599 70.0614 6.1859 73.3659 9.06572C76.6704 11.925 78.5485 15.8744 79 20.9141H68.2245C68.1424 18.1783 67.4548 16.2138 66.1617 15.0208C64.8687 13.8277 62.8983 13.2312 60.2506 13.2312C57.5618 13.2312 55.5915 14.2391 54.3394 16.255C53.0874 18.2709 52.4306 21.4901 52.3691 25.9127V29.0908C52.3691 33.8836 52.9643 37.3085 54.1547 39.3655C55.3657 41.4226 57.4387 42.4511 60.3737 42.4511C62.8572 42.4511 64.7558 41.8648 66.0694 40.6923C67.383 39.5198 68.0808 37.6582 68.1629 35.1075H78.9076Z"
                              fill="#009169"
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M63.2632 0V9.3617H56.2574V3.0691e-07L63.2632 0Z"
                              fill="#009169"
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M63.2632 45.6383V55H56.2574V45.6383H63.2632Z"
                              fill="#009169"
                            />
                          </svg>
                          Carbon Coin
                        </div>

                        <div class="flex justify-between mb-4 items-center">
                          <h1 class="font-bold">{{ auction.CCamount }} CC</h1>
                          <div
                            class="
                              flex flex-row
                              gap-2
                              items-center
                              justify-center
                            "
                          >
                            <div
                              class="help underline-offset-1 ml-4"
                              @click="showModalInfo('carbon_coin')"
                            >
                              <div class="mask-1">
                                <img class="" />
                              </div>
                            </div>
                            <label
                              for="my-modal-4"
                              class="btn btn-sm modal-button"
                            >
                              <img
                                src="@/assets/images/product/edit.svg"
                                class="w-4 opacity-75"
                                alt=""
                            /></label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>

          <div class="controls">
            <button ref="prevBtn" disabled class="prev" @click="handlePrev">
              Back
            </button>
            <span>
              <button ref="nextBtn" class="next" @click="handleNext">
                Next
              </button>

              <button
                ref="finishBtn"
                class="finish hide-btn"
                @click="handleCreate"
              >
                Start Auction
              </button>
            </span>
          </div>
        </div>
      </div>

      <section class="sticky bottom-0">
        <ul class="w-full steps mt-10">
          <li class="step step-primary"></li>
          <li class="step"></li>
          <li class="step"></li>
          <li class="step"></li>
          <!-- <li class="step"></li> -->
        </ul>
      </section>
      <!-- helpInfo MOdal -->
      <div
        v-if="showModal"
        class="
          w-screen
          h-screen
          justify-center
          items-center
          fixed
          top-0
          left-0
          mx-2
          z-50
        "
      >
        <help
          :info="helpInfo"
          :dataItem="walletAmount"
          @close-modal="showModal = false"
        />
      </div>
    </section>

    <!-- Edit Code -Modal -->
    <section>
      <input id="my-modal-code" type="checkbox" class="modal-toggle" />
      <div ref="viewModal" class="modal">
        <div class="modal-box bg-white">
          <h3 class="font-bold text-lg text-accent mb-4">Edit Voucher Code</h3>

          <input
            v-model="auction.code"
            type="text"
            class="input w-3/4 max-w-xs"
          />

          <div class="modal-action">
            <label for="my-modal-code" class="btn btn-sm btn-primary"
              >Change</label
            >
            <label
              for="my-modal-code"
              class="btn btn-sm"
              @click="closeViewModal"
            >
              Cancel
            </label>
          </div>
        </div>
      </div>
    </section>

    <!-- Edit Amount -Modal -->
    <section>
      <input id="my-modal" type="checkbox" class="modal-toggle" />
      <div ref="viewModal" class="modal">
        <div class="modal-box bg-white">
          <h3 class="font-bold text-lg text-accent mb-4">
            Edit Voucher Amount
          </h3>

          <input
            v-model="auction.price"
            type="number"
            class="input w-3/4 max-w-xs"
          />

          <div class="modal-action">
            <label for="my-modal" class="btn btn-sm btn-primary">Change</label>
            <label for="my-modal" class="btn btn-sm" @click="closeViewModal">
              Cancel
            </label>
          </div>
        </div>
      </div>
    </section>

    <!-- Edit Auction End Date -Modal -->
    <section>
      <input id="my-modal-2" type="checkbox" class="modal-toggle" />
      <div ref="viewModal-4" class="modal">
        <div class="modal-box bg-white">
          <h3 class="font-bold text-lg text-accent mb-4">
            Edit The Auction End Date
          </h3>

          <input
            v-model="auction.auctionEndDate"
            type="datetime-local"
            class="input input-sm w-1/2 mb-4"
          />

          <div class="modal-action">
            <label for="my-modal-2" class="btn btn-sm btn-primary"
              >Change</label
            >
            <label for="my-modal-2" class="btn btn-sm" @click="closeViewModal">
              Cancel
            </label>
          </div>
        </div>
      </div>
    </section>

    <!-- START Edit Carbon coin -Modal -->
    <section>
      <input id="my-modal-4" type="checkbox" class="modal-toggle" />
      <div ref="viewModal-4" class="modal">
        <div class="modal-box bg-white">
          <h3 class="font-bold text-lg text-accent mb-4">
            Edit The Carbon coin
          </h3>

          <input
            v-model="auction.CCamount"
            type="number"
            class="input input-sm w-1/2 mb-4"
          />

          <div class="modal-action">
            <label for="my-modal-4" class="btn btn-sm btn-primary"
              >Change</label
            >
            <label for="my-modal-4" class="btn btn-sm" @click="closeViewModal">
              Cancel
            </label>
          </div>
        </div>
      </div>
    </section>
    <!-- END Edit Carbon coin -Modal -->

    <!-- START VOUCHER SECTION -Modal -->
    <section ref="modal_voucher" class="modal-container" hidden>
      <div class="modal-overlay">
        <div class="modal-body bg-white relative">
          <!-- Header Section /-->
          <div class="modal-header">
            <h3 v-if="!isVerify">Verify Code</h3>
            <h3 v-if="isVerify">Voucher Details</h3>
            <span class="close-span" @click="close_voucher_modal"> X </span>
          </div>
          <hr />
          <!-- Body Section /-->
          <div v-if="!finishLoading" class="modal-content">
            <h3
              v-if="!isVerify"
              class="mb-3"
              :class="{ 'opacity-40 ': isVerify }"
            >
              Is this the correct code?
            </h3>
            <div
              v-if="!isVerify"
              class="flex justify-between"
              :class="{ 'opacity-40 ': isVerify, hidden: isEdit }"
            >
              <div class="hidden md:block">
                <div class="flex flex-row gap-1 text-sm">
                  <!-- <div v-for="idx in auction.code.toString().length" :key="idx"> -->
                  <!-- <span class="modal-text-input">{{
                      auction.code.toString().split('')[idx - 1]
                    }}</span> -->

                  <!-- </div> -->
                  <span class="text-lg font-bold modal-text-input">
                    {{ auction.code }}
                  </span>
                </div>
              </div>
              <div class="md:hidden text-lg font-bold">{{ auction.code }}</div>
              <span
                class="
                  bg-green-100
                  w-8
                  h-8
                  ml-2
                  rounded-full
                  flex
                  justify-center
                  items-center
                  hover:bg-green-200
                "
              >
                <img
                  src="~/assets/images/product/edit.svg"
                  class="w-4 cursor-pointer"
                  @click="touchEdit"
                />
              </span>
            </div>

            <div
              v-if="!isVerify"
              class="input-style"
              :class="{ 'opacity-40 ': isVerify, hidden: !isEdit }"
            >
              <label class="relative block">
                <span>
                  <div class="h-5 w-5 fill-slate-300" viewBox="0 0 20 20">
                    <img src="~/assets/images/business/offer.svg" />
                  </div>
                </span>
                <input
                  v-model="auction.code"
                  :class="
                    validationError
                      ? 'border outline-none ring-pink-600 ring-1'
                      : null
                  "
                  placeholder="Enter a Voucher or E-gift Card Code"
                  type="text"
                  name="code"
                />
              </label>
              <p v-if="validationError" class="mt-2 text-sm text-pink-600">
                Please make sure you have filled
                <b>Code</b>
                information.
              </p>
            </div>

            <div class="mt-4 flex flex-col" :class="!isVerify && 'hidden'">
              <div class="flex flex-col md:flex-row gap-2">
                <div class="input-style flex-1">
                  <div class="label-0">
                    <div class="flex flex-col">
                      <p>Amount<span class="text-red-600">*</span></p>
                      <p class="text-gray-500 text-xs mb-2">
                        What is the pound equivalent of the card?
                      </p>
                    </div>
                  </div>
                  <label class="relative block">
                    <span>
                      <div class="h-5 w-5 fill-slate-300" viewBox="0 0 20 20">
                        <img src="~/assets/images/business/pound.svg" />
                      </div>
                    </span>
                    <input
                      v-model="auction.price"
                      :class="
                        validationError
                          ? 'border outline-none ring-pink-600 ring-1'
                          : null
                      "
                      placeholder="Enter Amount"
                      type="number"
                      name="price"
                    />
                  </label>
                  <p v-if="validationError" class="mt-2 text-sm text-pink-600">
                    Please make sure you have filled
                    <b>Amount</b>
                    information.
                  </p>
                </div>

                <div class="input-style">
                  <div class="label-0">
                    <div class="flex flex-col">
                      <p>Vender<span class="text-red-600">*</span></p>
                      <p class="text-gray-500 text-xs mb-2">
                        Name of the vendor/retailer that issued the cards
                      </p>
                    </div>
                  </div>
                  <label class="relative block">
                    <span>
                      <div class="h-5 w-5 fill-slate-300" viewBox="0 0 20 20">
                        <img src="~/assets/images/business/vender.svg" />
                      </div>
                    </span>
                    <input
                      v-model="auction.vender"
                      :class="
                        validationError
                          ? 'border outline-none ring-pink-600 ring-1'
                          : null
                      "
                      placeholder="Vender Here"
                      type="text"
                      name="code"
                    />
                  </label>
                  <p v-if="validationError" class="mt-2 text-sm text-pink-600">
                    Please make sure you have filled
                    <b>Vender</b>
                    information.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <!-- Loading Spinner -->
          <div v-if="finishLoading" class="modal-content">
            <div class="loading-spinner">
              <div
                class="
                  flex flex-row
                  gap-2
                  items-center
                  justify-center
                  text-white
                  font-bold
                  text-xl
                "
              >
                <div>
                  <img
                    src="~/assets/images/product/circle-spinner-accent.svg"
                    class="w-8 animate-spin"
                  />
                </div>
                <div>Please Wait...</div>
              </div>
            </div>
          </div>
          <!-- END - Loading Spinner -->
          <!-- Footer Section /-->
          <div class="modal-footer mt-16">
            <div class="btn-container">
              <span>
                <button
                  class="yes-btn"
                  :disabled="isLoading"
                  @click="handle_verification"
                >
                  <div :class="isLoading && 'hidden'">
                    <h1 :class="isEdit && 'hidden'">Yes</h1>
                    <h1 :class="!isEdit && 'hidden'">Save</h1>
                  </div>
                  <div class="flex flex-row gap-1 items-center justify-center">
                    <span
                      class="animate-spin h-4 w-4 mr-2"
                      :class="!isLoading && 'hidden'"
                    >
                      <img
                        src="~/assets/images/product/circle-spinner-accent.svg"
                      />
                    </span>
                    <h1 :class="!isLoading && 'hidden'">Saving</h1>
                  </div>
                </button>
              </span>

              <span hidden>
                <button class="yes-btn" @click="handleSubmitVoucher">
                  Next
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- END VOUCHER SECTION -Modal -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import _ from 'lodash'
import firebase from 'firebase'
import Help from '~/components/business/Help.vue'

export default Vue.extend({
  components: {
    help: Help as Vue.Component,
  },
  layout: 'empty',
  middleware: ['auth'],
  data() {
    return {
      currPage: 1,
      maxPages: 4,
      auction: {
        CCamount: 0 as number,
        code: '' as string,
        price: 0 as number,
        vender: '' as string,
        auctionEndDate: null as any,
        bids: [],
      },
      walletAmount: {
        maxCapacity: 0 as number,
        minCapacity: 0 as number,
      },
      auctionFinished: false,
      showModal: false,
      helpInfo: '',
      getStarted: false,
      loading: false,
      businessCreated: false,
      validationError: false,
      isVerify: false as Boolean,
      isLoading: false as Boolean,
      isEdit: false,
      businessNotifications: [] as Array<any>,
      finishLoading: false,
    }
  },

  computed() {
    return {
      mamimumCapacity() {},
    }
  },
  async created() {
    await this.$store.dispatch('business/updateBusinessAuctionStatus')
    const currentUser = this.$fire.auth.currentUser
    const businesssRef = await this.$fire.firestore
      .collection('business')
      .where('BusinessOwnerId', '==', currentUser?.uid)
      .get()
    const businesssCollection = businesssRef.docs[0].data()

    const walletCapacity = _.forEach(
      businesssCollection.Employees,
      async (b) =>
        await this.$store.dispatch('business/walletCapacity', b.employeeId)
    )
    const walletCollection = [] as any
    _.forEach(walletCapacity, (w) => walletCollection.push(w.carbonCoinBalance))

    this.walletAmount.maxCapacity = _.max(walletCollection) as number
    this.walletAmount.minCapacity = _.min(walletCollection) as number
    // this.auction.CCamount = _.max(walletCollection) as number
  },
  methods: {
    progressSteps(steps: number) {
      const stepNodes = document.getElementsByClassName('step')
      steps = steps - 1

      for (const idx of [0, 1, 2, 3])
        if (idx > steps) stepNodes[idx].classList.remove('step-primary')

      for (let idx = 0; idx <= steps; idx++)
        stepNodes[idx].classList.add('step-primary')

      /* for (let idx = 0; idx <= steps; steps++); */
    },

    handleNext() {
      const currentPage = this.$refs[`page${this.currPage}`] as HTMLDivElement
      const nextPage = this.$refs[`page${this.currPage + 1}`] as HTMLDivElement
      const prevBtn = this.$refs.prevBtn as HTMLButtonElement
      const nextBtn = this.$refs.nextBtn as HTMLButtonElement
      const finishBtn = this.$refs.finishBtn as HTMLButtonElement

      /* eslint no-self-assign: ["error", {"props": false}] */

      if (this.currPage === 1) {
        if (this.auction.code === '') {
          this.validationError = true
          this.currPage = this.currPage
        } else {
          this.open_voucher_modal()
          this.currPage = this.currPage
        }
      } else if (this.currPage === 2 && this.auction.auctionEndDate === null) {
        this.validationError = true
        this.currPage = this.currPage
      } else if (this.currPage === 3 && this.auction.CCamount === 0) {
        this.validationError = true
        this.currPage = this.currPage
      } else {
        this.validationError = false
        this.currPage = this.currPage + 1

        this.progressSteps(this.currPage)

        currentPage.classList.remove('current')
        nextPage.classList.add('current')

        prevBtn.removeAttribute('disabled')
        nextBtn.removeAttribute('disabled')

        if (this.currPage === 1) prevBtn.setAttribute('disabled', 'disabled')
        else if (this.currPage === 1)
          (this.$refs['business-name-input'] as HTMLInputElement).focus()
        else if (this.currPage === 3)
          (this.$refs['location-city-input'] as HTMLInputElement).focus()
        else if (this.currPage === this.maxPages) {
          nextBtn.setAttribute('disabled', 'disabled')
          nextBtn.classList.add('hide-btn')
          finishBtn.classList.remove('hide-btn')
        }
      }
    },

    handlePrev() {
      const currentPage = this.$refs[`page${this.currPage}`] as HTMLDivElement
      const nextPage = this.$refs[`page${this.currPage - 1}`] as HTMLDivElement
      const prevBtn = this.$refs.prevBtn as HTMLButtonElement
      const nextBtn = this.$refs.nextBtn as HTMLButtonElement
      const finishBtn = this.$refs.finishBtn as HTMLButtonElement

      this.currPage = this.currPage - 1

      this.progressSteps(this.currPage)

      currentPage.classList.remove('current')
      nextPage.classList.add('current')

      prevBtn.removeAttribute('disabled')
      nextBtn?.removeAttribute('disabled')

      if (this.currPage !== this.maxPages) {
        nextBtn.classList.remove('hide-btn')
        finishBtn.classList.add('hide-btn')
      }

      if (this.currPage === 1) prevBtn.setAttribute('disabled', 'disabled')
      else if (this.currPage === 1)
        (this.$refs['business-name-input'] as HTMLInputElement).focus()
      else if (this.currPage === 3)
        (this.$refs['location-city-input'] as HTMLInputElement).focus()
      else if (this.currPage === this.maxPages) {
        nextBtn.setAttribute('disabled', 'disabled')
      }
      this.validationError = false
    },

    async handleCreate() {
      if (!this.validateInput()) {
        this.validationError = true
        return
      }
      if (this.businessCreated) return

      const prevBtn = this.$refs.prevBtn as HTMLButtonElement
      prevBtn.setAttribute('disabled', 'disabled')
      const finishBtn = this.$refs.finishBtn as HTMLButtonElement
      finishBtn.setAttribute('disabled', 'disabled')

      // this.auction.auctionEndDate = firebase.firestore.Timestamp.fromDate(
      //   new Date()
      // )

      // creating business auction
      this.$store.dispatch('loading/toggleLoading', true)
      await this.$store.dispatch('business/createBusinessAuction', this.auction)
      this.auction.price = 0
      this.auction.CCamount = 0
      this.$store.dispatch('loading/toggleLoading', false)

      this.businessCreated = true

      // send notification to all employees
      this.auctionFinished = true

      this.$router.replace('/business/dashboard/carbon/manage')
    },

    closeViewModal() {
      const viewModalBtn = this.$refs.viewModal as HTMLDivElement
      viewModalBtn.classList.remove('modal-open')
    },

    handleGetStarted() {
      this.getStarted = true
    },

    validateInput() {
      return true
    },

    showModalInfo(info: any) {
      this.showModal = true
      this.helpInfo = info
    },

    open_voucher_modal() {
      const voucher = this.$refs.modal_voucher as HTMLDivElement
      voucher.removeAttribute('hidden')
    },

    close_voucher_modal() {
      const voucher = this.$refs.modal_voucher as HTMLDivElement
      voucher.setAttribute('hidden', 'hidden')
    },

    handle_verification() {
      this.isLoading = true

      setTimeout(() => {
        this.isLoading = false
        this.isVerify = true
        this.isEdit = false
        const firstChild = document.getElementsByClassName('btn-container')[0]
          .firstChild as HTMLDivElement
        firstChild.setAttribute('hidden', 'hidden')

        const lastChild = document.getElementsByClassName('btn-container')[0]
          .lastChild as HTMLDivElement
        lastChild.removeAttribute('hidden')
      }, 2000)
    },

    touchEdit() {
      this.isEdit = true
    },

    handleSubmitVoucher() {
      if (this.auction.price === 0) {
        this.validationError = true
        this.currPage = this.currPage
      } else if (this.auction.vender === '') {
        this.validationError = true
        this.currPage = this.currPage
      } else {
        this.finishLoading = true
        this.validationError = false

        const voucher = this.$refs.modal_voucher as HTMLDivElement
        // this.finishLoading = true
        setTimeout(() => {
          voucher.setAttribute('hidden', 'hidden')
          this.finishLoading = false
        }, 2000)

        const currentPage = this.$refs[`page${this.currPage}`] as HTMLDivElement
        const nextPage = this.$refs[
          `page${this.currPage + 1}`
        ] as HTMLDivElement

        this.currPage = this.currPage + 1
        this.progressSteps(this.currPage)

        currentPage.classList.remove('current')
        nextPage.classList.add('current')
      }
    },
  },
})
</script>

<style scoped>
.setup-content {
  @apply w-11/12 bg-white mx-auto rounded-xl shadow-md overflow-hidden md:w-1/2 pt-4;
}

.btn-block-style {
  @apply btn bg-green-500 hover:bg-green-600 border-none max-w-md text-white md:max-w-2xl px-5;
}

.setup-container {
  width: 100%;
  height: 100%;
}

.icon {
  display: inline-block;
  width: 1.5em;
  height: 1.5em;
  line-height: 0;
  mask-repeat: no-repeat;
  mask-position: center;
  transition-duration: 200ms;
  transition-property: opacity;
}

.icon-user-location {
  mask: url('~/assets/images/business/help.svg');
}

.mask-back {
  mask-image: url(~/assets/images/business/arrow_back.svg);
}

.mask-back img {
  @apply bg-accent w-6 h-6;
}

.mask-1 {
  -webkit-mask-image: url(~/assets/images/business/help.svg);
  mask-image: url(~/assets/images/business/help.svg);
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
}

.mask-1 img {
  @apply bg-accent w-6 h-6;
}

.mask-2 {
  mask-image: url(~assets/images/business/mask-coin.svg);
}
.mask-2 img {
  @apply bg-accent w-10 h-10;
}

.help {
  @apply cursor-pointer underline;
}

.steps li {
  @apply text-gray-500 text-sm font-light;
}

.steps li.step::before,
.steps li.step::after {
  @apply bg-gray-300 text-white;
  color: white;
}

.steps li.step.step-primary::before,
.steps li.step.step-primary::after {
  @apply bg-green-500;
}

.setup-box .controls {
  display: flex;
  justify-content: center;
  gap: 0.2em;
}

.setup-box .controls .next,
.setup-box .controls .finish,
.setup-box .controls .prev {
  @apply btn btn-sm rounded;
}

.setup-box .controls .next,
.setup-box .controls .finish {
  @apply bg-green-500 text-white border-none;
}

.setup-box .controls .prev {
  @apply bg-gray-200 text-gray-500 border-none;
}

.setup-box .controls .prev:hover {
  @apply bg-gray-300;
}

.setup-box .controls .next:hover,
.setup-box .controls .finish:hover {
  @apply bg-green-600;
}

.setup-box .controls .finish:disabled,
.setup-box .controls .prev:disabled {
  @apply bg-gray-300 text-gray-400;
}

.setup-box .hide-btn {
  display: none !important;
}

.icon-credit {
  mask: url('~/assets/images/business/carbon_credit.svg');
}

.setup-box .main {
  @apply py-4 mt-16;
  width: 100%;
  margin: 0 auto;
}

.setup-box .main > * {
  display: none;
}

.setup-box .main > .current {
  display: flex;
}

.setup-box .main .page {
  @apply mt-12;
  width: 100%;
}

.setup-box .main .page .page-title {
  @apply text-xl text-green-400
    font-normal my-2;
}

.setup-box .main .page .page-form .label-text {
  @apply text-gray-400 text-xs;
  text-transform: uppercase;
}

.setup-box .main .page .page-form .form-control {
  @apply my-2;
}

.setup-box .main .page .page-form input:focus {
  @apply border-green-200;
}

.setup-box .main .page .page-form select {
  @apply select select-sm rounded
    select-bordered border-2
    border-gray-200 text-gray-500
    bg-gray-100
    w-full;
}

.setup-box .main .page .page-form select:focus {
  @apply border-green-200;
}

.setup-box .main .page .page-form textarea {
  @apply textarea h-24 textarea-bordered
    border-2 rounded
    border-gray-200 text-gray-500
    bg-gray-100
    w-full;
}

.setup-box .main .page .page-form textarea:focus {
  @apply border-green-200;
}

.setup-box .main .page .page-form input::placeholder,
.setup-box .main .page .page-form select::placeholder,
.setup-box .main .page .page-form textarea::placeholder {
  @apply text-gray-300;
}

.setup-box .main .page .welcome-text {
  @apply text-xl text-green-600 font-normal;
  text-align: center;
}

.setup-box .main .page .welcome-description {
  @apply text-sm text-gray-400 w-11/12 mt-1 font-normal;
  text-align: justify;
}

.setup-box .main .page-1 {
  width: 100%;
  height: 100%;
  flex-direction: column;
}

.setup-box .main .page-1 .greencheddar-logo {
  @apply py-4;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.3em;
}
.body-text {
  @apply block mt-1 leading-tight font-medium text-gray-700 text-center;
}
.body-title {
  @apply uppercase
        tracking-wide
        text-black text-center
        font-bold;
}

.modal-overlay {
  @apply w-screen h-screen flex justify-center items-center fixed top-0 left-0 z-50 bg-black bg-opacity-40;
}

.modal-container .modal-body {
  @apply relative bg-white h-auto rounded-lg transition-all duration-150 ease-in-out;
  min-width: 350px;
  max-width: 1000px;
}

.modal-container .modal-body .modal-header {
  @apply p-3 font-semibold text-gray-600 text-xl;
}

.modal-container .modal-body .modal-header .close-span {
  @apply text-xl text-red-400 cursor-pointer absolute top-1 right-2;
}

.modal-container .modal-body .modal-content {
  @apply p-3 text-gray-600;
}

.modal-container .modal-body .modal-content .modal-text-input {
  /* 
  @apply box-border h-8 w-8 flex justify-center items-center text-gray-700 border-2 border-gray-200; */
  letter-spacing: 0.1em;
}

.modal-container .modal-body .modal-content .voucher-amt {
  @apply mt-4 flex flex-col;
}

.modal-container .modal-body .modal-footer .btn-container span > button {
  @apply btn btn-sm text-white border-0;
}

.modal-container .modal-body .modal-footer .btn-container {
  @apply absolute bottom-1 right-1;
}

.modal-container .modal-body .modal-footer .btn-container .yes-btn {
  @apply bg-accent;
}

.modal-container .modal-body .modal-footer .btn-container .yes-btn:disabled {
  background-color: #cccccc;
}

.modal-container .modal-body .modal-footer .btn-container .yes-btn-hidden {
  @apply bg-accent hidden;
}

.tooltip-contact {
  @apply flex flex-row  gap-2 items-center justify-center relative mr-20;
}

.modal-container .modal-body .modal-footer .btn-container .no-btn {
  @apply bg-red-400;
}

.input-style label span {
  @apply absolute inset-y-0 left-0 flex items-center border-r-2 px-2;
}

.input-style .tooltip::before {
  @apply bg-accent text-white ml-16;
  position: absolute;
  z-index: 999;
  display: flex;
}

.input-style .tooltip .img-help {
  mask-image: url(~/assets/images/business/help.svg);
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: 100%;
}

.input-style .tooltip .img-help img {
  @apply bg-accent w-4 h-4;
}

.tooltip-contact .tooltip .img-help {
  mask-image: url(~/assets/images/business/help.svg);
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: 100%;
}

.tooltip-contact .tooltip::before {
  @apply bg-accent text-white;
  position: absolute;
  display: flex;
}

.tooltip-contact .tooltip .img-help img {
  @apply bg-accent w-5 h-5;
}

.input-style .label-0 {
  @apply block font-semibold flex  items-center gap-1 text-gray-700 pl-1 mb-1;
}

.input-style span img {
  @apply w-full opacity-75;
}

.input-style input {
  @apply bg-white w-full border rounded-md py-2 pl-12 pr-3 shadow-sm sm:text-sm outline-none border-gray-400 border-2
  transition-all duration-150 ease-in-out block;
}

.input-style-cc input {
  @apply bg-white w-full border rounded-md py-2 shadow-sm sm:text-sm outline-none border-gray-400 border-2
  transition-all duration-150 ease-in-out block;
}

.input-style input::placeholder {
  @apply italic text-gray-400;
}

.input-style-cc input::placeholder {
  @apply bg-white w-full border rounded-md py-2 shadow-sm sm:text-sm outline-none border-gray-400 border-2
  transition-all duration-150 ease-in-out block;
}

.input-style input:focus {
  @apply ring-green-200 ring-2;
}

.input-style-cc input:focus {
  @apply bg-white w-full border rounded-md py-2 shadow-sm sm:text-sm outline-none border-gray-400 border-2
  transition-all duration-150 ease-in-out block;
}

.loading-spinner {
  @apply w-full h-full flex items-center justify-center;
  background: rgb(0, 0, 0, 0.3);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
}

@media screen and (max-width: 768px) {
  .setup-box {
    width: 100%;
  }

  .modal-container .modal-body {
    @apply relative bg-white  h-auto rounded-lg transition-all duration-150 ease-in-out;
    min-width: 280px;
    max-width: 1000px;
  }

  .setup-box .main .page-1 .greencheddar-logo .welcome-text {
    width: 75%;
  }

  .setup-box .main .page-1 .greencheddar-logo .welcome-description {
    @apply text-sm text-gray-400 font-normal;
    text-align: justify;
    width: 100%;
  }
}
</style>
